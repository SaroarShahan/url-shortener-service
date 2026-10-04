import { Model } from 'sequelize';

const createRolePermissionModel = (sequelize, DataTypes) => {
  class RolePermissionModel extends Model {
    static associate(models) {
      models.RolePermissionModel.belongsTo(models.RoleModel, {
        foreignKey: 'roleId',
        as: 'role',
      });
      models.RolePermissionModel.belongsTo(models.PermissionModel, {
        foreignKey: 'permissionId',
        as: 'permission',
      });
    }
  }

  RolePermissionModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        field: 'role_id',
        allowNull: false,
      },
      permissionId: {
        type: DataTypes.INTEGER,
        field: 'permission_id',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'RolePermissionModel',
      tableName: 'role_permissions',
      underscored: true,
      timestamps: true,
    },
  );

  return RolePermissionModel;
};

export default createRolePermissionModel;
