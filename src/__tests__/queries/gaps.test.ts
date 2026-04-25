import { describe, expect, it } from "vitest";
import { ALL_GAPS } from "@/lib/data";
import {
  getAllGaps,
  getGapsByCounty,
  getGapsByPillar,
  getOpenGaps,
} from "@/lib/queries/gaps";
import { GapSchema } from "@/lib/types";

describe("gap queries", () => {
  it("returns all gaps from the canonical dataset", () => {
    expect(getAllGaps()).toBe(ALL_GAPS);
  });

  it("filters gaps by pillar and county", () => {
    expect(getGapsByPillar(1)).toEqual(
      ALL_GAPS.filter((gap) => gap.pillar === 1),
    );
    expect(getGapsByPillar(999)).toEqual([]);
    expect(getGapsByCounty("Starr")).toEqual(
      ALL_GAPS.filter((gap) => gap.county === "Starr"),
    );
    expect(getGapsByCounty("Willacy")).toEqual(
      ALL_GAPS.filter((gap) => gap.county === "Willacy"),
    );
  });

  it("returns open gaps as schema-valid gap records", () => {
    const openGaps = getOpenGaps();

    expect(openGaps).toEqual(ALL_GAPS.filter((gap) => gap.status === "Open"));
    expect(openGaps.every((gap) => GapSchema.safeParse(gap).success)).toBe(true);
  });
});
