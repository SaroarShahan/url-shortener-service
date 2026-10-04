'use strict';

const permissionNames = [
  'permissions.create',
  'permissions.get',
  'permissions.update',
  'permissions.delete',
  'roles.create',
  'roles.get',
  'roles.update',
  'roles.delete',
  'users.create',
  'users.get',
  'users.update',
  'users.delete',
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const [roles] = await queryInterface.sequelize.query(
      'SELECT id FROM roles WHERE name = :roleName',
      {
        replacements: { roleName: 'admin' },
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    const permissions = await queryInterface.sequelize.query(
      'SELECT id, name FROM permissions WHERE name IN (:permissionNames)',
      {
        replacements: { permissionNames },
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    if (!roles || permissions.length !== permissionNames.length) {
      throw new Error('Required admin role or permissions were not seeded');
    }

    const timestamp = new Date();
    await queryInterface.bulkInsert(
      'role_permissions',
      permissions.map((permission) => ({
        role_id: roles.id,
        permission_id: permission.id,
        created_at: timestamp,
        updated_at: timestamp,
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    const [roles] = await queryInterface.sequelize.query(
      'SELECT id FROM roles WHERE name = :roleName',
      {
        replacements: { roleName: 'admin' },
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    if (roles) {
      await queryInterface.bulkDelete('role_permissions', { role_id: roles.id }, {});
    }
  },
};
