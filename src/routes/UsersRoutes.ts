import express from 'express';

import { UserController } from '../controllers/UserController';
import { authenticateToken, optionalAuthenticateToken } from '../middlewares/auth';
import { hasPermission } from '../middlewares/authorize';
import validate from '../middlewares/validate';
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  getUsersSchema,
  updateUserSchema,
} from '../validations/userValidation';

class UsersRoutes {
  static configureRoutes() {
    const router = express.Router();
    const userController = new UserController();

    router
      .route('/')
      .get([optionalAuthenticateToken, validate(getUsersSchema)], userController.getAllUsers)
      .post(
        [authenticateToken, hasPermission('users.create'), validate(createUserSchema)],
        userController.createUser,
      );

    router
      .route('/:id')
      .get([optionalAuthenticateToken, validate(getUserSchema)], userController.getUser)
      .patch(
        [authenticateToken, hasPermission('users.update'), validate(updateUserSchema)],
        userController.updateUser,
      )
      .delete(
        [authenticateToken, hasPermission('users.delete'), validate(deleteUserSchema)],
        userController.deleteUser,
      );

    return router;
  }
}

export { UsersRoutes };
