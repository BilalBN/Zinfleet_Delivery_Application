const { DataTypes } = require('sequelize');
const sequelize = require('../db/db')
const FleetOrder = require('./fleetOrder');
const OrderAddress = sequelize.define("OrderAddress", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: FleetOrder, // Reference the FleetOrder model directly
            key: 'orderId' // The key in the target model that this foreign key references
        }
    },
    name: {
        type: DataTypes.STRING,
    },
    contactNumber: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    street: {
        type: DataTypes.STRING,
    },
    district: { 
        type: DataTypes.STRING
    },
    formattedAddress: { 
        type: DataTypes.STRING
    },
    latitude: {
        type: DataTypes.STRING
    },
    longitude: {
        type: DataTypes.STRING
    },
    countryCode: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
    tableName: 'orderaddress',
});

// Define associations after model definitions
FleetOrder.hasMany(OrderAddress, { foreignKey: 'orderId' }); // One-to-many relationship
OrderAddress.belongsTo(FleetOrder, { foreignKey: 'orderId' }); // Many-to-one relationship

module.exports = OrderAddress;
