
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Adjust this path according to your project
const Fleet = require('./fleetModel');

const CreditAllocation = sequelize.define('CreditAllocation', {
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
      model: Fleet, // The name of the target model (the table you are referencing)
      key: 'id' // The key in the target model that this foreign key references
    }
  },
  creditAllocated: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  creditUsed: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  creditRemaining: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  totalCredit: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false, // Disable auto timestamps if not needed
  tableName: 'credit_allocation'
},
);
module.exports = CreditAllocation;
