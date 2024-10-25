const authService = require("../services/authService");
const ResponseHandler = require('../utils/responseHandler');
const CustomError = require('../utils/customError');

class AuthController {
  async login(req, res, next) {
    try {
      const login = await authService.login(req.body);
      ResponseHandler.success(res, login, 'Login success');
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  }
}

module.exports = new AuthController();
