import express from 'express';
import { UrlController } from '~/controllers/UrlController';
import validate from '~/middlewares/validate';
import { getUrlSchema } from '~/validations/urlValidation';
import { AuthRoutes } from './AuthRoutes';
import { PermissionsRoutes } from './PermissionsRoutes';
import { RolesRoutes } from './RolesRoutes';
import { UploadRoutes } from './UploadRoutes';
import { UrlRoutes } from './UrlRoutes';
import { UsersRoutes } from './UsersRoutes';

class RouteBinder {
  static bindRoutes() {
    const router = express.Router();

    router.use('/auth', AuthRoutes.configureRoutes());
    router.use('/permissions', PermissionsRoutes.configureRoutes());
    router.use('/roles', RolesRoutes.configureRoutes());
    router.use('/users', UsersRoutes.configureRoutes());
    router.use('/uploads', UploadRoutes.configureRoutes());
    router.use('/urls', UrlRoutes.configureRoutes());

    return router;
  }

  static bindShortUrlRoutes() {
    const router = express.Router();
    const urlController = new UrlController();

    router.get('/:code', validate(getUrlSchema), urlController.getUrl);

    return router;
  }
}

export { RouteBinder };
