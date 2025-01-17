'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('fleetorder', 'fleet_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // shop_id can be NULL
      references: {
        model: 'fleets',  // Name of the referenced table
        key: 'id',       // Key in the referenced table
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' // When a shop is deleted, set shop_id to NULL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('fleetorder', 'fleet_id');
  }
};
