import type { NextFunction, Request, Response } from 'express';

import { USER_ROLES } from '../constants';
import { httpStatus } from '../constants/HttpStatusCode';
import { AppError } from '../utils/AppError';

const authorizationError = (message, statusCode) =>
  new AppError(message, 'authorization', {}, true, statusCode);

const hasPermission =
  (requiredPermission: string) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        next(authorizationError('Not authorized to access this route', httpStatus.unAuthorised));
        return;
      }

      if (req.user.role === USER_ROLES.ADMIN) {
        next();
        return;
      }

      if (!req.user.role) {
        next(
          authorizationError(
            'You do not have permission to perform this action',
            httpStatus.forbidden || 403,
          ),
        );
        return;
      }

      const permissions = Array.isArray(req.user.permissions) ? req.user.permissions : [];

      if (!permissions.includes(requiredPermission)) {
        next(
          authorizationError(
            'You do not have permission to perform this action',
            httpStatus.forbidden || 403,
          ),
        );
        return;
      }

      next();
    } catch (_error) {
      next(authorizationError('Error checking permissions', httpStatus.internalServerError));
    }
  };

export { hasPermission };
