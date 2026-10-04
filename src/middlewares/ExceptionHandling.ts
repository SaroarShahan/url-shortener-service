import type { NextFunction, Request, Response } from 'express';
import { BaseError } from 'sequelize';

import { appCode } from '../constants/AppCode';
import { httpStatus } from '../constants/HttpStatusCode';
import { CreateResponse } from '../utils/CreateResponse';
import { logger } from '../utils/logger';
import { ResponseMessage } from '../utils/ResponseMessage';

type AppErrorLike = Error & {
  appCode?: number;
  httpStatusCode?: number;
  errorCode?: string;
  additionalData?: unknown;
  errorSource?: string;
  value?: unknown;
  error?: {
    message?: string;
  };
  type?: string;
};

const exceptionHandling = (
  err: AppErrorLike,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error({
    message: 'Unhandled application error',
    context: 'ExceptionHandling',
    error: err,
  });

  const response = new ResponseMessage();
  response.appCode = err instanceof BaseError ? appCode.error : err.appCode || appCode.error;
  response.httpStatusCode = err.httpStatusCode || httpStatus.internalServerError;
  response.message = err.message || 'Internal server error';
  response.errorCode = err.errorCode || '';
  response.additionalData = err.additionalData;
  response.errorSource = err.errorSource;

  if (err.value && err.error && err.type) {
    response.appCode = appCode.error;
    response.httpStatusCode = httpStatus.badRequest;
    response.message = err.error.message || 'Validation error';
  }

  if (err instanceof BaseError) {
    response.httpStatusCode = httpStatus.internalServerError;
    response.message = 'Database error';
  }

  new CreateResponse().error(res, response);
};

export { exceptionHandling };
