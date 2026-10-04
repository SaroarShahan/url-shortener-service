import { Model } from 'sequelize';

const createRoleModel = (sequelize, DataTypes) => {
  class RoleModel extends Model {
    static associate(models) {
      models.RoleModel.belongsToMany(models.PermissionModel, {
        through: models.RolePermissionModel,
        foreignKey: 'roleId',
        otherKey: 'permissionId',
        as: 'permissions',
      });
      models.RoleModel.hasMany(models.RolePermissionModel, {
        foreignKey: 'roleId',
        as: 'rolePermissions',
      });
      models.RoleModel.hasMany(models.UserModel, {
        foreignKey: 'roleId',
        as: 'users',
      });
    }
  }

  RoleModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        set(this: any, value) {
          this.setDataValue('name', typeof value === 'string' ? value.trim() : value);
        },
        validate: {
          notEmpty: {
            msg: 'Role name is required!',
          },
        },
      },
      permissionIds: {
        type: DataTypes.VIRTUAL,
        get(this: any) {
          return this.getDataValue('permissionIds') || [];
        },
        set(this: any, value) {
          this.setDataValue('permissionIds', value);
        },
        validate: {
          hasAtLeastOnePermission(value) {
            if (typeof value === 'undefined') {
              return;
            }

            if (!Array.isArray(value) || value.length === 0) {
              throw new Error('A role must have at least one permission!');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'RoleModel',
      tableName: 'roles',
      timestamps: true,
      underscored: true,
    },
  );

  return RoleModel;
};

export default createRoleModel;
