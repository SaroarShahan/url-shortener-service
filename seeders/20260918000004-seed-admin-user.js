'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const [roles] = await queryInterface.sequelize.query(
      'SELECT id FROM roles WHERE name = :roleName',
      {
        replacements: { roleName: 'admin' },
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    if (!roles) {
      throw new Error('Required admin role was not seeded');
    }

    const timestamp = new Date();
    const password = process.env.SEED_ADMIN_PASSWORD || 'Admin@12345';

    await queryInterface.bulkInsert('users', [
      {
        first_name: 'System',
        last_name: 'Administrator',
        username: 'admin',
        gender: 'other',
        email: 'admin@example.com',
        password: await bcrypt.hash(password, 12),
        status: 'active',
        role_id: roles.id,
        created_at: timestamp,
        updated_at: timestamp,
        deleted_at: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' }, {});
  },
};
