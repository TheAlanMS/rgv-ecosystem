import { z } from "zod/v4";
import { StatusSchema, OrgTypeSchema, StageSchema, CountySchema } from "./enums";

const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const CoordinateSourceSchema = z.enum(["exact", "city-center", "representative"]);

export const ActorSchema = z
  .object({
    // Required
    id: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().min(1),
    orgType: OrgTypeSchema,
    pillars: z.array(z.number().int().min(1).max(10)).min(1),
    city: z.string().min(1),
    county: CountySchema,
    description: z.string().min(1),
    whatTheyOffer: z.array(z.string()).min(1),
    whoTheyServe: z.array(z.string()).min(1),
    status: StatusSchema,

    // Conditional — required for Funder, Incubator, Accelerator
    stagesServed: z.array(StageSchema).optional(),

    // Optional
    websiteUrl: z.string().url().optional(),
    applyUrl: z.string().url().optional(),
    contactEmail: z.string().email().optional(),
    industryFocus: z.array(z.string()).optional(),
    coordinates: CoordinatesSchema.optional(),
    coordinateSource: CoordinateSourceSchema.optional(),
    rgvConnection: z.string().optional(),

    // System
    dateAdded: z.string(),
    lastVerified: z.string(),
    verifiedBy: z.string(),
    communitySubmitted: z.boolean(),
    submitterEmail: z.string().email().optional(),
  })
  .refine(
    (data) => {
      const requiresStages: Array<z.infer<typeof OrgTypeSchema>> = [
        "Funder",
        "Incubator",
        "Accelerator",
      ];
      if (requiresStages.includes(data.orgType)) {
        return (
          data.stagesServed !== undefined && data.stagesServed.length > 0
        );
      }
      return true;
    },
    {
      message:
        "stagesServed is required for Funder, Incubator, and Accelerator org types",
    },
  );

export type Actor = z.infer<typeof ActorSchema>;
