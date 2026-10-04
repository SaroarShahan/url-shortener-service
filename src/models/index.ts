import fs from 'node:fs';
import path from 'node:path';
import type { Model, ModelStatic, Options } from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';

import configByEnv from '../config/config';

const config = configByEnv.development as Options & {
  database?: string;
  username?: string;
  password?: string;
  use_env_variable?: string;
};

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable] || '', config)
  : new Sequelize(config.database || '', config.username || '', config.password || '', config);

type ModelFactory = (sequelize: Sequelize, dataTypes: typeof DataTypes) => ModelStatic<Model>;

const db: any = {};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      !file.startsWith('.') &&
      file !== basename &&
      !file.includes('.test.') &&
      (file.endsWith('.ts') || file.endsWith('.js')),
  )
  .forEach((file) => {
    const modelModule = require(path.join(__dirname, file));
    const createModel = (modelModule.default ?? modelModule) as ModelFactory;
    const model = createModel(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
