import express from 'express';

import { PermissionsController } from '../controllers/PermissionsController';
import { authenticateToken, optionalAuthenticateToken } from '../middlewares/auth';
import { hasPermission } from '../middlewares/authorize';
import validate from '../middlewares/validate';
import {
  createPermissionSchema,
  deletePermissionSchema,
  getPermissionSchema,
  getPermissionsSchema,
  updatePermissionSchema,
} from '../validations/permissionValidation';

class PermissionsRoutes {
  static configureRoutes() {
    const router = express.Router();
    const permissionsController = new PermissionsController();

    router
      .route('/')
      .get(
        [optionalAuthenticateToken, validate(getPermissionsSchema)],
        permissionsController.getAllPermissions,
      )
      .post(
        [authenticateToken, hasPermission('permissions.create'), validate(createPermissionSchema)],
        permissionsController.createPermission,
      );

    router
      .route('/:id')
      .get(
        [optionalAuthenticateToken, validate(getPermissionSchema)],
        permissionsController.getPermission,
      )
      .patch(
        [authenticateToken, hasPermission('permissions.update'), validate(updatePermissionSchema)],
        permissionsController.updatePermission,
      )
      .delete(
        [authenticateToken, hasPermission('permissions.delete'), validate(deletePermissionSchema)],
        permissionsController.deletePermission,
      );

    return router;
  }
}

export { PermissionsRoutes };
