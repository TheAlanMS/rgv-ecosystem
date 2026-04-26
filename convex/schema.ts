import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  adminRoleValidator,
  coordinateSourceValidator,
  coordinatesValidator,
  countyValidator,
  gapStatusValidator,
  journeyStepValidator,
  moderationStatusValidator,
  orgTypeValidator,
  pillarGroupValidator,
  roleColorsValidator,
  stageValidator,
  statusValidator,
  submissionTypeValidator,
} from "./domain";

export default defineSchema({
  actors: defineTable({
    id: v.string(),
    name: v.string(),
    slug: v.string(),
    orgType: orgTypeValidator,
    pillars: v.array(v.number()),
    city: v.string(),
    county: countyValidator,
    description: v.string(),
    whatTheyOffer: v.array(v.string()),
    whoTheyServe: v.array(v.string()),
    status: statusValidator,
    stagesServed: v.optional(v.array(stageValidator)),
    websiteUrl: v.optional(v.string()),
    applyUrl: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    industryFocus: v.optional(v.array(v.string())),
    coordinates: v.optional(coordinatesValidator),
    coordinateSource: v.optional(coordinateSourceValidator),
    rgvConnection: v.optional(v.string()),
    dateAdded: v.string(),
    lastVerified: v.string(),
    verifiedBy: v.string(),
    communitySubmitted: v.boolean(),
    submitterEmail: v.optional(v.string()),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_actor_id", ["id"])
    .index("by_slug", ["slug"])
    .index("by_county", ["county"])
    .index("by_status", ["status"])
    .index("by_county_status", ["county", "status"]),

  pillars: defineTable({
    id: v.number(),
    name: v.string(),
    slug: v.string(),
    capacity: v.string(),
    group: pillarGroupValidator,
    description: v.string(),
    status: v.string(),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_pillar_id", ["id"])
    .index("by_slug", ["slug"])
    .index("by_group", ["group"]),

  gaps: defineTable({
    id: v.string(),
    pillar: v.number(),
    county: countyValidator,
    description: v.string(),
    flaggedBy: v.string(),
    dateFlagged: v.string(),
    status: gapStatusValidator,
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_gap_id", ["id"])
    .index("by_pillar", ["pillar"])
    .index("by_county", ["county"])
    .index("by_status", ["status"])
    .index("by_county_status", ["county", "status"]),

  roles: defineTable({
    id: v.string(),
    label: v.string(),
    shortLabel: v.string(),
    description: v.string(),
    initials: v.string(),
    colors: roleColorsValidator,
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_role_id", ["id"]),

  journeys: defineTable({
    roleId: v.string(),
    title: v.string(),
    steps: v.array(journeyStepValidator),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_role", ["roleId"]),

  submissions: defineTable({
    type: submissionTypeValidator,
    status: moderationStatusValidator,
    submitterName: v.string(),
    submitterEmail: v.string(),
    organizationName: v.optional(v.string()),
    payload: v.any(),
    reviewerNotes: v.optional(v.string()),
    requestedInfo: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_type", ["type"])
    .index("by_status_type", ["status", "type"]),

  moderationDecisions: defineTable({
    submissionId: v.id("submissions"),
    status: moderationStatusValidator,
    reviewerUserId: v.string(),
    reviewerNotes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_submission", ["submissionId"])
    .index("by_status", ["status"]),

  adminUserRoles: defineTable({
    userId: v.string(),
    email: v.optional(v.string()),
    role: adminRoleValidator,
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_role", ["role"]),
});
