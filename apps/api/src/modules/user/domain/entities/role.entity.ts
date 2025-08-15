import { z } from 'zod';

export const RoleEnum = z.enum(['OWNER', 'ADMIN', 'USER']);
export const AppNameEnum = z.enum(['ALL', 'KANBAN', 'WIKI']);

export const RoleSchema = z.object({
  role: RoleEnum,
  appName: AppNameEnum,
});
