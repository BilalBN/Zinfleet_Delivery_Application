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
            const result = await orderService.createOrderWithAddress(orderData, addressData)
            console.log("Order created:", result)
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
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getFleetDrivers(req, res) {
        try {
            const { fleetId } = req.body;
            const driverResult = await orderService.getFleetDriver(fleetId, 0);
            return res.status(200).json(driverResult);
        } catch (error) {
            console.log(`Fetching fleet driver failed:${error}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getFleetOrders(req, res)
    {
        try {
            const { fleetId } = req.body;
            const orderResult = await orderService.getFleetOrders(fleetId, req.body.limit,req.body.page);
            return res.status(200).json(orderResult);
        } catch (error) {
            console.log(`Fetching fleet driver failed:${error}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

module.exports = new OrderController()