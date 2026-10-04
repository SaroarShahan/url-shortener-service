import type { NextFunction, Request, Response } from 'express';

import { loggerContexts } from '../constants/loggerContexts';
import { PermissionServices } from '../services/Permissions/PermissionServices';
import BaseController from '../utils/BaseController';
import { logger } from '../utils/logger';
import { ResponseMessage } from '../utils/ResponseMessage';

const permissionServices = PermissionServices.getInstance();

class PermissionsController extends BaseController {
  getAllPermissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllPermissions,
      });
      const permissions = await permissionServices.getAllPermissions(req);
      const responseObj = new ResponseMessage();

      responseObj.data = permissions;
      responseObj.httpStatusCode = 200;
      responseObj.message = 'Fetched all permissions successfully';

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.getAllPermissions });
      next(error);
    }
  };

  getPermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getPermission,
      });
      const permission = await permissionServices.getPermission(req.params.id);
      const responseObj = new ResponseMessage();

      responseObj.data = permission || {};
      responseObj.httpStatusCode = permission ? 200 : 404;
      responseObj.message = permission ? 'Fetched permission successfully' : 'Permission not found';

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.getPermission });
      next(error);
    }
  };

  createPermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.createPermission,
      });
      logger.info({
        message: 'Create Permission Req Body',
        context: loggerContexts.createPermission,
        data: req.body,
      });

      const { name, label, module } = req.body;
      const responseObj = new ResponseMessage();

      if (!name || !label || !module) {
        responseObj.httpStatusCode = 400;
        responseObj.message = 'Name, label, and module are required';
      } else {
        const existingPermission = await permissionServices.permissionsRepository.findOne({
          where: { name },
        });

        if (existingPermission) {
          responseObj.httpStatusCode = 409;
          responseObj.message = 'Permission with this name already exists';
        } else {
          responseObj.data = await permissionServices.createPermission({
            name,
            label,
            module,
          });
          responseObj.httpStatusCode = 201;
          responseObj.message = 'Permission created successfully';
        }
      }

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.createPermission });
      next(error);
    }
  };

  updatePermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.updatePermission,
      });
      logger.info({
        message: 'Update Permission Req Body',
        context: loggerContexts.updatePermission,
        data: req.body,
      });

      const permission = await permissionServices.getPermission(req.params.id);
      const { name, label, module } = req.body;
      const responseObj = new ResponseMessage();

      if (!name || !label || !module) {
        responseObj.httpStatusCode = 400;
        responseObj.message = 'Name, label, and module are required';
      } else if (!permission) {
        responseObj.httpStatusCode = 404;
        responseObj.message = 'Permission not found';
      } else {
        const existingPermission = await permissionServices.permissionsRepository.findOne({
          where: { name },
        });

        if (existingPermission && String(existingPermission.id) !== String(permission.id)) {
          responseObj.httpStatusCode = 409;
          responseObj.message = 'Permission with this name already exists';
        } else {
          responseObj.data = await permissionServices.updatePermission(req.params.id, {
            name,
            label,
            module,
          });
          responseObj.httpStatusCode = 200;
          responseObj.message = 'Permission updated successfully';
        }
      }

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.updatePermission });
      next(error);
    }
  };

  deletePermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.deletePermission,
      });
      const result = await permissionServices.deletePermission(req.params.id);
      const responseObj = new ResponseMessage();

      responseObj.data = result.permission || {};
      responseObj.httpStatusCode = result.permission ? 200 : 404;
      responseObj.message = result.permission
        ? 'Permission deleted successfully'
        : 'Permission not found';

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.deletePermission });
      next(error);
    }
  };
}

export { PermissionsController };
