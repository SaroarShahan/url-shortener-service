import dotenv from 'dotenv';
import type { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT as Dialect,
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  },
);

export default sequelize;
