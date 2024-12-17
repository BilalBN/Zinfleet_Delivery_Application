const { DataTypes } = require('sequelize');
const sequelize = require('../db/db')

const OrderAddress = sequelize.define("OrderAddress", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
        references: {
            model: 'FleetOrder', // The name of the target model (the table you are referencing)
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
    distirct: {
        type: DataTypes.STRING
    },
    formatedAddress: {
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
    },
}, {
    timestamps: true,
    tableName: 'orderaddress'
});

module.exports = OrderAddress;
