import type { NextFunction, Request, Response } from 'express';

import { loggerContexts } from '../constants/loggerContexts';
import { RolesServices } from '../services/Roles/RolesServices';
import BaseController from '../utils/BaseController';
import { logger } from '../utils/logger';
import { ResponseMessage } from '../utils/ResponseMessage';

const rolesServices = RolesServices.getInstance();

class RoleController extends BaseController {
  getAllRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.getAllRoles });
      const roles = await rolesServices.getAllRoles(req);
      const responseObj = new ResponseMessage();

      responseObj.data = roles;
      responseObj.httpStatusCode = 200;
      responseObj.message = 'Fetched all roles successfully';

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.getAllRoles });
      next(error);
    }
  };

  getRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.getRole });
      const role = await rolesServices.getRole(req.params.id);
      const responseObj = new ResponseMessage();

      responseObj.data = role || {};
      responseObj.httpStatusCode = role ? 200 : 404;
      responseObj.message = role ? 'Fetched role successfully' : 'Role not found';

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.getRole });
      next(error);
    }
  };

  createRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.createRole });
      logger.info({
        message: 'Create Role Req Body',
        context: loggerContexts.createRole,
        data: req.body,
      });

      const { name, permissions } = req.body;
      const responseObj = new ResponseMessage();
      if (!name) {
        responseObj.httpStatusCode = 400;
        responseObj.message = 'Role name is required';
      } else if (!Array.isArray(permissions) || permissions.length === 0) {
        responseObj.httpStatusCode = 400;
        responseObj.message = 'At least one permission is required';
      } else {
        const existingRole = await rolesServices.rolesRepository.findOne({
          where: { name },
        });
        if (existingRole) {
          responseObj.httpStatusCode = 409;
          responseObj.message = 'Role with this name already exists';
        } else {
          responseObj.data = await rolesServices.createRole({ name, permissions });
          responseObj.httpStatusCode = 201;
          responseObj.message = 'Role created successfully';
        }
      }

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.createRole });
      next(error);
    }
  };

  updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.updateRole });
      logger.info({
        message: 'Update Role Req Body',
        context: loggerContexts.updateRole,
        data: req.body,
      });

      const responseObj = new ResponseMessage();
      const role = await rolesServices.getRole(req.params.id);
      const { name, permissions } = req.body;

      if (!name) {
        responseObj.httpStatusCode = 400;
        responseObj.message = 'Role name is required';
      } else if (!role) {
        responseObj.httpStatusCode = 404;
        responseObj.message = 'Role not found';
      } else {
        const existingRole = await rolesServices.rolesRepository.findOne({
          where: { name },
        });
        if (existingRole && String(existingRole.id) !== String(role.id)) {
          responseObj.httpStatusCode = 409;
          responseObj.message = 'Role with this name already exists';
        } else if (
          typeof permissions !== 'undefined' &&
          (!Array.isArray(permissions) || permissions.length === 0)
        ) {
          responseObj.httpStatusCode = 400;
          responseObj.message = 'At least one permission is required';
        } else {
          responseObj.data = await rolesServices.updateRole(req.params.id, {
            name,
            permissions,
          });
          responseObj.httpStatusCode = 200;
          responseObj.message = 'Role updated successfully';
        }
      }

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.updateRole });
      next(error);
    }
  };

  deleteRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.deleteRole });
      const result = await rolesServices.deleteRole(req.params.id);
      const responseObj = new ResponseMessage();

      responseObj.data = result.role || {};
      responseObj.httpStatusCode = result.role ? 200 : 404;
      responseObj.message = result.role ? 'Role deleted successfully' : 'Role not found';

      this.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.deleteRole });
      next(error);
    }
  };
}

export { RoleController };
