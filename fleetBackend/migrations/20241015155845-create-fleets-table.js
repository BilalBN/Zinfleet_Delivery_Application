'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fleets', {
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
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      phoneNumber: {
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

    await queryInterface.removeIndex("fleets", 'email');
    //await queryInterface.removeIndex("fleets", 'phoneNumber');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex("fleets", ['email'], {
      unique: true,
      name: "email"
    })
    await queryInterface.dropTable('fleets');
  }
};