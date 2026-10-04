type AppHttpError = Error & {
  httpStatusCode?: number;
};

export type { AppHttpError };
