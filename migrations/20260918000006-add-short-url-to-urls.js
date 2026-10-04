'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('urls', 'short_url', {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    });

    const baseUrl = (
      process.env.SHORT_URL_BASE_URL ||
      `http://localhost:${process.env.PORT || '4000'}`
    ).replace(/\/$/, '');

    await queryInterface.sequelize.query(
      'UPDATE "urls" SET "short_url" = CONCAT(:baseUrl, \'/\', "code") WHERE "short_url" IS NULL',
      { replacements: { baseUrl } },
    );

    await queryInterface.changeColumn('urls', 'short_url', {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('urls', 'short_url');
  },
};
