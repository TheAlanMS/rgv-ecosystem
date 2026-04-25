import { z } from "zod/v4";
import { PillarGroupSchema } from "./enums";

export const PillarSchema = z.object({
  id: z.number().int().min(1).max(10),
  name: z.string().min(1),
  slug: z.string().min(1),
  capacity: z.string().min(1),
  group: PillarGroupSchema,
  description: z.string().min(1),
  status: z.string().min(1),
});

export type Pillar = z.infer<typeof PillarSchema>;
