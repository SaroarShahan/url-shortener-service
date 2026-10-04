import type { NextFunction, Request, Response } from 'express';

import { loggerContexts } from '../constants/loggerContexts';
import { UsersServices } from '../services/Users/UsersServices';
import BaseController from '../utils/BaseController';
import { logger } from '../utils/logger';
import { ResponseMessage } from '../utils/ResponseMessage';

const usersServices = UsersServices.getInstance();

class UserController extends BaseController {
  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllUsers,
      });

      const users = await usersServices.getAllUsers(req);
      const responseObj = new ResponseMessage();
      if (users) {
        responseObj.data = users;
        responseObj.httpStatusCode = 200;
        responseObj.message = 'Fetched all users successfully';
        this.createResponse.success(res, responseObj);
      }
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getAllUsers,
      });
      next(error);
    }
  };

  getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getUser,
      });

      const user = await usersServices.getUser(req.params.id);
      const responseObj = new ResponseMessage();
      if (user) {
        responseObj.data = user;
        responseObj.httpStatusCode = 200;
        responseObj.message = 'Fetched user successfully';
      } else {
        responseObj.httpStatusCode = 404;
        responseObj.message = 'User not found';
      }
      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getUser,
      });
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.createUser,
      });
      logger.info({
        message: 'Create User Req Body',
        context: loggerContexts.createUser,
        data: req.body,
      });

      const newUser = await usersServices.createUser(req.body);
      const responseObj = new ResponseMessage();
      responseObj.data = newUser;
      responseObj.httpStatusCode = 201;
      responseObj.message = 'User created successfully';
      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.createUser,
      });
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.updateUser,
      });
      logger.info({
        message: 'Update User Req Body',
        context: loggerContexts.updateUser,
        data: req.body,
      });

      const updatedUser = await usersServices.updateUser(req.params.id, req.body);
      const responseObj = new ResponseMessage();
      responseObj.data = updatedUser || {};
      responseObj.httpStatusCode = updatedUser ? 200 : 404;
      responseObj.message = updatedUser ? 'User updated successfully' : 'User not found';
      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.updateUser,
      });
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.deleteUser,
      });

      const deletedUser = await usersServices.deleteUser(req.params.id);
      const responseObj = new ResponseMessage();
      responseObj.data = deletedUser || {};
      responseObj.httpStatusCode = deletedUser ? 200 : 404;
      responseObj.message = deletedUser ? 'User deleted successfully' : 'User not found';
      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.deleteUser,
      });
      next(error);
    }
  };
}

export { UserController };
