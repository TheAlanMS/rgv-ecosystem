import { describe, expect, it } from "vitest";
import { ALL_ACTORS } from "@/lib/data";
import {
  getActiveActorCount,
  getActorBySlug,
  getActorCount,
  getActorsByCounty,
  getActorsByPillar,
  getActorsByStatus,
  getAllActors,
  getGapActors,
} from "@/lib/queries/actors";
import { ActorSchema } from "@/lib/types";

describe("actor queries", () => {
  it("returns all actors and counts from the canonical dataset", () => {
    expect(getAllActors()).toBe(ALL_ACTORS);
    expect(getActorCount()).toBe(ALL_ACTORS.length);
    expect(getActiveActorCount()).toBe(
      ALL_ACTORS.filter((actor) => actor.status === "Active").length,
    );
  });

  it("looks up actors by slug", () => {
    const actor = ALL_ACTORS[0];

    expect(actor).toBeDefined();
    expect(getActorBySlug(actor!.slug)).toBe(actor);
    expect(getActorBySlug("missing-actor")).toBeUndefined();
  });

  it("filters actors by pillar, county, and status", () => {
    expect(getActorsByPillar(1)).toEqual(
      ALL_ACTORS.filter((actor) => actor.pillars.includes(1)),
    );
    expect(getActorsByPillar(999)).toEqual([]);
    expect(getActorsByCounty("Hidalgo")).toEqual(
      ALL_ACTORS.filter((actor) => actor.county === "Hidalgo"),
    );
    expect(getActorsByStatus("Active")).toEqual(
      ALL_ACTORS.filter((actor) => actor.status === "Active"),
    );
  });

  it("returns gap actors as schema-valid actor records", () => {
    const gaps = getGapActors();

    expect(gaps).toEqual(ALL_ACTORS.filter((actor) => actor.status === "Gap"));
    expect(gaps.every((actor) => ActorSchema.safeParse(actor).success)).toBe(true);
  });
});
