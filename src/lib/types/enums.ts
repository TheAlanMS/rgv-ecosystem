import { z } from "zod/v4";

// ── Status ──
export const StatusSchema = z.enum(["Active", "Emerging", "Inactive", "Gap"]);
export type Status = z.infer<typeof StatusSchema>;

// ── Organization Type ──
export const OrgTypeSchema = z.enum([
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
]);
export type OrgType = z.infer<typeof OrgTypeSchema>;

// ── Startup / Venture Stage ──
export const StageSchema = z.enum([
  "Idea",
  "PreSeed",
  "Seed",
  "Growth",
  "Scale",
  "AllStages",
]);
export type Stage = z.infer<typeof StageSchema>;

// ── Pillar Group ──
export const PillarGroupSchema = z.enum([
  "supply",
  "engine",
  "demand",
  "infra",
]);
export type PillarGroup = z.infer<typeof PillarGroupSchema>;

// ── Gap Status ──
export const GapStatusSchema = z.enum(["Open", "InProgress", "Filled"]);
export type GapStatus = z.infer<typeof GapStatusSchema>;

// ── County ──
export const CountySchema = z.enum([
  "Cameron",
  "Hidalgo",
  "Starr",
  "Willacy",
  "OutsideRGV",
]);
export type County = z.infer<typeof CountySchema>;

// ── Display labels ──
export const PILLAR_GROUP_LABELS: Record<PillarGroup, string> = {
  supply: "Supply",
  engine: "Engine",
  demand: "Demand",
  infra: "Infrastructure",
};

export const STATUS_LABELS: Record<Status, string> = {
  Active: "Active",
  Emerging: "Emerging",
  Inactive: "Inactive",
  Gap: "Gap",
};

export const COUNTY_LABELS: Record<County, string> = {
  Cameron: "Cameron County",
  Hidalgo: "Hidalgo County",
  Starr: "Starr County",
  Willacy: "Willacy County",
  OutsideRGV: "Outside RGV",
};

export const STAGE_LABELS: Record<Stage, string> = {
  Idea: "Idea",
  PreSeed: "Pre-Seed",
  Seed: "Seed",
  Growth: "Growth",
  Scale: "Scale",
  AllStages: "All Stages",
};
