const { body, param } = require('express-validator');

// Validation for creating a new driver
const loginValidation = [
  body('username').notEmpty().withMessage('User name is required'),
  body('password').isString().withMessage('Password is required'),
];

module.exports = {
  loginValidation,
};
