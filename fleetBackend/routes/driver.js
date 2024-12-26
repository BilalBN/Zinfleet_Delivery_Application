const express = require('express');
const driverController = require('../controllers/driverController');
const {
  createDriverValidation,
  updateDriverValidation,
  getDriverByIdValidation,
  deleteDriverValidation,
} = require('../validations/driverValidation');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// CRUD routes for drivers
router.post('/', getDriverByIdValidation, driverController.getAllDrivers);
router.get('/:id', createDriverValidation, driverController.getDriverById);
router.post('/add', updateDriverValidation, driverController.createDriver);
router.put('/:id', updateDriverValidation, driverController.updateDriver);
router.delete('/:id', deleteDriverValidation, driverController.deleteDriver);
router.get('/orders', authMiddleware, driverController.getOrders);
module.exports = router;
