import { query } from "./_generated/server";

export const metrics = query({
  args: {},
  handler: async (ctx) => {
    const [actors, gaps] = await Promise.all([
      ctx.db.query("actors").collect(),
      ctx.db.query("gaps").collect(),
    ]);

    return {
      actorCount: actors.length,
      activeActorCount: actors.filter((actor) => actor.status === "Active").length,
      gapCount: gaps.length,
      openGapCount: gaps.filter((gap) => gap.status === "Open").length,
    };
  },
});
