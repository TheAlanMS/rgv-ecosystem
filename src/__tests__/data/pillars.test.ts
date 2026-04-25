import { describe, expect, it } from "vitest";
import { z } from "zod/v4";
import { ALL_PILLARS } from "@/lib/data";
import { PillarSchema } from "@/lib/types";

describe("pillar seed data", () => {
  it("validates all pillars against the pillar schema", () => {
    expect(() => z.array(PillarSchema).parse(ALL_PILLARS)).not.toThrow();
  });

  it("defines the ten PRD pillars with unique ids and slugs", () => {
    expect(ALL_PILLARS).toHaveLength(10);
    expect(ALL_PILLARS.map((pillar) => pillar.id).sort((a, b) => a - b)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(new Set(ALL_PILLARS.map((pillar) => pillar.slug)).size).toBe(10);
  });

  it("covers all four pillar groups", () => {
    expect(new Set(ALL_PILLARS.map((pillar) => pillar.group))).toEqual(
      new Set(["supply", "engine", "demand", "infra"]),
    );
  });
});
