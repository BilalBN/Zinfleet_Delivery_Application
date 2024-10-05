const { body, param } = require('express-validator');

// Validation for creating a new driver
const createDriverValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('phoneNumber').isString().withMessage('Phone number is required'),
  body('licenseNumber').optional().isString(),
  // Add other validations as necessary
];

// Validation for updating a driver
const updateDriverValidation = [
  param('id').isInt().withMessage('Driver ID must be a valid integer'),
  body('name').optional().isString(),
  body('phoneNumber').optional().isString(),
  // Add other validations as necessary
];

// Validation for getting a driver by ID
const getDriverByIdValidation = [
  param('id').isInt().withMessage('Driver ID must be a valid integer')
];

// Validation for deleting a driver
const deleteDriverValidation = [
  param('id').isInt().withMessage('Driver ID must be a valid integer')
];

module.exports = {
  createDriverValidation,
  updateDriverValidation,
  getDriverByIdValidation,
  deleteDriverValidation
};
