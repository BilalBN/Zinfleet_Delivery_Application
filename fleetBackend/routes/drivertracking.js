const express = require('express');
const trackingController = require('../controllers/drivertrackingController.js')
// const {
//     createShopValidation,
//     updateShopValidation,
//     getShopByIdValidation,
//     deleteShopValidation
//   } = require('../validations/shopValidation');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// CRUD routes for drivers
router.post('/gettrackings', authMiddleware,trackingController.getAllTracking);
router.post('/id', authMiddleware,trackingController.getTrackingById);
router.post('/', authMiddleware,trackingController.createTracking);
router.put('/:id', authMiddleware,trackingController.updateTracking);
router.delete('/:id', authMiddleware,trackingController.deleteTracking);

module.exports = router;
