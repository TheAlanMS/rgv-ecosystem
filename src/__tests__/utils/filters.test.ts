import { describe, expect, it } from "vitest";
import type { Actor } from "@/lib/types";
import {
  DEFAULT_FILTERS,
  filterActors,
  getActiveFilterCount,
  isFilterActive,
  sortActors,
  type FilterState,
} from "@/lib/utils/filters";

const actors: Actor[] = [
  {
    id: "a",
    name: "Beta Builder",
    slug: "beta-builder",
    orgType: "Incubator",
    pillars: [7],
    city: "McAllen",
    county: "Hidalgo",
    description: "Builder support",
    whatTheyOffer: ["Mentorship"],
    whoTheyServe: ["Founders"],
    status: "Active",
    stagesServed: ["Idea"],
    websiteUrl: "https://example.com/beta",
    coordinates: { lat: 26.2, lng: -98.2 },
    coordinateSource: "city-center",
    dateAdded: "2026-01-02",
    lastVerified: "2026-01-02",
    verifiedBy: "Test",
    communitySubmitted: false,
  },
  {
    id: "b",
    name: "Alpha Capital",
    slug: "alpha-capital",
    orgType: "Funder",
    pillars: [3],
    city: "Brownsville",
    county: "Cameron",
    description: "Capital support",
    whatTheyOffer: ["Funding"],
    whoTheyServe: ["Startups"],
    status: "Emerging",
    stagesServed: ["Seed"],
    websiteUrl: "https://example.com/alpha",
    coordinates: { lat: 25.9, lng: -97.5 },
    coordinateSource: "city-center",
    dateAdded: "2026-01-01",
    lastVerified: "2026-01-01",
    verifiedBy: "Test",
    communitySubmitted: false,
  },
];

function withFilters(filters: Partial<FilterState>): FilterState {
  return { ...DEFAULT_FILTERS, ...filters };
}

describe("filter utilities", () => {
  it("returns all actors when filters are empty", () => {
    expect(filterActors(actors, DEFAULT_FILTERS)).toEqual(actors);
  });

  it("applies single filters and AND logic", () => {
    expect(filterActors(actors, withFilters({ county: ["Hidalgo"] }))).toEqual([
      actors[0],
    ]);
    expect(
      filterActors(
        actors,
        withFilters({ county: ["Hidalgo"], stage: ["Seed"] }),
      ),
    ).toEqual([]);
  });

  it("filters by pillar group and reports active filters", () => {
    const filters = withFilters({ pillarGroup: ["engine"], status: ["Active"] });

    expect(filterActors(actors, filters)).toEqual([actors[0]]);
    expect(getActiveFilterCount(filters)).toBe(2);
    expect(isFilterActive(filters)).toBe(true);
    expect(isFilterActive(DEFAULT_FILTERS)).toBe(false);
  });

  it("sorts actors by supported fields without mutating input", () => {
    expect(sortActors(actors, { field: "name", direction: "asc" })).toEqual([
      actors[1],
      actors[0],
    ]);
    expect(sortActors(actors, { field: "recentlyAdded", direction: "desc" })).toEqual([
      actors[0],
      actors[1],
    ]);
    expect(actors[0]?.name).toBe("Beta Builder");
  });
});
