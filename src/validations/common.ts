import { z } from 'zod';

const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const pageLimitQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  sortBy: z.string().trim().min(1).optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
});

export { idParamSchema, pageLimitQuerySchema };
