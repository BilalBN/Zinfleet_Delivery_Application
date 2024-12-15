
const FleetOrder = require('../models/fleetOrder')
const OrderAddress = require('../models/orderAddress')
class OrderService {
    async createOrderWithAddress(orderData, addressData){
        const newOrder = await FleetOrder.create(orderData);
        addressData.orderId = newOrder.orderId;
        const newAddress = await OrderAddress.create(addressData);
        return {newOrder, newAddress};
    }

    async getAllOrderWithAddress(){
        return await FleetOrder.findAll({
            include:[OrderAddress]
        })
    }
};

module.exports=new OrderService()