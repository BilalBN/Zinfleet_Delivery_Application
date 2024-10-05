const ResponseHandler = require("../utils/responseHandler");

// Global error handler middleware
const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Pass error to the ResponseHandler
  ResponseHandler.error(res, message, statusCode, err.errors || []);
};

module.exports = errorMiddleware;
