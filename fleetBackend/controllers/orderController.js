const { validationResult } = require('express-validator');
const FleetOrder = require('../models/fleetOrder')
const OrderAddress = require('../models/orderAddress')
const orderService = require('../services/orderService')
class OrderController {
    async createOrder(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { orderData, addressData } = req.body;
            const result = orderService.createOrderWithAddress(orderData, addressData)
            return res.status(201).json(result)
        }
        catch (error) {
            console.log(`Created order fialed:${error}`)
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getOrders(req, res) {
        try {
            const orders = await orderService.getAllOrderWithAddress();
            return res.status(200).json(orders)
        }catch(error){
            return res.status(500).json({message: "Internal server error"});
        }
    }
};

module.exports = new OrderController()