'use strict';

module.exports = {
  async up(queryInterface) {
    const timestamp = new Date();

    await queryInterface.bulkInsert('permissions', [
      {
        name: 'permissions.create',
        label: 'Create permissions',
        module: 'permissions',
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        name: 'permissions.get',
        label: 'Get permissions',
        module: 'permissions',
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        name: 'permissions.update',
        label: 'Update permissions',
        module: 'permissions',
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        name: 'permissions.delete',
        label: 'Delete permissions',
        module: 'permissions',
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        name: 'roles.create',
        label: 'Create roles',
        module: 'roles',
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        name: 'roles.get',
        label: 'Get roles',
        module: 'roles',
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        name: 'roles.update',
        label: 'Update roles',
        module: 'roles',
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        name: 'roles.delete',
        label: 'Delete roles',
        module: 'roles',
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        name: 'users.create',
        label: 'Create users',
        module: 'users',
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        name: 'users.get',
        label: 'Get users',
        module: 'users',
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        name: 'users.update',
        label: 'Update users',
        module: 'users',
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        name: 'users.delete',
        label: 'Delete users',
        module: 'users',
        created_at: timestamp,
        updated_at: timestamp,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('permissions', null, {});
  },
};
