import type { NextFunction, Request, Response } from 'express';

import config from '~/config/config';
import { loggerContexts } from '~/constants/loggerContexts';
import { UrlServices } from '~/services/Url/UrlServices';
import BaseController from '~/utils/BaseController';
import { logger } from '~/utils/logger';
import { ResponseMessage } from '~/utils/ResponseMessage';

const urlServices = UrlServices.getInstance();

class UrlController extends BaseController {
  getAllUrls = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllUrls,
      });

      const urls = await urlServices.getAllUrls(req);
      const responseObj = new ResponseMessage();
      responseObj.data = urls;
      responseObj.httpStatusCode = 200;
      responseObj.message = 'Fetched all URLs successfully';
      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getAllUrls,
      });
      next(error);
    }
  };

  getUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getUrl,
      });

      const url = await urlServices.getUrl(req.params.code);
      const responseObj = new ResponseMessage();

      responseObj.data = url || {};
      responseObj.httpStatusCode = url ? 200 : 404;
      responseObj.message = 'URL not found';

      if (!url) {
        this.createResponse.success(res, responseObj);
        return;
      }

      res.redirect(url.targetUrl);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getUrl,
      });
      next(error);
    }
  };

  createUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.createUrl,
      });
      logger.info({
        message: 'Create URL Req Body',
        context: loggerContexts.createUrl,
        data: req.body,
      });

      if (!req.user) {
        next(new Error('Authenticated user is required to create a URL'));
        return;
      }

      const shortUrlBaseUrl = config.development.shortUrlBaseUrl;

      if (!shortUrlBaseUrl) {
        throw new Error('Short URL base URL is not configured');
      }

      const url = await urlServices.createUrl({
        ...req.body,
        userId: req.user.id,
        shortUrlBaseUrl,
      });
      const responseObj = new ResponseMessage();

      responseObj.data = {
        ...url.toJSON(),
        shortUrl: url.shortUrl,
      };
      responseObj.httpStatusCode = 201;
      responseObj.message = 'URL created successfully';

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.createUrl,
      });
      next(error);
    }
  };

  deleteUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.deleteUrl,
      });

      const url = await urlServices.deleteUrl(req.params.code);
      const responseObj = new ResponseMessage();

      responseObj.data = url || {};
      responseObj.httpStatusCode = url ? 200 : 404;
      responseObj.message = url ? 'URL deleted successfully' : 'URL not found';

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.deleteUrl,
      });
      next(error);
    }
  };
}

export { UrlController };
