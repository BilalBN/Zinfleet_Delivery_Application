const { DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Adjust this path according to your project
const Fleet = require('./fleetModel');
const Driver = require('./driverModel');

const DriverTracking = sequelize.define('DriverTracking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  fleet_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Fleets', // The name of the target model (the table you are referencing)
      key: 'id' // The key in the target model that this foreign key references
    }
  },
  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Drivers', // The name of the target model (the table you are referencing)
      key: 'id' // The key in the target model that this foreign key references
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  logIn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  logOut: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  workingHours: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  orderStatus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false, // Disable auto timestamps if not needed
  tableName: 'driver_tracking'
});
DriverTracking.belongsTo(Fleet, { foreignKey: 'fleet_id' });  // Define the association
DriverTracking.belongsTo(Driver, { foreignKey: 'driver_id' });  // Define the association

module.exports = DriverTracking;
