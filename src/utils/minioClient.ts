import * as Minio from 'minio';

import config from '~/config/config';
import { loggerContexts } from '~/constants/loggerContexts';
import { logger } from './logger';

export const BUCKET_NAME = config.minio.minioBucket;

export const minioClient = new Minio.Client({
  useSSL: config.minio.useSSL,
  endPoint: config.minio.endPoint,
  port: config.minio.port,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey,
});

export const minioClint = async () => {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, '');

      logger.info({
        message: `Bucket "${BUCKET_NAME}" created`,
        context: loggerContexts.uploadFile,
      });
    } else {
      logger.info({
        message: `Bucket "${BUCKET_NAME}" already exists`,
        context: loggerContexts.uploadFile,
      });
    }
  } catch (error) {
    logger.error({ error, context: loggerContexts.uploadFile });
    throw error;
  }
};
