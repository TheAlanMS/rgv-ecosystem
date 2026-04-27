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
  const publicActors = ALL_ACTORS.filter(
    (actor) => actor.publicVisibility !== "internal",
  );

  it("returns all actors and counts from the canonical dataset", () => {
    expect(getAllActors()).toEqual(publicActors);
    expect(getActorCount()).toBe(publicActors.length);
    expect(getActiveActorCount()).toBe(
      publicActors.filter((actor) => actor.status === "Active").length,
    );
  });

  it("looks up actors by slug", () => {
    const actor = publicActors[0];

    expect(actor).toBeDefined();
    expect(getActorBySlug(actor!.slug)).toBe(actor);
    expect(getActorBySlug("missing-actor")).toBeUndefined();
  });

  it("filters actors by pillar, county, and status", () => {
    expect(getActorsByPillar(1)).toEqual(
      publicActors.filter((actor) => actor.pillars.includes(1)),
    );
    expect(getActorsByPillar(999)).toEqual([]);
    expect(getActorsByCounty("Hidalgo")).toEqual(
      publicActors.filter((actor) => actor.county === "Hidalgo"),
    );
    expect(getActorsByStatus("Active")).toEqual(
      publicActors.filter((actor) => actor.status === "Active"),
    );
  });

  it("hides internal placeholder-heavy QA actors from public actor queries", () => {
    expect(getAllActors().every((actor) => actor.publicVisibility !== "internal")).toBe(
      true,
    );
    expect(
      getActorBySlug("qa-001-ebridge-center-for-business-and-commercialization"),
    ).toBeUndefined();
    expect(getAllActors().some((actor) => actor.name === "RGV Partnership")).toBe(
      true,
    );
    expect(getAllActors().some((actor) => actor.name === "Fem City")).toBe(true);
  });

  it("returns gap actors as schema-valid actor records", () => {
    const gaps = getGapActors();

    expect(gaps).toEqual(publicActors.filter((actor) => actor.status === "Gap"));
    expect(gaps.every((actor) => ActorSchema.safeParse(actor).success)).toBe(true);
  });
});
