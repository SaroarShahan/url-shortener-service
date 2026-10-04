'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const [admin] = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email = :email',
      {
        replacements: { email: 'admin@example.com' },
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    if (!admin) {
      throw new Error('Required admin user was not seeded');
    }

    const timestamp = new Date();
    const baseUrl = (
      process.env.SHORT_URL_BASE_URL ||
      `http://localhost:${process.env.PORT || '4000'}`
    ).replace(/\/$/, '');

    await queryInterface.bulkInsert('urls', [
      {
        code: 'docs',
        short_url: `${baseUrl}/docs`,
        target_url: 'https://sequelize.org/docs/v6/',
        user_id: admin.id,
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        code: 'github',
        short_url: `${baseUrl}/github`,
        target_url: 'https://github.com/SaroarShahan/url-shortener-service',
        user_id: admin.id,
        created_at: timestamp,
        updated_at: timestamp,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'urls',
      {
        code: ['docs', 'github'],
      },
      {},
    );
  },
};
