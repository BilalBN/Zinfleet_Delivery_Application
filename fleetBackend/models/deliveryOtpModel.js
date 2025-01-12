const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const DriverOrder = require('../models/fleetOrder');
const FleetOrder = require('../models/fleetOrder');
const OrderDeliveryOtp = sequelize.define("OrderDeliveryOtp", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fleetOrderId: {
        type: DataTypes.INTEGER,
        references: {
            model: FleetOrder,
            key: 'id'
        }
    },

    receiver: {
        type: DataTypes.STRING,
        allowNull: false
    },

    otp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expire: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isUsed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: true,
    tableName: "order_delivery_otp"
});

FleetOrder.hasOne(OrderDeliveryOtp, { foreignKey: 'fleetOrderId' });
OrderDeliveryOtp.belongsTo(FleetOrder, { foreignKey: 'fleetOrderId' });

module.exports = OrderDeliveryOtp


