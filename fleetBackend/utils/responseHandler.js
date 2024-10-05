class ResponseHandler {
    static success(res, data, message = 'Success', statusCode = 200) {
      return res.status(statusCode).json({
        success: true,
        message,
        data,
      });
    }
  
    static error(res, message = 'Something went wrong', statusCode = 500, errors = []) {
      return res.status(statusCode).json({
        success: false,
        message,
        errors,
      });
    }
  }
  
  module.exports = ResponseHandler;
  