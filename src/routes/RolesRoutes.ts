import express from 'express';

import { RoleController } from '../controllers/RoleController';
import { authenticateToken, optionalAuthenticateToken } from '../middlewares/auth';
import { hasPermission } from '../middlewares/authorize';
import validate from '../middlewares/validate';
import {
  createRoleSchema,
  deleteRoleSchema,
  getRoleSchema,
  getRolesSchema,
  updateRoleSchema,
} from '../validations/roleValidation';

class RolesRoutes {
  static configureRoutes() {
    const router = express.Router();
    const roleController = new RoleController();

    router
      .route('/')
      .get([optionalAuthenticateToken, validate(getRolesSchema)], roleController.getAllRoles)
      .post(
        [authenticateToken, hasPermission('roles.create'), validate(createRoleSchema)],
        roleController.createRole,
      );

    router
      .route('/:id')
      .get([optionalAuthenticateToken, validate(getRoleSchema)], roleController.getRole)
      .patch(
        [authenticateToken, hasPermission('roles.update'), validate(updateRoleSchema)],
        roleController.updateRole,
      )
      .delete(
        [authenticateToken, hasPermission('roles.delete'), validate(deleteRoleSchema)],
        roleController.deleteRole,
      );

    return router;
  }
}

export { RolesRoutes };
