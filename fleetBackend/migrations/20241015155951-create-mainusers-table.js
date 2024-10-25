'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('main_users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      fleet_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // fleet_id can be NULL
        references: {
          model: 'fleets', // Name of the referenced table
          key: 'id',       // Key in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // When a fleet is deleted, set fleet_id to NULL
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('main_users');
  }
};