import { v } from "convex/values";
import { query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import { countyValidator, statusValidator } from "./domain";

function publicActor(actor: Doc<"actors">) {
  const { _id, _creationTime, submitterEmail, createdAt, updatedAt, sortOrder, ...publicFields } = actor;
  void _id;
  void _creationTime;
  void submitterEmail;
  void createdAt;
  void updatedAt;
  void sortOrder;
  return publicFields;
}

export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 250;
    const actors = await ctx.db.query("actors").take(limit);
    return actors
      .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
      .map(publicActor);
  },
});

export const bySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const actor = await ctx.db
      .query("actors")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    return actor ? publicActor(actor) : null;
  },
});

export const byCounty = query({
  args: { county: countyValidator, limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const actors = await ctx.db
      .query("actors")
      .withIndex("by_county", (q) => q.eq("county", args.county))
      .take(args.limit ?? 250);
    return actors.sort((a, b) => a.sortOrder - b.sortOrder).map(publicActor);
  },
});

export const byStatus = query({
  args: { status: statusValidator, limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const actors = await ctx.db
      .query("actors")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .take(args.limit ?? 250);
    return actors.sort((a, b) => a.sortOrder - b.sortOrder).map(publicActor);
  },
});

export const byPillar = query({
  args: { pillarId: v.number(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const actors = await ctx.db.query("actors").take(args.limit ?? 250);
    return actors
      .filter((actor) => actor.pillars.includes(args.pillarId))
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(publicActor);
  },
});
