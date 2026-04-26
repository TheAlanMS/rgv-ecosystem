import { z } from "zod/v4";
import { CountySchema, PillarGroupSchema, StatusSchema } from "@/lib/types";

export const ActorsQuerySchema = z.object({
  county: CountySchema.optional(),
  status: StatusSchema.optional(),
  pillarGroup: PillarGroupSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export type ActorsQuery = z.infer<typeof ActorsQuerySchema>;

export function paramsObject(searchParams: URLSearchParams) {
  return Object.fromEntries(searchParams.entries());
}
