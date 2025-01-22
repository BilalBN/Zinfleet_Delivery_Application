'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('fleetorder', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      fleet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'fleets',  // Name of the referenced table
          key: 'id'         // Key in the referenced table
        }
      },
      storeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      orderCode: {
        type: Sequelize.STRING,
      },
      orderUrl: {
        type: Sequelize.STRING,
      },
      orderStatus: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      currencyCode: {
        type: Sequelize.STRING,
      },
      transactionReference: {
        type: Sequelize.STRING
      },
      transactionAmount: {
        type: Sequelize.DECIMAL(10, 2)
      },
      transactionAmountString: {
        type: Sequelize.STRING
      },
      orderTotal: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('fleetorder');
  }
};
