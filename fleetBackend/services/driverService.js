const { UniqueConstraintError } = require('sequelize');
const Driver = require('../models/driverModel');
const { Op } = require('sequelize');

class DriverService {
  async getAllDrivers() {
    return await Driver.findAll();
  }

  async getDriverById(id) {
    const driver = await Driver.findByPk(id);
    if (!driver) {
      throw new Error('Driver not found');
    }
    return driver;
  }

  async createDriver(driverData) {
    try {
        driverData.createdBy=1;
        const driver = await Driver.create(driverData);
        return driver;
      } catch (error) {console.log(3)
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
            id: { [Op.ne]: id }             }
        });
        if (existingLicenseNumber) {
            throw new Error('License number already exists');
        }
        
        }

        // Update the driver with the new data
        await driver.update(updateData);
        return driver;
    } catch (error) {console.log(3)
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
}

module.exports = new DriverService();
