import { v } from "convex/values";

export const counties = [
  "Cameron",
  "Hidalgo",
  "Starr",
  "Willacy",
  "OutsideRGV",
] as const;

export const orgTypes = [
  "Funder",
  "EDO",
  "University",
  "Incubator",
  "Accelerator",
  "Community",
  "Corporate",
  "ServiceProvider",
  "Government",
  "K12",
] as const;

export const stages = [
  "Idea",
  "PreSeed",
  "Seed",
  "Growth",
  "Scale",
  "AllStages",
] as const;

export const statuses = ["Active", "Emerging", "Inactive", "Gap"] as const;
export const pillarGroups = ["supply", "engine", "demand", "infra"] as const;
export const gapStatuses = ["Open", "InProgress", "Filled"] as const;
export const coordinateSources = [
  "exact",
  "city-center",
  "representative",
] as const;
export const submissionTypes = [
  "newListing",
  "correction",
  "gapFlag",
] as const;
export const moderationStatuses = [
  "pending",
  "approved",
  "needsMoreInfo",
  "declined",
  "published",
] as const;
export const adminRoles = ["admin", "moderator"] as const;

export const countyValidator = v.union(
  v.literal("Cameron"),
  v.literal("Hidalgo"),
  v.literal("Starr"),
  v.literal("Willacy"),
  v.literal("OutsideRGV"),
);
export const orgTypeValidator = v.union(
  v.literal("Funder"),
  v.literal("EDO"),
  v.literal("University"),
  v.literal("Incubator"),
  v.literal("Accelerator"),
  v.literal("Community"),
  v.literal("Corporate"),
  v.literal("ServiceProvider"),
  v.literal("Government"),
  v.literal("K12"),
);
export const stageValidator = v.union(
  v.literal("Idea"),
  v.literal("PreSeed"),
  v.literal("Seed"),
  v.literal("Growth"),
  v.literal("Scale"),
  v.literal("AllStages"),
);
export const statusValidator = v.union(
  v.literal("Active"),
  v.literal("Emerging"),
  v.literal("Inactive"),
  v.literal("Gap"),
);
export const pillarGroupValidator = v.union(
  v.literal("supply"),
  v.literal("engine"),
  v.literal("demand"),
  v.literal("infra"),
);
export const gapStatusValidator = v.union(
  v.literal("Open"),
  v.literal("InProgress"),
  v.literal("Filled"),
);
export const coordinateSourceValidator = v.union(
  v.literal("exact"),
  v.literal("city-center"),
  v.literal("representative"),
);
export const submissionTypeValidator = v.union(
  v.literal("newListing"),
  v.literal("correction"),
  v.literal("gapFlag"),
);
export const moderationStatusValidator = v.union(
  v.literal("pending"),
  v.literal("approved"),
  v.literal("needsMoreInfo"),
  v.literal("declined"),
  v.literal("published"),
);
export const adminRoleValidator = v.union(
  v.literal("admin"),
  v.literal("moderator"),
);

export const coordinatesValidator = v.object({
  lat: v.number(),
  lng: v.number(),
});

export const roleColorsValidator = v.object({
  bg: v.string(),
  fg: v.string(),
});

export const journeyStepValidator = v.object({
  base: v.string(),
  label: v.string(),
  pillars: v.array(v.number()),
  strategy: v.string(),
});
