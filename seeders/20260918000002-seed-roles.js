'use strict';

module.exports = {
  async up(queryInterface) {
    const timestamp = new Date();

    await queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        created_at: timestamp,
        updated_at: timestamp,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', { name: 'admin' }, {});
  },
};
