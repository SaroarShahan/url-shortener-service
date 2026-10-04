import express from 'express';

import { AuthRoutes } from './AuthRoutes';
import { PermissionsRoutes } from './PermissionsRoutes';
import { RolesRoutes } from './RolesRoutes';
import { UploadRoutes } from './UploadRoutes';
import { UsersRoutes } from './UsersRoutes';

class RouteBinder {
  static bindRoutes() {
    const router = express.Router();

    router.use('/auth', AuthRoutes.configureRoutes());
    router.use('/permissions', PermissionsRoutes.configureRoutes());
    router.use('/roles', RolesRoutes.configureRoutes());
    router.use('/users', UsersRoutes.configureRoutes());
    router.use('/uploads', UploadRoutes.configureRoutes());

    return router;
  }
}

export { RouteBinder };
