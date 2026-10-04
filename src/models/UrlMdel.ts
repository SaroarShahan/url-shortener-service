import { Model } from 'sequelize';

const createUrlModel = (sequelize, DataTypes) => {
  class UrlModel extends Model {
    static associate(models) {
      models.UrlModel.belongsTo(models.UserModel, {
        foreignKey: 'userId',
        as: 'users',
      });
    }
  }

  UrlModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      shortUrl: {
        type: DataTypes.STRING(255),
        field: 'short_url',
        allowNull: false,
        unique: true,
      },
      targetUrl: {
        type: DataTypes.STRING(100),
        field: 'target_url',
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
    {
      sequelize,
      modelName: 'UrlModel',
      tableName: 'urls',
      underscored: true,
      timestamps: true,
    },
  );

  return UrlModel;
};

export default createUrlModel;
