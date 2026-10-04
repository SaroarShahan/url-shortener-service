const serializeError = (error) => ({
  message: error.message,
  stack: error.stack,
});

const log = (level, payload) => {
  const logPayload = {
    level,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  if (payload.error instanceof Error) {
    logPayload.error = serializeError(payload.error);
  }

  console[level](logPayload);
};

const logger = {
  info(payload) {
    log('info', payload);
  },

  error(payload) {
    log('error', payload);
  },
};

export { logger };
