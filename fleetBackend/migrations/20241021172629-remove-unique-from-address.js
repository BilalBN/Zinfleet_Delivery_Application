'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('fleets', 'address'); // Replace with the actual constraint name
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('fleets', {
      fields: ['address'],
      type: 'unique',
      name: 'address' // Give it the same name for rollback
    });
  }
};
