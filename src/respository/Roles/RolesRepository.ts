import { PermissionModel, RoleModel } from '../../models';
import { buildRolesQuery } from './rolesQueryBuilder';

class RolesRepository {
  static instance: any;

  constructor() {
    if (RolesRepository.instance) return RolesRepository.instance;

    RolesRepository.instance = this;
  }

  async create(data, options = {}) {
    return RoleModel.create(data, options);
  }

  async findAndCountAll(options) {
    return RoleModel.findAndCountAll(options);
  }

  async findAndCountAllRoles(query) {
    const options = buildRolesQuery(query);
    return {
      ...(await RoleModel.findAndCountAll({
        ...options,
        include: [
          {
            model: PermissionModel,
            as: 'permissions',
            attributes: ['id', 'name', 'label', 'module'],
            through: { attributes: [] },
          },
        ],
        distinct: true,
      })),
      limit: options.limit,
    };
  }

  async findById(id, options = {}) {
    return RoleModel.findByPk(id, options);
  }

  async findOne(options) {
    return RoleModel.findOne(options);
  }

  async update(id, data, options = {}) {
    const role = await RoleModel.findByPk(id, options);

    if (!role) return null;

    await role.update(data, options);
    return role;
  }

  async delete(id) {
    const role = await RoleModel.findByPk(id);

    if (!role) return null;

    return role.destroy();
  }
}

export { RolesRepository };
