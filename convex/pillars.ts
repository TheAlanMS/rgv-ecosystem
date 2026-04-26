import { v } from "convex/values";
import { query } from "./_generated/server";
import { pillarGroupValidator } from "./domain";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const pillars = await ctx.db.query("pillars").take(25);
    return pillars.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const bySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) =>
    await ctx.db
      .query("pillars")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique(),
});

export const byId = query({
  args: { id: v.number() },
  handler: async (ctx, args) =>
    await ctx.db
      .query("pillars")
      .withIndex("by_pillar_id", (q) => q.eq("id", args.id))
      .unique(),
});

export const byGroup = query({
  args: { group: pillarGroupValidator },
  handler: async (ctx, args) => {
    const pillars = await ctx.db
      .query("pillars")
      .withIndex("by_group", (q) => q.eq("group", args.group))
      .take(25);
    return pillars.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});
