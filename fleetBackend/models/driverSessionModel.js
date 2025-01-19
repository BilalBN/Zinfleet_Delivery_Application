const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Driver = require('./driverModel')

const DriverSession = sequelize.define('DriverSession', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sessionId:{
        type: DataTypes.STRING,
        unique:true
    },

    driverId: {
        type: DataTypes.INTEGER,

    },
    isOnline:{
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps:false,
    tableName: 'driver_session'
});

Driver.hasMany(DriverSession, { foreignKey: 'driverId' });
DriverSession.belongsTo(Driver, { foreignKey: 'driverId' });

module.exports = DriverSession