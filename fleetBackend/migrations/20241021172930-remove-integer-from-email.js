'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('fleets', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('fleets', 'email', {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: true
    });
  }
};
