import type { Server } from 'node:http';
import http from 'node:http';
import dotenv from 'dotenv';

import { App } from './app';
import sequelize from './config/db';
import { loggerContexts } from './constants/loggerContexts';
import { logger } from './utils/logger';

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

const application = new App().init();
const server: Server = http.createServer(application);

const listen = (): void => {
  server.listen(PORT, () => {
    logger.info({
      message: '[ProjectName] API is running',
      context: loggerContexts.listen,
      data: {
        ip: HOST,
        port: PORT,
        processId: process.pid,
      },
    });
  });
};

const stopServer = (): void => {
  logger.info({
    message: '[ProjectName] Stopping server',
    context: loggerContexts.stopServer,
  });

  server.close(() => {
    logger.info({
      message: '[ProjectName] API is stopped',
      context: loggerContexts.stopServer,
      data: {
        ip: HOST,
        port: PORT,
      },
    });
  });
};

const startServer = (): void => {
  logger.info({
    message: '[ProjectName] Starting DB server',
    context: loggerContexts.startServer,
  });

  sequelize
    .authenticate()
    .then(() => {
      logger.info({
        message: '[ProjectName] Database connected',
        context: loggerContexts.startServer,
      });
      listen();
    })
    .catch((error: unknown) => {
      logger.error({
        error,
        context: loggerContexts.startServer,
      });
      process.exit(1);
    });
};

export { startServer, stopServer };
