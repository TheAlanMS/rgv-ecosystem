import { ALL_GAPS } from "@/lib/data";
import type { County, Gap } from "@/lib/types";

export function getAllGaps(): readonly Gap[] {
  return ALL_GAPS;
}

export function getGapsByPillar(pillarId: number): Gap[] {
  return ALL_GAPS.filter((g) => g.pillar === pillarId);
}

export function getGapsByCounty(county: County): Gap[] {
  return ALL_GAPS.filter((g) => g.county === county);
}

export function getOpenGaps(): Gap[] {
  return ALL_GAPS.filter((g) => g.status === "Open");
}
