import { z } from "zod/v4";
import { CountySchema, OrgTypeSchema, PillarGroupSchema } from "./enums";

const SubmitterSchema = z.object({
  submitterName: z.string().trim().min(2, "Name is required."),
  submitterEmail: z.email("A valid private email is required."),
});

const UrlSchema = z
  .string()
  .trim()
  .url("Enter a valid URL.")
  .optional()
  .or(z.literal(""));

export const NewListingSubmissionSchema = SubmitterSchema.extend({
  type: z.literal("newListing"),
  organizationName: z.string().trim().min(2, "Organization name is required."),
  orgType: OrgTypeSchema,
  pillars: z.array(z.number().int().min(1).max(10)).min(1, "Choose at least one pillar."),
  city: z.string().trim().min(2, "City is required."),
  county: CountySchema,
  description: z.string().trim().min(20, "Description should be at least 20 characters."),
  whatTheyOffer: z.array(z.string().trim().min(2)).min(1, "Add at least one offering."),
  whoTheyServe: z.array(z.string().trim().min(2)).min(1, "Add at least one audience."),
  websiteUrl: UrlSchema,
  contactEmail: z.email("Enter a valid contact email.").optional().or(z.literal("")),
});

export const CorrectionSubmissionSchema = SubmitterSchema.extend({
  type: z.literal("correction"),
  actor: z.string().trim().min(2, "Actor name or slug is required."),
  issue: z.string().trim().min(10, "Describe what is wrong."),
  correction: z.string().trim().min(10, "Describe the correct information."),
});

export const GapFlagSubmissionSchema = SubmitterSchema.extend({
  type: z.literal("gapFlag"),
  missingActorType: z.string().trim().min(2, "Missing actor type is required."),
  county: CountySchema,
  pillar: z.number().int().min(1).max(10),
  pillarGroup: PillarGroupSchema.optional(),
  whyItMatters: z.string().trim().min(20, "Explain why this gap matters."),
});

export const SubmissionSchema = z.discriminatedUnion("type", [
  NewListingSubmissionSchema,
  CorrectionSubmissionSchema,
  GapFlagSubmissionSchema,
]);

export type CreateSubmissionInput = z.infer<typeof SubmissionSchema>;
export type SubmissionType = CreateSubmissionInput["type"];

export interface SubmissionConfirmation {
  id: string;
  status: "pending";
  type: SubmissionType;
  submitterEmail: string;
  createdAt: number;
}
