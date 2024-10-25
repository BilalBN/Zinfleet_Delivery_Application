'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('shops', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      warehouse_address: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('shops');
  }
};
