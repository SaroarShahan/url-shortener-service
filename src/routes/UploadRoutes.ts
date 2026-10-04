import express from 'express';

import { UploadController } from '../controllers/UploadController';
import { authenticateToken } from '../middlewares/auth';
import { hasPermission } from '../middlewares/authorize';
import { uploadMiddleware } from '../middlewares/upload';

class UploadRoutes {
  static configureRoutes() {
    const router = express.Router();
    const uploadController = new UploadController();

    router
      .route('/')
      .post([
        authenticateToken,
        hasPermission('uploads.create'),
        uploadMiddleware.single('file'),
        uploadController.uploadFile,
      ]);

    return router;
  }
}

export { UploadRoutes };
