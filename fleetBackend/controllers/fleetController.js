const fleetService = require("../services/fleetService");
const ResponseHandler = require('../utils/responseHandler');
const CustomError = require('../utils/customError');

class FleetController {
  async getAllFleets(req, res, next) {
    try {
      const fleets = await fleetService.getAllFleets(req.body.limit,req.body.page);
      ResponseHandler.success(res, fleets, 'Fleets fetched successfully');
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  }

  async getFleetById(req, res, next) {
    try {
      const fleets = await fleetService.getFleetsById(req.body.id);
      if (!fleets) throw new CustomError('Fleet not found', 404);
      ResponseHandler.success(res, fleets, 'Fleet fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  async createFleet(req, res, next) {
    try {
      const fleets = await fleetService.createFleet(req.body,req.user.id);
      ResponseHandler.success(res, fleets, 'Fleet created successfully', 201);
    } catch (error) {
      next(new CustomError(error.message, 400));
    }
  }

  async updateFleet(req, res, next) {
    try {
      const fleets = await fleetService.updateFleet(req.params.id, req.body);
      ResponseHandler.success(res, fleets, 'Fleet updated successfully');
    } catch (error) {
      next(new CustomError(error.message, 400));
    }
  }

  async deleteFleet(req, res, next) {
    try {
      const result = await fleetService.deleteFleet(req.params.id);
      ResponseHandler.success(res, result, 'Fleet deleted successfully');
    } catch (error) {
      next(new CustomError('Fleet not found', 404));
    }
  }
}

module.exports = new FleetController();
