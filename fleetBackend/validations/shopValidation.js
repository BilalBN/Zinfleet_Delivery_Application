const { body, param } = require('express-validator');

// Validation for creating a new driver
const createShopValidation = [
  body('name').notEmpty().withMessage('Name is required'),
   // Add other validations as necessary
];

// Validation for updating a driver
const updateShopValidation = [
  param('id').isInt().withMessage('Shop ID must be a valid integer'),
  body('name').optional().isString(),
  // Add other validations as necessary
];

// Validation for getting a driver by ID
const getShopByIdValidation = [
  param('id').isInt().withMessage('Shop ID must be a valid integer')
];

// Validation for deleting a driver
const deleteShopValidation = [
  param('id').isInt().withMessage('Shop ID must be a valid integer')
];

module.exports = {
  createShopValidation,
  updateShopValidation,
  getShopByIdValidation,
  deleteShopValidation
};
