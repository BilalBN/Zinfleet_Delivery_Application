
const FleetOrder = require('../models/fleetOrder')
const OrderAddress = require('../models/orderAddress')
const Driver = require('../models/driverModel');
const { JOBSTATUS } = require('../config/constants')
const DriverOrder = require('../models/driverOrder');
const { Op } = require('sequelize');
const { fn, col } = require('sequelize');

class OrderService {
    async createOrderWithAddress(orderData, addressData) {
        console.log("Creatig order service with address");
        const newOrder = await FleetOrder.create(orderData);
        const fleetId = newOrder.storeId
        addressData.orderId = newOrder.id;
        const newAddress = await OrderAddress.create(addressData);
        if (fleetId) {
            const driverList = await this.getFleetDriver(fleetId, 3);
            if (driverList.length > 0) {
                const assignDriver = driverList[0];
                const driver = await DriverOrder.create({
                    driverId: assignDriver.id,
                    fleetOrderId: newOrder.id,
                    fleetId: fleetId,
                    jobStatus: JOBSTATUS.ASSIGNED_DRIVER

                })
                return { assignDriver }
            }
        }
        return { newOrder, newAddress };
    }

    async getAllOrderWithAddress() {
        return await FleetOrder.findAll({
            include: [OrderAddress]
        })
    }

    async getFleetDriver(fleetId, maxOrderCount) {
        const maxAssignedOrder = maxOrderCount || 3
        console.log("Request fleet id:", fleetId)
        const fleetDrivers = await Driver.findAll({
            where: {
                fleet_id: fleetId,
            },
            include: [{
                model: DriverOrder,
                required: false, //Left joing
                attributes: []
            }],
            group: ['Driver.id'], //Group by driver id
            attributes: {
                include: [
                    [fn('COUNT', col('DriverOrders.id')), 'orderCount'] //Count assigned orders
                ]
            },
            having: {
                [Op.or]: [
                    { orderCount: { [Op.ne]: JOBSTATUS.DELIVERED } }, //Not assigned orders
                    { orderCount: { [Op.lt]: maxAssignedOrder } }
                ]
            },
            order: [[fn('COUNT', col('DriverOrders.id')), 'ASC']]

        });
        return fleetDrivers
    }
};

module.exports = new OrderService()