const shopService = require("../services/shopService");
const ResponseHandler = require('../utils/responseHandler');
const CustomError = require('../utils/customError');

class ShopController {
  async getAllShops(req, res, next) {
    try {
      const shops = await shopService.getAllShops(req.body.limit,req.body.page);
      ResponseHandler.success(res, shops, 'Shops fetched successfully');
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  }

  async getShopsById(req, res, next) {
    try {
      const shops = await shopService.getShopById(req.body.id,res);
      if (!shops) throw new CustomError('Shop not found', 404);
      ResponseHandler.success(res, shops, 'Shops fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  async createShop(req, res, next) {
    try {
      const shops = await shopService.createShop(req.body,req.user.id);
      ResponseHandler.success(res, shops, 'Shop created successfully', 201);
    } catch (error) {
      next(new CustomError(error.message, 400));
    }
  }

  async updateShop(req, res, next) {
    try {
      const shops = await shopService.updateShop(req.params.id, req.body,req.user.id);
      ResponseHandler.success(res, shops, 'Shop updated successfully');
    } catch (error) {
      next(new CustomError(error.message, 400));
    }
  }

  async deleteShop(req, res, next) {
    try {
      const result = await shopService.deleteShop(req.params.id);
      ResponseHandler.success(res, result, 'Shop deleted successfully');
    } catch (error) {
      next(new CustomError('Shop not found', 404));
    }
  }
}

module.exports = new ShopController();
