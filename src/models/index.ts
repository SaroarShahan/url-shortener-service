import type { Options } from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';

import configByEnv from '../config/config';
import createPermissionModel from './PermissionModel';
import createRoleModel from './RoleModel';
import createRolePermissionModel from './RolePermissionModel';
import createUserModel from './UserModel';

const config = configByEnv.development as Options & {
  database?: string;
  username?: string;
  password?: string;
  use_env_variable?: string;
};

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable] || '', config)
  : new Sequelize(config.database || '', config.username || '', config.password || '', config);

const db: any = {};

db.PermissionModel = createPermissionModel(sequelize, DataTypes);
db.RoleModel = createRoleModel(sequelize, DataTypes);
db.RolePermissionModel = createRolePermissionModel(sequelize, DataTypes);
db.UserModel = createUserModel(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { PermissionModel, RoleModel, RolePermissionModel, UserModel } = db;

export { PermissionModel, RoleModel, RolePermissionModel, Sequelize, sequelize, UserModel };
export default db;
