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

export const loginUserSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});


export const registerUserSchema = z.object({
  user_id: z.number(),
  username: z.string(),
  password: z.string(),
  role: z.string().optional()
 
})



