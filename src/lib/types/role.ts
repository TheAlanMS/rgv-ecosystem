import { z } from "zod/v4";

export const RoleColorsSchema = z.object({
  bg: z.string(),
  fg: z.string(),
});

export const RoleSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  shortLabel: z.string().min(1),
  description: z.string().min(1),
  initials: z.string().min(1).max(3),
  colors: RoleColorsSchema,
});

export type Role = z.infer<typeof RoleSchema>;
