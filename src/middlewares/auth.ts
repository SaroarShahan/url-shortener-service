import type { NextFunction, Request, Response } from 'express';

import { appCode } from '../constants/AppCode';
import { httpStatus } from '../constants/HttpStatusCode';
import { PermissionModel, RoleModel, UserModel } from './../models';
import { CreateResponse } from '../utils/CreateResponse';
import { verifyToken } from '../utils/jwt';
import { ResponseMessage } from '../utils/ResponseMessage';

const sendUnauthorized = (res: Response, message: string): void => {
  const responseObj = new ResponseMessage();
  responseObj.appCode = appCode.error;
  responseObj.httpStatusCode = httpStatus.unAuthorised;
  responseObj.message = message;
  new CreateResponse().error(res, responseObj);
};

const isJwtError = (error: unknown): boolean => {
  if (!(error instanceof Error)) return false;

  return [
    'JWSInvalid',
    'JWSSignatureVerificationFailed',
    'JWTClaimValidationFailed',
    'JWTExpired',
    'JWTInvalid',
  ].includes(error.name);
};

const attachAuthenticatedUser = async (req: Request): Promise<boolean | null> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) return false;

  const payload = await verifyToken(token);
  const user = await UserModel.findByPk(payload.id, {
    attributes: ['id', 'userName', 'email', 'status', 'roleId'],
    include: [
      {
        model: RoleModel,
        as: 'role',
        attributes: ['id', 'name'],
        include: [
          {
            model: PermissionModel,
            as: 'permissions',
            attributes: ['id', 'name', 'label', 'module'],
            through: { attributes: [] },
          },
        ],
      },
    ],
  });

  if (!user) return null;

  req.user = {
    id: user.id,
    username: user.userName,
    email: user.email,
    status: user.status,
    roleId: user.roleId,
    role: user.role ? user.role.name : null,
    permissions: user.role?.permissions?.map((permission) => permission.name) || [],
  };

  return true;
};

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const isAuthenticated = await attachAuthenticatedUser(req);

    if (!isAuthenticated) {
      sendUnauthorized(
        res,
        req.headers.authorization ? 'Invalid access token' : 'Access token required',
      );
      return;
    }

    next();
    return;
  } catch (error) {
    if (isJwtError(error)) {
      sendUnauthorized(res, 'Invalid or expired token');
      return;
    }

    next(error);
  }
};

const optionalAuthenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const isAuthenticated = await attachAuthenticatedUser(req);

    if (isAuthenticated === null) {
      sendUnauthorized(res, 'Invalid access token');
      return;
    }

    next();
    return;
  } catch (error) {
    if (isJwtError(error)) {
      sendUnauthorized(res, 'Invalid or expired token');
      return;
    }

    next(error);
  }
};

export { attachAuthenticatedUser, authenticateToken, optionalAuthenticateToken };
