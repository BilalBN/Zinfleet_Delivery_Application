const express = require('express');
const fleetController = require('../controllers/fleetController');
const {
    createFleetValidation,
    updateFleetValidation,
    getFleetByIdValidation,
    deleteFleetValidation,
    creditAllocationValidation
  } = require('../validations/fleetValidation');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// CRUD routes for drivers
router.post('/getfleets', authMiddleware,getFleetByIdValidation,fleetController.getAllFleets);
router.post('/', authMiddleware,createFleetValidation,fleetController.createFleet);
router.put('/:id', authMiddleware,updateFleetValidation,fleetController.updateFleet);
router.delete('/:id', authMiddleware,deleteFleetValidation,fleetController.deleteFleet);
router.post('/id', authMiddleware,getFleetByIdValidation,fleetController.getFleetById);
router.post('/credit-allocation', authMiddleware,creditAllocationValidation,fleetController.creditAllocation);
router.get('/credit-allocations', authMiddleware,creditAllocationValidation,fleetController.creditAllocation);

module.exports = router;
