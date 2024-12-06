const { DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Adjust this path according to your project
const Fleet = require('./fleetModel');

const Driver = sequelize.define('Driver', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  uniqueId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  vehicle_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false, // Disable auto timestamps if not needed
  tableName: 'drivers'
});
Driver.belongsTo(Fleet); 
module.exports = Driver;
