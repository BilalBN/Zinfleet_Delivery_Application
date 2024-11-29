'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    externalOrderId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fleet_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'fleets',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    dateAdded: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    dateUpdated: {
      type: Sequelize.DATE,
      allowNull: true,
      onUpdate: 'CURRENT_TIMESTAMP',
    },
    numberOfQuantities: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    shopeName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pickupLocation: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    dropLocation: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    extraDetails: {
      type: Sequelize.JSON,
      allowNull: true,
    },
  });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
