import { describe, expect, it } from "vitest";
import { z } from "zod/v4";
import { ALL_JOURNEYS, ALL_PILLARS, ALL_ROLES } from "@/lib/data";
import { JourneySchema } from "@/lib/types";

describe("journey seed data", () => {
  it("validates all journeys against the journey schema", () => {
    expect(() => z.array(JourneySchema).parse(ALL_JOURNEYS)).not.toThrow();
  });

  it("has exactly four steps for every journey", () => {
    expect(ALL_JOURNEYS.every((journey) => journey.steps.length === 4)).toBe(true);
  });

  it("references valid roles and pillars", () => {
    const roleIds = new Set(ALL_ROLES.map((role) => role.id));
    const pillarIds = new Set(ALL_PILLARS.map((pillar) => pillar.id));

    for (const journey of ALL_JOURNEYS) {
      expect(roleIds.has(journey.roleId)).toBe(true);
      expect(
        journey.steps.every((step) =>
          step.pillars.every((pillarId) => pillarIds.has(pillarId)),
        ),
      ).toBe(true);
    }
  });
});
