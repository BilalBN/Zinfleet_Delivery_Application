const express = require('express');
const driverController = require('../controllers/driverController');
const {
    createDriverValidation,
    updateDriverValidation,
    getDriverByIdValidation,
    deleteDriverValidation
  } = require('../validations/driverValidation');
const router = express.Router();

// CRUD routes for drivers
router.post('/', getDriverByIdValidation,driverController.getAllDrivers);
router.get('/:id', createDriverValidation,driverController.getDriverById);
router.post('/add', updateDriverValidation,driverController.createDriver);
router.put('/:id', updateDriverValidation,driverController.updateDriver);
router.delete('/:id', deleteDriverValidation,driverController.deleteDriver);

module.exports = router;
