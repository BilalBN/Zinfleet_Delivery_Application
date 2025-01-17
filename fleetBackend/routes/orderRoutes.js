const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { createOrderValidation } = require('../validations/ordervalidation');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/order', createOrderValidation, orderController.createOrder);
router.get('/orders', orderController.getOrders)
router.post('/orders/fleetdrivers', orderController.getFleetDrivers)
router.post('/orders/fleetorders', orderController.getFleetOrders)
router.put('/order/status', authMiddleware, orderController.updateDriverOrderStatus)

module.exports = router