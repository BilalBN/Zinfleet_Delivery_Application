'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('SuperAdmin@123', 10);
    return queryInterface.bulkInsert('main_users', [
      {
        user_name: 'superadmin',
        password: hashedPassword, // Ensure you hash the password
        fleet_id: null, // Super Admin might not be associated with any fleet
        role: 'admin',
        createdAt: new Date(),
        createdBy: 1, // Assuming '1' as the user ID who created this record
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('main_users', { user_name: 'superadmin' }, {});
  }
};
