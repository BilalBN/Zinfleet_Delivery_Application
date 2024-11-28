'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('drivers', 'vehicle_type', {
      type: Sequelize.STRING,
      allowNull: true // vehicle_type can be NULL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('drivers', 'vehicle_type');
  }
};
