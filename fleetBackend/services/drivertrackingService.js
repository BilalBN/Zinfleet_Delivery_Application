const { UniqueConstraintError } = require('sequelize');
const MainUsers = require('../models/mainUserModel');
const bcrypt = require('bcrypt');

const { Op } = require('sequelize');
const Fleet = require('../models/fleetModel');
const Shop = require('../models/shopModel');
const Driver = require('../models/driverModel');
const DriverTracking = require('../models/drivertrackingModel');
const { JOBSTATUS } = require('../config/constants');
const { use } = require('../routes/drivertracking');

class DriverTrackingService {
  async getAllTracking(limit, page) {
    try {
      // Determine if pagination is needed
      const shouldPaginate = limit && page;

      // Calculate offset only if pagination parameters are provided
      const offset = shouldPaginate ? (page - 1) * limit : undefined;

      const tracking = await DriverTracking.findAll({
        limit: shouldPaginate ? limit : undefined,
        offset: offset,
      });

      // Get the total count of fleets for pagination info
      const totalTrackings = await DriverTracking.count();

      // Fetch associated users for the fetched fleets
      const trackingData = await Promise.all(
        tracking.map(async (track) => {
          const fleet = await Fleet.findOne({
            where: { id: track.fleet_id },
          });
          const driver = await Driver.findOne({
            where: { id: track.driver_id },
          });

          return {
            ...track.dataValues,
            fleet: fleet ? fleet.name : null,
            driver: driver ? driver.name : null,
          };
        })
      );

      // Calculate total pages only if pagination parameters are provided
      const totalPages = shouldPaginate ? Math.ceil(totalTrackings / limit) : 1;

      return {
        total: totalTrackings,
        totalPages: totalPages,
        currentPage: page || 1,
        data: trackingData,
      };
    } catch (error) {
      console.error('Error fetching trackings:', error);
      throw error;
    }
  }


  async getTrackingById(id) {
    try {

      const tracking = await DriverTracking.findByPk(id);
      if (!tracking) {
        throw new Error('Data not found');
      }
      // Step 2: Fetch the user_name from MainUsers using the shop_id
      const fleet = await Fleet.findOne({
        where: { id: tracking.fleet_id },
        attributes: ['name']  // Fetch only the user_name field
      });
      const driver = await Driver.findOne({
        where: { id: tracking.driver_id },
        attributes: ['name']  // Fetch only the user_name field
      });

      // Step 3: Combine the shop data with the user_name
      const result = {
        ...tracking.get(),  // Get shop data
        fleet: fleet ? fleet.name : null,  // Add user_name if found, otherwise null
        driver: driver ? driver.name : null  // Add user_name if found, otherwise null
      };

      return result;
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  }

  async createTracking(trackData, createdUser) {
    try {
      const trackDatam = {
        fleet_id: trackData.fleet_id,
        driver_id: trackData.driver_id,
        date: trackData.date,
        logIn: trackData.logIn,
        logOut: trackData.logOut,
        workingHours: trackData.workingHours,
        orderStatus: trackData.orderStatus,
        createdBy: createdUser
      }
      const trackingDatam = await DriverTracking.create(trackDatam);
      return trackingDatam;
    } catch (error) {
      throw new Error(`${duplicateField} already exists.`);
    }
  }

  async updateTracking(id, updateData) {
    try {
      // Fetch the current driver to ensure the driver exists
      const tracking = await DriverTracking.findByPk(id);
      if (!tracking) {
        throw new Error('Data not found');
      }

      // Update the driver with the new data
      await tracking.update(updateData);

      return tracking;
    } catch (error) {
      throw error;
    }
  }

  async deleteTracking(id) {
    const tracking = await DriverTracking.findByPk(id);
    if (!tracking) {
      throw new Error('Data not found');
    }

    await tracking.destroy();

    return { message: 'Data deleted successfully' };
  }

  async getActiveJobs(req, res) {
    const { status } = req.query
    const user = req.user
    console.log("User reuquested status:", status)
    if (user) {
      const whereClause = {
        driver_id: user.id
      }
      if (status) {
        whereClause.orderStatus = status
      }
      const activedJobs = await DriverTracking.findAll({
        where: whereClause
      });
      const activeJobData = activedJobs.map(job => job.toJSON())
      console.log('active jobs:', activeJobData)
      return {
        order: activeJobData
      }
    } else {
      throw new Error("You dont have acess")
    }
  }
}

module.exports = new DriverTrackingService();
