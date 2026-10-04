import type { NextFunction, Request, Response } from 'express';

import { loggerContexts } from '~/constants/loggerContexts';
import { UploadService } from '~/services/Upload/UploadService';
import BaseController from '~/utils/BaseController';
import { logger } from '~/utils/logger';
import { ResponseMessage } from '~/utils/ResponseMessage';

const uploadService = UploadService.getInstance();

export class UploadController extends BaseController {
  uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.uploadFile });
      logger.info({
        message: 'Uploaded File',
        context: loggerContexts.uploadFile,
        data: req.file,
      });

      if (!req.file) {
        const responseObj = new ResponseMessage();
        responseObj.httpStatusCode = 400;
        responseObj.message = 'No file uploaded';
        this.createResponse.success(res, responseObj);
        return;
      }

      const fileReq = req as Request & { file: Express.Multer.File };

      const upload = await uploadService.uploadFile(fileReq);

      const responseObj = new ResponseMessage();
      responseObj.data = { upload };
      responseObj.httpStatusCode = 200;
      responseObj.message = 'File uploaded successfully';

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.uploadFile });
      next(error);
    }
  };
}
