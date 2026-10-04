import type { Request, Response } from 'express';

import { appCode } from '../constants/AppCode';
import { httpStatus } from '../constants/HttpStatusCode';
import { ResponseMessage } from '../utils/ResponseMessage';

const resourceNotFound = (_req: Request, res: Response): void => {
  const obj = new ResponseMessage();
  obj.appCode = appCode.error;
  obj.httpStatusCode = httpStatus.notFound;
  obj.message = 'resource not found';

  res.status(httpStatus.notFound).send(obj);
};

export { resourceNotFound };
