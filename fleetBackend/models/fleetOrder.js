
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

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
        unique: true
    },
    fleet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Fleets', // The name of the target model (the table you are referencing)
          key: 'id' // The key in the target model that this foreign key references
        }
      },
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderCode: {
        type: DataTypes.STRING,
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
        type: DataTypes.DECIMAL(10, 2) // Specify precision and scale if needed
    },
    transactionAmountString: {
        type: DataTypes.STRING
    },
    orderTotal: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
    tableName: 'fleetorder',
});

module.exports = FleetOrder;