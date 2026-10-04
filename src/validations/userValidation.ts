import { z } from 'zod';
import { idParamSchema, pageLimitQuerySchema } from './common';

const userStatusSchema = z.enum(['active', 'inactive', 'blocked']);
const genderSchema = z.enum(['male', 'female', 'other']);

const userFields = {
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  userName: z.string().trim().min(1),
  gender: genderSchema,
  email: z.string().trim().email(),
  password: z.string().min(8),
  status: userStatusSchema.optional(),
  roleId: z.coerce.number().int().positive().nullable().optional(),
};

const createUserSchema = { body: z.object(userFields).strict() };
const updateUserSchema = {
  params: idParamSchema,
  body: z.object(userFields).partial().strict(),
};
const getUserSchema = { params: idParamSchema };
const deleteUserSchema = { params: idParamSchema };
const getUsersSchema = {
  query: pageLimitQuerySchema.extend({ status: userStatusSchema.optional() }),
};

export { createUserSchema, deleteUserSchema, getUserSchema, getUsersSchema, updateUserSchema };
