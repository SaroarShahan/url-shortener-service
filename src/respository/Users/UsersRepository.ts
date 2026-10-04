import Models from '~/models';
import { usersQueryBuilder } from './usersQueryBuilder';

const { UrlModel, UserModel } = Models;

const urlInclude = {
  model: UrlModel,
  as: 'urls',
  attributes: ['id', 'code', 'shortUrl', 'targetUrl'],
};

class UsersRepository {
  static instance: UsersRepository;

  constructor() {
    if (UsersRepository.instance) return UsersRepository.instance;

    UsersRepository.instance = this;
  }

  async create(data) {
    return UserModel.create(data);
  }

  async findAndCountAll(options) {
    return UserModel.findAndCountAll(options);
  }

  async findAndCountAllUsers(query) {
    const options = usersQueryBuilder(query);
    return {
      ...(await UserModel.findAndCountAll({ ...options, include: [urlInclude] })),
      limit: options.limit,
    };
  }

  async findById(id) {
    return UserModel.findByPk(id, { include: [urlInclude] });
  }

  async update(id, data) {
    const user = await UserModel.findByPk(id);

    if (!user) return null;

    return user.update(data);
  }

  async delete(id) {
    const user = await UserModel.findByPk(id);

    if (!user) return null;

    return user.destroy();
  }
}

export { UsersRepository };
