const { DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Adjust this path according to your project
const Fleet = require('./fleetModel');
const MainUsers = require('./mainUserModel');

const Shop = sequelize.define('Shop', {
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
  warehouse_address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fleet_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Fleet, // The name of the target model (the table you are referencing)
      key: 'id' // The key in the target model that this foreign key references
    }
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
  tableName: 'shops'
});
Fleet.hasMany(Shop,{foreignKey:'fleet_id'})
Shop.belongsTo(Fleet,{foreignKey:'fleet_id'});  // Define the association

module.exports = Shop;
