const { DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Adjust this path according to your project

const Fleet = sequelize.define('Fleet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
  tableName: 'fleets'
});
module.exports = Fleet;
