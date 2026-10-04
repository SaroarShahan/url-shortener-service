import express from 'express';

import { UrlController } from '~/controllers/UrlController';
import { authenticateToken } from '~/middlewares/auth';
import { hasPermission } from '~/middlewares/authorize';
import { shortenUrlLimiter } from '~/middlewares/RateLimiter';
import validate from '~/middlewares/validate';
import {
  createUrlSchema,
  deleteUrlSchema,
  getUrlSchema,
  getUrlsSchema,
} from '~/validations/urlValidation';

class UrlRoutes {
  static configureRoutes() {
    const router = express.Router();
    const urlController = new UrlController();

    router
      .route('/')
      .get(
        [authenticateToken, hasPermission('get.url'), validate(getUrlsSchema)],
        urlController.getAllUrls,
      )
      .post(
        [
          authenticateToken,
          shortenUrlLimiter,
          hasPermission('create.url'),
          validate(createUrlSchema),
        ],
        urlController.createUrl,
      );

    router
      .route('/:code')
      .get([shortenUrlLimiter, validate(getUrlSchema)], urlController.getUrl)
      .delete(
        [authenticateToken, hasPermission('delete.url'), validate(deleteUrlSchema)],
        urlController.deleteUrl,
      );

    return router;
  }
}

export { UrlRoutes };
