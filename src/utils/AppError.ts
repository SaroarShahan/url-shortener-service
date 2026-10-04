import { httpStatus } from './../constants/HttpStatusCode';

class AppError extends Error {
  isOperational;
  message;
  httpStatusCode;
  errorSource;
  additionalData;
  constructor(
    _message = '',
    errorSource = 'system',
    additionalData = {},
    _isOperational = true,
    _httpStatusCode = httpStatus.internalServerError,
  ) {
    super();
    Error.call(this);
    Error.captureStackTrace(this);
    this.message = _message;
    this.isOperational = _isOperational;
    this.httpStatusCode = _httpStatusCode;
    this.errorSource = errorSource;
    this.additionalData = additionalData;
  }
}

export { AppError };
