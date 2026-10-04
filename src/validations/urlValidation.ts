import { z } from 'zod';

import { pageLimitQuerySchema } from './common';

const createUrlFields = {
  targetUrl: z.string().trim().url().max(100),
};

const createUrlSchema = {
  body: z.preprocess((value) => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return value;
    }

    const body = value as Record<string, unknown>;
    if (!('targetUrl' in body) && 'target_url' in body) {
      const { target_url: targetUrl, ...rest } = body;
      return { ...rest, targetUrl };
    }

    return value;
  }, z.object(createUrlFields).strict()),
};
const getUrlSchema = { params: z.object({ code: z.string().trim().min(1).max(100) }) };
const deleteUrlSchema = { params: z.object({ code: z.string().trim().min(1).max(100) }) };
const getUrlsSchema = {
  query: pageLimitQuerySchema,
};

export { createUrlSchema, deleteUrlSchema, getUrlSchema, getUrlsSchema };
