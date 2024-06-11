import { z } from 'zod';

export const userSchema = z.object({
  fullname: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6),
  contact_phone: z.string().optional(),
  phone_verified: z.boolean().optional(),
  email_verified: z.boolean().optional(),
  confirmation_code: z.string().optional(),
});

export const authOnUsersSchema = userSchema.extend({
  role: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
