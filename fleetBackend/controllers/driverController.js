const driverService = require("../services/driverService");
const ResponseHandler = require('../utils/responseHandler');
const CustomError = require('../utils/customError');
const orderService = require("../services/orderService");

class DriverController {
  async getAllDrivers(req, res, next) {
    try {
      const drivers = await driverService.getAllDrivers(req.body.limit, req.body.page);
      ResponseHandler.success(res, drivers, 'Drivers fetched successfully');
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  }

  async getDriverById(req, res, next) {
    try {
      const driver = await driverService.getDriverById(req.params.id);
      if (!driver) throw new CustomError('Driver not found', 404);
      ResponseHandler.success(res, driver, 'Driver fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  async createDriver(req, res, next) {
    try {
      const driver = await driverService.createDriver(req.body);
      ResponseHandler.success(res, driver, 'Driver created successfully', 201);
    } catch (error) {
      next(new CustomError(error.message, 400));
    }
  }

  async updateDriver(req, res, next) {
    try {
      const driver = await driverService.updateDriver(req.params.id, req.body);
      ResponseHandler.success(res, driver, 'Driver updated successfully');
    } catch (error) {
      next(new CustomError(error.message, 400));
    }
  }

  async deleteDriver(req, res, next) {
    try {
      const result = await driverService.deleteDriver(req.params.id);
      ResponseHandler.success(res, result, 'Driver deleted successfully');
    } catch (error) {
      next(new CustomError('Driver not found', 404));
    }
  }

  async getOrders(req, res, next) {
    try {
      const { orderStatus } = req.query;
      const driverId = req.driverId;
      const orderData = await driverService.getDriverOrders(driverId, orderStatus);
      ResponseHandler.success(res, orderData, "Driver Order")
    } catch {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createDriverSession(req, res, next){
    try{
     
      const sessionData = await driverService.handleDriverSession(req)
      ResponseHandler.success(res, sessionData, "Driver Session")
      
    }catch(error){
      var message = "Internal server Error"
      if(error.message){
        message = error.message
      }
      return res.status(500).json({message: message})
    }
  }
}

module.exports = new DriverController();
