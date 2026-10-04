import { z } from 'zod';
import { idParamSchema, pageLimitQuerySchema } from './common';

const permissionFields = {
  name: z.string().trim().min(1).max(100),
  label: z.string().trim().min(1).max(100),
  module: z.string().trim().min(1).max(100),
};

const createPermissionSchema = { body: z.object(permissionFields).strict() };
const updatePermissionSchema = {
  params: idParamSchema,
  body: z.object(permissionFields).partial().strict(),
};
const getPermissionSchema = { params: idParamSchema };
const deletePermissionSchema = { params: idParamSchema };
const getPermissionsSchema = {
  query: pageLimitQuerySchema.extend({
    module: z.string().trim().optional(),
    search: z.string().trim().optional(),
  }),
};

export {
  createPermissionSchema,
  deletePermissionSchema,
  getPermissionSchema,
  getPermissionsSchema,
  updatePermissionSchema,
};
