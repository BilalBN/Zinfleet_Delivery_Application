
const FleetOrder = require('../models/fleetOrder')
const OrderAddress = require('../models/orderAddress')
const Driver = require('../models/driverModel');
const { JOBSTATUS } = require('../config/constants')
const DriverOrder = require('../models/driverOrder');
const { Op } = require('sequelize');
const { fn, col } = require('sequelize');
const Fleet = require('../models/fleetModel');

class OrderService {
    async createOrderWithAddress(orderData, addressData) {
        console.log("Creatig order service with address");
        orderData.fleet_id=orderData.storeId;
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
    async getFleetOrders(fleetId, limit, page) {
        // Ensure that limit and page are provided for pagination
        const shouldPaginate = limit && page;
        const offset = shouldPaginate ? (page - 1) * limit : undefined;
    
        try {
            // Fetch fleet orders by fleetId with pagination
            const fleetOrders = await FleetOrder.findAll({
                where: {
                    fleet_id: fleetId, // Filter by fleetId
                },
                limit: shouldPaginate ? limit : undefined,
                offset: offset,
            });
    
            // Fetch associated users for the fetched shops
          const orderwithaddresses = await Promise.all(
            fleetOrders.map(async (orders) => {
              const address = await OrderAddress.findOne({
                where: { orderId: orders.id },
              });
              const fleetName = await Fleet.findOne({
                where: { id: orders.fleet_id },
              });
              return {
                ...orders.dataValues,
                fleet:fleetName,
                address:address
              };
            })
          );
            // Get the total count of fleet orders for pagination info
            const totalFleetOrders = await FleetOrder.count({
                where: {
                    storeId: fleetId, // Count orders by fleetId
                },
            });
    
            // Prepare the pagination response
            const pagination = {
                total: totalFleetOrders,
                page,
                limit,
                totalPages: Math.ceil(totalFleetOrders / limit),
            };
    
            // Return the fleet orders and pagination info
            return {
                orderwithaddresses,
                pagination,
            };
        } catch (error) {
            console.error("Error fetching fleet orders:", error);
            throw new Error("Error fetching fleet orders");
        }
    }
    
};

module.exports = new OrderService()