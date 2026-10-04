import { UsersRepository } from '../../respository/Users/UsersRepository';

class UsersServices {
  private static _instance: UsersServices;
  usersRepository: UsersRepository;

  private constructor() {
    this.usersRepository = new UsersRepository();
  }

  static getInstance(): UsersServices {
    if (!UsersServices._instance) {
      UsersServices._instance = new UsersServices();
    }

    return UsersServices._instance;
  }

  async getAllUsers(req) {
    const { page } = req.query;
    const { rows, count, limit } = await this.usersRepository.findAndCountAllUsers(req.query);

    return {
      totalCount: count,
      users: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
  }

  async getUser(id) {
    return await this.usersRepository.findById(id);
  }

  async createUser(data) {
    return await this.usersRepository.create(data);
  }

  async updateUser(id, data) {
    return await this.usersRepository.update(id, data);
  }

  async deleteUser(id) {
    return await this.usersRepository.delete(id);
  }
}

export { UsersServices };
