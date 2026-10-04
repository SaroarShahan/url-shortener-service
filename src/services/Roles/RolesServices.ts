import { PermissionModel, sequelize, UserModel } from '../../models';
import { RolesRepository } from './../../respository/Roles/RolesRepository';
import type { AppHttpError } from '../../types/app';

const roleInclude = [
  {
    model: PermissionModel,
    as: 'permissions',
    attributes: ['id', 'name', 'label', 'module'],
    through: { attributes: [] },
  },
];

class RolesServices {
  private static _instance: RolesServices;
  rolesRepository: RolesRepository;

  private constructor() {
    this.rolesRepository = new RolesRepository();
  }

  static getInstance(): RolesServices {
    if (!RolesServices._instance) {
      RolesServices._instance = new RolesServices();
    }

    return RolesServices._instance;
  }

  async getAllRoles(req) {
    const { page } = req.query;
    const { rows, count, limit } = await this.rolesRepository.findAndCountAllRoles(req.query);

    return {
      totalCount: count,
      roles: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
  }

  async getRole(id) {
    return this.rolesRepository.findById(id, { include: roleInclude });
  }

  async getValidPermissions(permissionIds, transaction) {
    const uniquePermissionIds = [...new Set(permissionIds)];
    const permissions = await PermissionModel.findAll({
      where: { id: uniquePermissionIds },
      transaction,
    });

    return { permissions, uniquePermissionIds };
  }

  async createRole(data) {
    const transaction = await sequelize.transaction();

    try {
      const { permissions, uniquePermissionIds } = await this.getValidPermissions(
        data.permissions,
        transaction,
      );

      if (permissions.length !== uniquePermissionIds.length) {
        const error = new Error('One or more permissions are invalid') as AppHttpError;
        error.httpStatusCode = 400;
        await transaction.rollback();
        throw error;
      }

      const role = await this.rolesRepository.create(
        { name: data.name, permissionIds: uniquePermissionIds },
        { transaction },
      );
      await role.setPermissions(permissions, { transaction });
      await transaction.commit();

      return this.getRole(role.id);
    } catch (error) {
      if (!(transaction as any).finished) await transaction.rollback();
      throw error;
    }
  }

  async updateRole(id, data) {
    const role = await this.rolesRepository.findById(id);

    if (!role) return null;

    const transaction = await sequelize.transaction();

    try {
      let permissionIds = role.permissionIds;
      let permissions: any;

      if (typeof data.permissions !== 'undefined') {
        const permissionResult = await this.getValidPermissions(data.permissions, transaction);
        permissions = permissionResult.permissions;
        permissionIds = permissionResult.uniquePermissionIds;

        if (permissions.length !== permissionIds.length) {
          const error = new Error('One or more permissions are invalid') as AppHttpError;
          error.httpStatusCode = 400;
          await transaction.rollback();
          throw error;
        }
      }

      await role.update({ name: data.name, permissionIds }, { transaction });

      if (permissions) {
        await role.setPermissions(permissions, { transaction });
      }

      await transaction.commit();
      return this.getRole(id);
    } catch (error) {
      if (!(transaction as any).finished) await transaction.rollback();
      throw error;
    }
  }

  async deleteRole(id) {
    const role = await this.rolesRepository.findById(id);

    if (!role) return { role: null };

    const usersCount = await UserModel.count({ where: { roleId: id } });

    if (usersCount > 0) {
      const error = new Error(
        `Cannot delete role: It is currently assigned to ${usersCount} ${usersCount === 1 ? 'user' : 'users'}.`,
      ) as AppHttpError;
      error.httpStatusCode = 400;
      throw error;
    }

    await this.rolesRepository.delete(id);
    return { role };
  }
}

export { RolesServices };
