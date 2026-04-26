import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";

const actorValidator = v.any();
const pillarValidator = v.any();
const gapValidator = v.any();
const roleValidator = v.any();
const journeyValidator = v.any();

async function replaceByNaturalKey(
  ctx: MutationCtx,
  tableName: "actors" | "pillars" | "gaps" | "roles",
  value: string | number,
  document: Record<string, unknown>,
) {
  const existing =
    tableName === "actors"
      ? await ctx.db
          .query("actors")
          .withIndex("by_actor_id", (q) => q.eq("id", value as string))
          .unique()
      : tableName === "pillars"
        ? await ctx.db
            .query("pillars")
            .withIndex("by_pillar_id", (q) => q.eq("id", value as number))
            .unique()
        : tableName === "gaps"
          ? await ctx.db
              .query("gaps")
              .withIndex("by_gap_id", (q) => q.eq("id", value as string))
              .unique()
          : await ctx.db
              .query("roles")
              .withIndex("by_role_id", (q) => q.eq("id", value as string))
              .unique();
  if (existing) {
    const { createdAt, ...patch } = document;
    void createdAt;
    await ctx.db.patch(existing._id, patch);
    return;
  }
  await ctx.db.insert(tableName, document as never);
}

export const upsertSeedData = internalMutation({
  args: {
    actors: v.array(actorValidator),
    pillars: v.array(pillarValidator),
    gaps: v.array(gapValidator),
    roles: v.array(roleValidator),
    journeys: v.array(journeyValidator),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    for (const [sortOrder, pillar] of args.pillars.entries()) {
      await replaceByNaturalKey(ctx, "pillars", pillar.id, {
        ...pillar,
        sortOrder,
        updatedAt: now,
        createdAt: now,
      });
    }

    for (const [sortOrder, actor] of args.actors.entries()) {
      await replaceByNaturalKey(ctx, "actors", actor.id, {
        ...actor,
        sortOrder,
        updatedAt: now,
        createdAt: now,
      });
    }

    for (const [sortOrder, gap] of args.gaps.entries()) {
      await replaceByNaturalKey(ctx, "gaps", gap.id, {
        ...gap,
        sortOrder,
        updatedAt: now,
        createdAt: now,
      });
    }

    for (const [sortOrder, role] of args.roles.entries()) {
      await replaceByNaturalKey(ctx, "roles", role.id, {
        ...role,
        sortOrder,
        updatedAt: now,
        createdAt: now,
      });
    }

    for (const [sortOrder, journey] of args.journeys.entries()) {
      const existing = await ctx.db
        .query("journeys")
        .withIndex("by_role", (q) => q.eq("roleId", journey.roleId))
        .unique();
      const document = { ...journey, sortOrder, updatedAt: now, createdAt: now };
      if (existing) {
        await ctx.db.patch(existing._id, document);
      } else {
        await ctx.db.insert("journeys", document);
      }
    }

    return {
      actors: args.actors.length,
      pillars: args.pillars.length,
      gaps: args.gaps.length,
      roles: args.roles.length,
      journeys: args.journeys.length,
    };
  },
});
