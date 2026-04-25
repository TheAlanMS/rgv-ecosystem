import { describe, expect, it } from "vitest";
import { z } from "zod/v4";
import { ALL_ACTORS, ALL_GAPS, ALL_PILLARS } from "@/lib/data";
import {
  PILLAR_01_ACTORS,
  PILLAR_02_ACTORS,
  PILLAR_03_ACTORS,
  PILLAR_04_ACTORS,
  PILLAR_05_ACTORS,
  PILLAR_06_ACTORS,
  PILLAR_07_ACTORS,
  PILLAR_08_ACTORS,
  PILLAR_09_ACTORS,
  PILLAR_10_ACTORS,
} from "@/lib/data/actors";
import { ActorSchema, CountySchema } from "@/lib/types";

const SOURCE_ACTORS = [
  ...PILLAR_01_ACTORS,
  ...PILLAR_02_ACTORS,
  ...PILLAR_03_ACTORS,
  ...PILLAR_04_ACTORS,
  ...PILLAR_05_ACTORS,
  ...PILLAR_06_ACTORS,
  ...PILLAR_07_ACTORS,
  ...PILLAR_08_ACTORS,
  ...PILLAR_09_ACTORS,
  ...PILLAR_10_ACTORS,
];

describe("actor seed data", () => {
  it("validates every actor against the actor schema", () => {
    expect(() => z.array(ActorSchema).parse(ALL_ACTORS)).not.toThrow();
  });

  it("does not contain duplicate source ids or merged slugs", () => {
    expect(new Set(SOURCE_ACTORS.map((actor) => actor.id)).size).toBe(
      SOURCE_ACTORS.length,
    );
    expect(new Set(ALL_ACTORS.map((actor) => actor.slug)).size).toBe(
      ALL_ACTORS.length,
    );
  });

  it("uses valid counties and pillar references", () => {
    const pillarIds = new Set(ALL_PILLARS.map((pillar) => pillar.id));

    for (const actor of ALL_ACTORS) {
      expect(CountySchema.safeParse(actor.county).success).toBe(true);
      expect(actor.pillars.every((pillarId) => pillarIds.has(pillarId))).toBe(
        true,
      );
    }
  });

  it("keeps non-gap actor contact gaps explicit in seed metadata", () => {
    const actorsWithoutContact = ALL_ACTORS.filter(
      (actor) =>
        actor.status !== "Gap" &&
        !actor.websiteUrl &&
        !actor.applyUrl &&
        !actor.contactEmail,
    );

    expect(
      actorsWithoutContact.every(
        (actor) => actor.verifiedBy === "system" && actor.lastVerified.length > 0,
      ),
    ).toBe(true);
  });

  it("has coordinates for every RGV actor record", () => {
    const actorsWithoutCoordinates = ALL_ACTORS.filter(
      (actor) => actor.county !== "OutsideRGV" && !actor.coordinates,
    );

    expect(actorsWithoutCoordinates).toEqual([]);
  });

  it("represents Starr and Willacy through actors or explicit gaps", () => {
    for (const county of ["Starr", "Willacy"] as const) {
      const hasActor = ALL_ACTORS.some((actor) => actor.county === county);
      const hasGap = ALL_GAPS.some((gap) => gap.county === county);

      expect(hasActor || hasGap).toBe(true);
    }
  });
});
