const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET
const { body, param } = require('express-validator');
const { error } = require('../utils/responseHandler');

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


const driverauthValidation = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res.status(403).json({ message: 'No token provided' })
  }
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    req.driverId = decoded.Id;
    next();
  });
}
module.exports = {
  createDriverValidation,
  updateDriverValidation,
  getDriverByIdValidation,
  deleteDriverValidation,
  driverauthValidation
};
