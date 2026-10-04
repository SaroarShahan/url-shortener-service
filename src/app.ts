import rTracer from 'cls-rtracer';
import cors from 'cors';
import type { Application, Request, Response } from 'express';
import express from 'express';
import helmet from 'helmet';
import config from './config/config';
import { exceptionHandling } from './middlewares/ExceptionHandling';
import { resourceNotFound } from './middlewares/ResourcesNotFound';
import { RouteBinder } from './routes';
import { logger } from './utils/logger';

class App {
  initRoutes(app: Application): void {
    app.use(config.apiBaseUri, RouteBinder.bindRoutes());

    logger.info({
      message: '########## Routes initialized ###########',
      context: this.initRoutes.name,
    });
  }

  initMiddleware(app: Application): void {
    app.use(exceptionHandling);
    app.use(resourceNotFound);

    logger.info({
      message: '########## Middleware initialized ###########',
      context: this.initMiddleware.name,
    });
  }

  initHealthCheck(app: Application): void {
    app.get('/health', (_req: Request, res: Response) => {
      res.json({
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
      });
    });

    logger.info({
      message: '########## Health check initialized ###########',
      context: this.initHealthCheck.name,
    });
  }

  initGlobalVariable(): void {
    global.isProduction = process.env.NODE_ENV;

    logger.info({
      message: '########## Global variables initialized ###########',
      context: this.initGlobalVariable.name,
    });
  }

  initSecurity(app: Application): void {
    app.use(cors(config.corsOptions));
    app.use(helmet());
    logger.info({
      message: '########## Security initialized ###########',
      context: this.initSecurity.name,
    });
  }

  init(): Application {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(rTracer.expressMiddleware());
    this.initSecurity(app);
    this.initGlobalVariable();
    this.initHealthCheck(app);
    this.initRoutes(app);
    this.initMiddleware(app);
    app.disable('x-powered-by');

    return app;
  }
}

function createApp(): Application {
  return new App().init();
}

export { App, createApp };
