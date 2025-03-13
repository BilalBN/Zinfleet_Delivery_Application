'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('credit_allocation', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
      creditAllocated: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      creditUsed: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      creditRemaining: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      totalCredit: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('credit_allocation');
  }
};
