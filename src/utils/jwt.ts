import { createSecretKey } from 'node:crypto';
import { decodeJwt, jwtVerify, SignJWT } from 'jose';

import configByEnv from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config = configByEnv[env];

const getSecretKey = () => {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

  return createSecretKey(config.jwtSecret, 'utf-8');
};

const generateToken = async (payload) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(config.jwtExpiresIn || '7d')
    .sign(getSecretKey());

const verifyToken = async (token) => {
  const { payload } = await jwtVerify(token, getSecretKey());

  return { id: payload.id };
};

const decodeToken = async (token) => {
  try {
    const payload = decodeJwt(token);

    return { id: payload.id };
  } catch {
    return null;
  }
};

export { decodeToken, generateToken, verifyToken };
