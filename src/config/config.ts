import dotenv from 'dotenv';

dotenv.config();

const useSSL = JSON.parse(process.env.MINIO_USE_SSL || 'false');

const config = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT,
    logging: console.log,
  },
  apiBaseUri: '/api/v1',
  corsOptions: {
    origin: process.env.CORSURL ? process.env.CORSURL.split(',') : '*',
    methods: 'GET,POST,PATCH,PUT,DELETE',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token,x-client-secret, Authorization,Access-Control-Allow-Origin',
  },
  minio: {
    useSSL: useSSL,
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: Number(process.env.MINIO_PORT || '9000'),
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    minioBucket: process.env.MINIO_BUCKET || 'node-boilerplate',
  },
} as const;

export default config;
