const { UniqueConstraintError, where } = require('sequelize');
const Driver = require('../models/driverModel');
const { Op } = require('sequelize');
const Fleet = require('../models/fleetModel');
const DriverOrder = require('../models/driverOrder');
const FleetOrder = require('../models/fleetOrder');
const DriverSession = require('../models/driverSessionModel');
const crypto = require('crypto');
class DriverService {

  async getAllDrivers(limit, page) {
    try {
      // Determine if pagination is needed
      const shouldPaginate = limit && page;

      // Calculate offset only if pagination parameters are provided
      const offset = shouldPaginate ? (page - 1) * limit : undefined;

      // Fetch shops with or without pagination
      const drivers = await Driver.findAll({
        limit: shouldPaginate ? limit : undefined,
        offset: offset,
      });

      // Get the total count of shops for pagination info
      const totalDrivers = await Driver.count();

      // Fetch associated users for the fetched shops
      const driverWithUsernames = await Promise.all(
        drivers.map(async (driver) => {
          // const user = await MainUsers.findOne({
          //   where: { shop_id: shop.id },
          // });
          const fleetName = await Fleet.findOne({
            where: { id: driver.fleet_id },
          });
          return {
            ...driver.dataValues,
            // username: user ? user.user_name : null,
            fleetName: fleetName ? fleetName.name : null,

          };
        })
      );

      // Calculate total pages only if pagination parameters are provided
      const totalPages = shouldPaginate ? Math.ceil(totalDrivers / limit) : 1;

      return {
        total: totalDrivers,
        totalPages: totalPages,
        currentPage: page || 1,
        data: driverWithUsernames,
      };
    } catch (error) {
      console.error('Error fetching driver with usernames:', error);
      throw error;
    }
  }

  async getDriverById(id) {

    try {
      const drivers = await Driver.findByPk(id, {
        include: [
          { model: Fleet, as: 'fleet' },
        ]
      });
      if (!drivers) {
        throw new Error('Drivers not found');
      }
      // Step 2: Fetch the user_name from MainUsers using the shop_id
      // const mainUser = await MainUsers.findOne({
      //     where: { shop_id: id },
      //     attributes: ['user_name']  // Fetch only the user_name field
      // });
      const fleetName = await Fleet.findOne({
        where: { fleet_id: drivers.fleet_id },
      });

      // Step 3: Combine the shop data with the user_name
      const result = {
        ...drivers.get(),  // Get shop data
        // user_name: mainUser ? mainUser.user_name : null,  // Add user_name if found, otherwise null
        fleetName: fleetName ? fleetName.name : null,

      };

      return result;
    } catch (error) {
      console.error('Error fetching drivers with usernames:', error);
      throw error;
    }
  }

  async createDriver(driverData) {
    try {
      driverData.createdBy = 1;
      const driver = await Driver.create(driverData);
      return driver;
    } catch (error) {
      console.log(3)
      if (error instanceof UniqueConstraintError) {
        // Handle unique constraint error
        const duplicateField = error.errors[0].path; // This will tell you which field is duplicated
        throw new Error(`${duplicateField} already exists.`);
      }
      throw error;
    }
  }

  async updateDriver(id, updateData) {
    try {
      // Fetch the current driver to ensure the driver exists
      const driver = await Driver.findByPk(id);
      if (!driver) {
        throw new Error('Driver not found');
      }

      // Check if phoneNumber already exists for another user (excluding current driver)
      if (updateData.phoneNumber) {
        const existingPhoneNumber = await Driver.findOne({
          where: {
            phoneNumber: updateData.phoneNumber,
            id: { [Op.ne]: id } // Exclude the current driver
          }
        });
        if (existingPhoneNumber) {
          throw new Error('Phone number already exists');
        }
      }

      // Check if licenseNumber already exists for another user (excluding current driver)
      if (updateData.licenseNumber) {
        const existingLicenseNumber = await Driver.findOne({
          where: {
            licenseNumber: updateData.licenseNumber,
            id: { [Op.ne]: id }
          }
        });
        if (existingLicenseNumber) {
          throw new Error('License number already exists');
        }

      }

      // Update the driver with the new data
      await driver.update(updateData);
      return driver;
    } catch (error) {
      console.log(3)
      if (error instanceof UniqueConstraintError) {
        // Handle unique constraint error
        const duplicateField = error.errors[0].path; // This will tell you which field is duplicated
        throw new Error(`${duplicateField} already exists.`);
      }
      throw error;
    }
  }

  async deleteDriver(id) {
    const driver = await Driver.findByPk(id);
    if (!driver) {
      throw new Error('Driver not found');
    }
    await driver.destroy();
    return { message: 'Driver deleted successfully' };
  }

  async handleDriverSession(req) {
    const user = req.user
    if (!user) {
      throw new Error("User is not identified")
    }
    const isSessionActive = typeof req.body.isSessionActive === 'boolean'
      ? req.body.isSessionActive
      : false;

    if (isSessionActive) {
      const driver = Driver.findOne({
        where: {
          id: user.id
        }
      });
      if (!driver) {
        throw new Error("Driver not found");
      }

      const sessionResp = await DriverSession.create({
        sessionId: crypto.randomUUID(),
        driverId: user.id,
        isOnline: isSessionActive
      });
      if (sessionResp.id) {
        return sessionResp;
      }
      throw new Error("Could not establish the session");
    } else {
      const { sessionId } = req.body
      const sessionServiceData = DriverSession.findOne({
        where: {
          sessionId: sessionId
        }
      });
      if (!sessionServiceData) {
        throw new Error("Session not found");
      }
      const data = await DriverSession.update({
        isOnline: false,
      },
        {
          where: {
            sessionId: sessionId
          }
        }
      );
      if (data[0] > 0) {
        return {
          message: "Driver session deactivated"
        }
      }
      throw new Error("Could not update the session")
    }


  }
}

module.exports = new DriverService();
