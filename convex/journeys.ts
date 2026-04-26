import { v } from "convex/values";
import { query } from "./_generated/server";

export const listRoles = query({
  args: {},
  handler: async (ctx) => {
    const roles = await ctx.db.query("roles").take(50);
    return roles.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const roleById = query({
  args: { roleId: v.string() },
  handler: async (ctx, args) =>
    await ctx.db
      .query("roles")
      .withIndex("by_role_id", (q) => q.eq("id", args.roleId))
      .unique(),
});

export const listJourneys = query({
  args: {},
  handler: async (ctx) => {
    const journeys = await ctx.db.query("journeys").take(50);
    return journeys.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const journeyByRole = query({
  args: { roleId: v.string() },
  handler: async (ctx, args) =>
    await ctx.db
      .query("journeys")
      .withIndex("by_role", (q) => q.eq("roleId", args.roleId))
      .unique(),
});
