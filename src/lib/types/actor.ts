import { z } from "zod/v4";
import { StatusSchema, OrgTypeSchema, StageSchema, CountySchema } from "./enums";

const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const CoordinateSourceSchema = z.enum(["exact", "city-center", "representative"]);
const PublicVisibilitySchema = z.enum(["public", "internal"]);
const QaStatusSchema = z.enum([
  "active",
  "needs_url",
  "needs_pillar_review",
  "needs_thumbnail",
  "future_contact_data_needed",
  "needs_removal_review",
]);

export const ActorSchema = z
  .object({
    // Required
    id: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().min(1),
    orgType: OrgTypeSchema,
    pillars: z.array(z.number().int().min(1).max(10)),
    city: z.string().min(1),
    county: CountySchema,
    description: z.string().min(1),
    whatTheyOffer: z.array(z.string()).min(1),
    whoTheyServe: z.array(z.string()).min(1),
    status: StatusSchema,

    // Conditional — required for Funder, Incubator, Accelerator
    stagesServed: z.array(StageSchema).optional(),

    // Optional
    pillarAssignments: z.array(z.string()).optional(),
    websiteUrl: z.string().min(1).optional(),
    applyUrl: z.string().url().optional(),
    thumbnailUrl: z.string().min(1).optional(),
    internalNotes: z.string().optional(),
    qaStatus: QaStatusSchema.optional(),
    publicVisibility: PublicVisibilitySchema.optional(),
    contactEmail: z.string().email().optional(),
    primaryContactName: z.string().optional(),
    primaryContactTitle: z.string().optional(),
    primaryContactEmail: z.string().optional(),
    primaryContactPhone: z.string().optional(),
    organizationAddress: z.string().optional(),
    region: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    contactSourceUrl: z.string().optional(),
    relationshipOwner: z.string().optional(),
    ecosystemRole: z.string().optional(),
    servicesOffered: z.array(z.string()).optional(),
    audienceServed: z.array(z.string()).optional(),
    eligibilityRequirements: z.string().optional(),
    programsOffered: z.array(z.string()).optional(),
    eventsHosted: z.array(z.string()).optional(),
    fundingAvailable: z.string().optional(),
    partnershipOpportunities: z.string().optional(),
    dataConfidenceScore: z.number().min(0).max(1).optional(),
    verificationStatus: z.string().optional(),
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
