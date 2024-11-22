'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('driver_tracking', {
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
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'drivers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      logIn: {
        type: Sequelize.DATE,
        allowNull: true
      },
      logOut: {
        type: Sequelize.DATE,
        allowNull: true
      },
      workingHours: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      ordersPicked: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      ordersDelivered: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      ordersPending: {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('driver_tracking');
  }
};
