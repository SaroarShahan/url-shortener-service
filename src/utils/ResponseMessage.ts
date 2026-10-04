class ResponseMessage {
  httpStatusCode;
  appCode;
  message;
  data;
  errorCode;
  additionalData;
  errorSource;

  constructor(_data = {}, _httpStatusCode = 0, _appCode = 0, _message = '') {
    this.httpStatusCode = _httpStatusCode || null;
    this.appCode = _appCode || null;
    this.message = _message || '';
    this.data = _data || {};
  }
}

export { ResponseMessage };
