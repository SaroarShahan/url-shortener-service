import { z } from 'zod';

const registerSchema = {
  body: z
    .object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().min(1),
      username: z.string().trim().min(1),
      email: z.string().trim().email(),
      password: z.string().min(8),
      gender: z.enum(['male', 'female', 'other']),
      roleId: z.coerce.number().int().positive(),
    })
    .strict(),
};

const loginSchema = {
  body: z
    .object({
      email: z.string().trim().email(),
      password: z.string().min(1),
    })
    .strict(),
};

export { loginSchema, registerSchema };
