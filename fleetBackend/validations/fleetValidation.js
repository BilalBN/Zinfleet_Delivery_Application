const { body, param } = require('express-validator');

// Validation for creating a new driver
const createFleetValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('phoneNumber').isString().withMessage('Phone number is required'),
  body('licenseNumber').optional().isString(),
  // Add other validations as necessary
];

// Validation for updating a driver
const updateFleetValidation = [
  param('id').isInt().withMessage('Fleet ID must be a valid integer'),
  body('name').optional().isString(),
  body('phoneNumber').optional().isString(),
  // Add other validations as necessary
];

// Validation for getting a driver by ID
const getFleetByIdValidation = [
  param('id').isInt().withMessage('Fleet ID must be a valid integer')
];

// Validation for deleting a driver
const deleteFleetValidation = [
  param('id').isInt().withMessage('Fleet ID must be a valid integer')
];
// Validation for creating a new driver
const creditAllocationValidation = [
  body('fleet_id').notEmpty().withMessage('Fleet id is required'),
  body('creditAllocated').isString().withMessage('creditAllocated is required'),
  // Add other validations as necessary
];
module.exports = {
  createFleetValidation,
  updateFleetValidation,
  getFleetByIdValidation,
  deleteFleetValidation,
  creditAllocationValidation
};
