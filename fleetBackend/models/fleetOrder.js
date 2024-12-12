
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db')
const FleetOrder = sequelize.define('FleetOrder', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true
    },

    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderCode: {
        type: DataTypes.STRING
    },
    orderUrl: {
        type: DataTypes.STRING,
    },
    orderStatus: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currencyCode: {
        type: DataTypes.STRING,

    },
    transactionReference: {
        type: DataTypes.STRING
    },
    transactionAmount: {
        type: DataTypes.DECIMAL
    },
    transactionAmountString: {
        type: DataTypes.STRING
    },

    orderTotal: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true, // Disable auto timestamps if not needed
    tableName: 'fleetorder'

}, {
    indexes: [{
        unique: true,
        fields: ['orderId']
    }]
});

module.exports = FleetOrder;