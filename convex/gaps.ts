import { v } from "convex/values";
import { query } from "./_generated/server";
import { countyValidator, gapStatusValidator } from "./domain";

export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const gaps = await ctx.db.query("gaps").take(args.limit ?? 250);
    return gaps.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const byPillar = query({
  args: { pillarId: v.number(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const gaps = await ctx.db
      .query("gaps")
      .withIndex("by_pillar", (q) => q.eq("pillar", args.pillarId))
      .take(args.limit ?? 250);
    return gaps.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const byCounty = query({
  args: { county: countyValidator, limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const gaps = await ctx.db
      .query("gaps")
      .withIndex("by_county", (q) => q.eq("county", args.county))
      .take(args.limit ?? 250);
    return gaps.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const byStatus = query({
  args: { status: gapStatusValidator, limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const gaps = await ctx.db
      .query("gaps")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .take(args.limit ?? 250);
    return gaps.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});
