const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Fleet = require('./fleetModel')
const Driver = require('./driverModel')
const FleetOrder = require('./fleetOrder')

const DriverOrder = sequelize.define('DriverOrder', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    driverId: {
        type: DataTypes.INTEGER,

    },
    jobStatus: {
        type: DataTypes.INTEGER
    },
    fleetOrderId: {
        type: DataTypes.INTEGER,
        references: {
            model: FleetOrder,
            key: 'id'
        }
    }
}, {
    tableName: 'driverorder'
});
Fleet.hasMany(DriverOrder, { foreignKey: 'fleetId' });
Driver.hasMany(DriverOrder, { foreignKey: 'driverId' });
FleetOrder.hasOne(DriverOrder, { foreignKey: 'fleetOrderId' });
DriverOrder.belongsTo(FleetOrder, { foreignKey: 'fleetOrderId' });

module.exports = DriverOrder