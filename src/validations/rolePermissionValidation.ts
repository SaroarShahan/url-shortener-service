import { z } from 'zod';
import { idParamSchema, pageLimitQuerySchema } from './common';

const rolePermissionFields = {
  roleId: z.coerce.number().int().positive(),
  permissionId: z.coerce.number().int().positive(),
};

const createRolePermissionSchema = { body: z.object(rolePermissionFields).strict() };
const updateRolePermissionSchema = {
  params: idParamSchema,
  body: z.object(rolePermissionFields).partial().strict(),
};
const getRolePermissionSchema = { params: idParamSchema };
const deleteRolePermissionSchema = { params: idParamSchema };
const getRolePermissionsSchema = {
  query: pageLimitQuerySchema.extend({
    roleId: z.coerce.number().int().positive().optional(),
    permissionId: z.coerce.number().int().positive().optional(),
  }),
};

export {
  createRolePermissionSchema,
  deleteRolePermissionSchema,
  getRolePermissionSchema,
  getRolePermissionsSchema,
  updateRolePermissionSchema,
};
