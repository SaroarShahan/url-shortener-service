import { loggerContexts } from './constants/loggerContexts';
import { startServer, stopServer } from './server';
import { logger } from './utils/logger';

startServer();

if (process.env.IS_LOCAL !== 'true') {
  process.on('SIGTERM', stopServer);
}

process.on('uncaughtException', (err: Error) => {
  logger.error({
    message: 'Uncaught Exception',
    context: loggerContexts.process,
    data: {
      error: err.message,
      stack: err.stack,
    },
  });
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  logger.error({
    message: 'Unhandled Rejection',
    context: loggerContexts.process,
    data: {
      promise,
      reason,
    },
  });
});
