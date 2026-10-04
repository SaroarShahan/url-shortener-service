import { PermissionModel } from '../../models';
import { permissionsQueryBuilder } from './permissionsQueryBuilder';

class PermissionsRepository {
  static instance: any;

  constructor() {
    if (PermissionsRepository.instance) return PermissionsRepository.instance;

    PermissionsRepository.instance = this;
  }

  async create(data) {
    return PermissionModel.create(data);
  }

  async findAndCountAll(options) {
    return PermissionModel.findAndCountAll(options);
  }

  async findAndCountAllPermissions(query) {
    const options = permissionsQueryBuilder(query);
    return {
      ...(await PermissionModel.findAndCountAll({
        ...options,
        attributes: ['id', 'name', 'label', 'module'],
      })),
      limit: options.limit,
    };
  }

  async findById(id) {
    return PermissionModel.findByPk(id);
  }

  async findOne(options) {
    return PermissionModel.findOne(options);
  }

  async update(id, data) {
    const permission = await PermissionModel.findByPk(id);

    if (!permission) return null;

    return permission.update(data);
  }

  async delete(id) {
    const permission = await PermissionModel.findByPk(id);

    if (!permission) return null;

    return permission.destroy();
  }
}

export { PermissionsRepository };
