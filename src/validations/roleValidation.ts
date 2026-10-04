import { z } from 'zod';
import { idParamSchema, pageLimitQuerySchema } from './common';

const permissionIdsSchema = z.array(z.coerce.number().int().positive()).min(1);

const createRoleSchema = {
  body: z
    .object({ name: z.string().trim().min(1).max(50), permissions: permissionIdsSchema })
    .strict(),
};
const updateRoleSchema = {
  params: idParamSchema,
  body: z
    .object({
      name: z.string().trim().min(1).max(50),
      permissions: permissionIdsSchema.optional(),
    })
    .strict(),
};
const getRoleSchema = { params: idParamSchema };
const deleteRoleSchema = { params: idParamSchema };
const getRolesSchema = {
  query: pageLimitQuerySchema.extend({ search: z.string().trim().optional() }),
};

export { createRoleSchema, deleteRoleSchema, getRoleSchema, getRolesSchema, updateRoleSchema };
