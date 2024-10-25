'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('main_users', 'role', {
      type: Sequelize.STRING,
      allowNull: false, // Make it non-nullable if required
      defaultValue: 'fleet', // You can set a default role if necessary
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('main_users', 'role');
  }
};
