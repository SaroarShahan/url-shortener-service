import rTracer from 'cls-rtracer';
import { appCode } from './../constants/AppCode';
import { httpStatus } from './../constants/HttpStatusCode';

class CreateResponse {
  success(res, ResponseMessageObj) {
    ResponseMessageObj.requestId = rTracer.id();

    if (!ResponseMessageObj.httpStatusCode) {
      ResponseMessageObj.httpStatusCode = httpStatus.ok;
    }

    if (!ResponseMessageObj.appCode) {
      ResponseMessageObj.appCode = appCode.success;
    }

    res.status(ResponseMessageObj.httpStatusCode);
    res.send(ResponseMessageObj);
  }

  error(res, ResponseMessageObj) {
    ResponseMessageObj.requestId = rTracer.id();
    if (!ResponseMessageObj.httpStatusCode) {
      ResponseMessageObj.httpStatusCode = httpStatus.internalServerError;
    }

    if (!ResponseMessageObj.appCode) {
      ResponseMessageObj.appCode = appCode.error;
    }

    res.status(ResponseMessageObj.httpStatusCode);
    res.send(ResponseMessageObj);
  }
}

export { CreateResponse };
