import { z } from 'zod';
import { RoleSchema } from './role.entity';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string().nullable(),
  role: z.array(RoleSchema),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
