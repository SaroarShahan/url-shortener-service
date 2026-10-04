import { appCode } from '../constants/AppCode';
import { httpStatus } from '../constants/HttpStatusCode';
import { CreateResponse } from './CreateResponse';

class BaseController {
  declare httpStatusCode: typeof httpStatus;
  declare appCode: typeof appCode;
  declare createResponse: CreateResponse;
}

BaseController.prototype.appCode = appCode;
BaseController.prototype.httpStatusCode = httpStatus;
BaseController.prototype.createResponse = new CreateResponse();

export default BaseController;
