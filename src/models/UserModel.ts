import { Model } from 'sequelize';

const createUserModel = (sequelize, DataTypes) => {
  class UserModel extends Model {
    static associate(models) {
      models.UserModel.belongsTo(models.RoleModel, {
        foreignKey: 'roleId',
        as: 'role',
      });
    }
  }

  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'username',
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        field: 'gender',
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'blocked'),
        defaultValue: 'active',
      },
      roleId: {
        type: DataTypes.INTEGER,
        field: 'role_id',
        allowNull: true,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
    {
      sequelize,
      modelName: 'UserModel',
      tableName: 'users',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  return UserModel;
};

export default createUserModel;
