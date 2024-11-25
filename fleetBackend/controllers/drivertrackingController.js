const trackService = require("../services/drivertrackingService");
const ResponseHandler = require('../utils/responseHandler');
const CustomError = require('../utils/customError');

class DriverTrackingController {
  async getAllTracking(req, res, next) {
    try {
      const shops = await trackService.getAllTracking(req.body.limit,req.body.page);
      ResponseHandler.success(res, shops, 'Driver trackings fetched successfully');
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  }
  async getTrackingById(req, res, next) {
    try {
      const tracking = await trackService.getTrackingById(req.body.id,res);
      if (!tracking) throw new CustomError('Trackig data not found', 404);
      ResponseHandler.success(res, tracking, 'Tracking data fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  async createTracking(req, res, next) {
    try {
      const tracking = await trackService.createTracking(req.body,req.user.id);
      ResponseHandler.success(res, tracking, 'Data created successfully', 201);
    } catch (error) {
      next(new CustomError(error.message, 400));
    }
  }

  async updateTracking(req, res, next) {
    try {
      const tracking = await trackService.updateTracking(req.params.id, req.body,req.user.id);
      ResponseHandler.success(res, tracking, 'Data updated successfully');
    } catch (error) {
      next(new CustomError(error.message, 400));
    }
  }

  async deleteTracking(req, res, next) {
    try {
      const result = await trackService.deleteTracking(req.params.id);
      ResponseHandler.success(res, result, 'Data deleted successfully');
    } catch (error) {
      next(new CustomError('Data not found', 404));
    }
  }
}

module.exports = new DriverTrackingController();
