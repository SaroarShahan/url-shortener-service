import bcrypt from 'bcrypt';

import { RoleModel, UserModel } from './../../models';
import type { AppHttpError } from '../../types/app';
import { generateToken } from '../../utils/jwt';

class AuthServices {
  private static _instance: AuthServices;

  private constructor() {}

  static getInstance(): AuthServices {
    if (!AuthServices._instance) {
      AuthServices._instance = new AuthServices();
    }

    return AuthServices._instance;
  }

  async findSafeUser(id) {
    return UserModel.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [{ model: RoleModel, as: 'role', attributes: ['id', 'name'] }],
    });
  }

  async register(data) {
    const existingUser = await UserModel.findOne({ where: { email: data.email } });

    if (existingUser) {
      const error = new Error('User with this email already exists!') as AppHttpError;
      error.httpStatusCode = 409;
      throw error;
    }

    const role = await RoleModel.findByPk(data.roleId);

    if (!role) {
      const error = new Error('Role not found!') as AppHttpError;
      error.httpStatusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await UserModel.create({
      userName: data.username,
      email: data.email,
      password: hashedPassword,
      gender: data.gender,
      roleId: role.id,
    });

    return this.findSafeUser(user.id);
  }

  async login(email, password) {
    const user = await UserModel.findOne({
      where: { email },
      include: [{ model: RoleModel, as: 'role', attributes: ['id', 'name'] }],
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error('Invalid credentials!') as AppHttpError;
      error.httpStatusCode = 401;
      throw error;
    }

    const token = await generateToken({ id: user.id, roleId: user.roleId });

    return {
      user: {
        id: user.id,
        roleId: user.roleId,
        role: user.role ? user.role.name : null,
      },
      token,
    };
  }
}

export { AuthServices };
