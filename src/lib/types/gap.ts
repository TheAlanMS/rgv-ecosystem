import { z } from "zod/v4";
import { CountySchema, GapStatusSchema } from "./enums";

export const GapSchema = z.object({
  id: z.string().min(1),
  pillar: z.number().int().min(1).max(10),
  county: CountySchema,
  description: z.string().min(1),
  flaggedBy: z.string().min(1),
  dateFlagged: z.string(),
  status: GapStatusSchema,
});

export type Gap = z.infer<typeof GapSchema>;
