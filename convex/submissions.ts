import { v } from "convex/values";
import { mutation } from "./_generated/server";
import {
  countyValidator,
  orgTypeValidator,
  pillarGroupValidator,
} from "./domain";

const submitterFields = {
  submitterName: v.string(),
  submitterEmail: v.string(),
};

const newListingSubmissionValidator = v.object({
  type: v.literal("newListing"),
  ...submitterFields,
  organizationName: v.string(),
  orgType: orgTypeValidator,
  pillars: v.array(v.number()),
  city: v.string(),
  county: countyValidator,
  description: v.string(),
  whatTheyOffer: v.array(v.string()),
  whoTheyServe: v.array(v.string()),
  websiteUrl: v.optional(v.union(v.string(), v.literal(""))),
  contactEmail: v.optional(v.union(v.string(), v.literal(""))),
});

const correctionSubmissionValidator = v.object({
  type: v.literal("correction"),
  ...submitterFields,
  actor: v.string(),
  issue: v.string(),
  correction: v.string(),
});

const gapFlagSubmissionValidator = v.object({
  type: v.literal("gapFlag"),
  ...submitterFields,
  missingActorType: v.string(),
  county: countyValidator,
  pillar: v.number(),
  pillarGroup: v.optional(pillarGroupValidator),
  whyItMatters: v.string(),
});

export const create = mutation({
  args: {
    submission: v.union(
      newListingSubmissionValidator,
      correctionSubmissionValidator,
      gapFlagSubmissionValidator,
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const { submitterName, submitterEmail, type, ...payload } = args.submission;
    const organizationName =
      type === "newListing" ? args.submission.organizationName : undefined;

    const id = await ctx.db.insert("submissions", {
      type,
      status: "pending",
      submitterName,
      submitterEmail,
      organizationName,
      payload,
      createdAt: now,
      updatedAt: now,
    });

    return {
      id,
      status: "pending" as const,
      type,
      submitterEmail,
      createdAt: now,
    };
  },
});
