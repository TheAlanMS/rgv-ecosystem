import { describe, expect, it } from "vitest";
import { ALL_ACTORS, ALL_PILLARS } from "@/lib/data";
import type { Actor } from "@/lib/types";
import { searchActors, searchPillars } from "@/lib/utils/search";

const searchFixtures: Actor[] = [
  {
    id: "capital-name",
    name: "Capital Studio",
    slug: "capital-studio",
    orgType: "Funder",
    pillars: [3],
    city: "McAllen",
    county: "Hidalgo",
    description: "Funding support",
    whatTheyOffer: ["Checks"],
    whoTheyServe: ["Founders"],
    status: "Active",
    stagesServed: ["Seed"],
    websiteUrl: "https://example.com/capital",
    coordinates: { lat: 26.2, lng: -98.2 },
    coordinateSource: "city-center",
    dateAdded: "2026-01-01",
    lastVerified: "2026-01-01",
    verifiedBy: "Test",
    communitySubmitted: false,
  },
  {
    id: "capital-description",
    name: "Founder Support Lab",
    slug: "founder-support-lab",
    orgType: "Incubator",
    pillars: [7],
    city: "Brownsville",
    county: "Cameron",
    description: "Capital readiness program",
    whatTheyOffer: ["Mentorship"],
    whoTheyServe: ["Founders"],
    status: "Active",
    stagesServed: ["Idea"],
    websiteUrl: "https://example.com/support",
    coordinates: { lat: 25.9, lng: -97.5 },
    coordinateSource: "city-center",
    dateAdded: "2026-01-02",
    lastVerified: "2026-01-02",
    verifiedBy: "Test",
    communitySubmitted: false,
  },
];

describe("search utilities", () => {
  it("returns all records for an empty query", () => {
    expect(searchActors("  ", ALL_ACTORS)).toEqual(ALL_ACTORS);
    expect(searchPillars("", ALL_PILLARS)).toEqual(ALL_PILLARS);
  });

  it("searches actors case-insensitively and ranks stronger matches first", () => {
    const results = searchActors("capital", searchFixtures);

    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.name.toLocaleLowerCase()).toContain("capital");
  });

  it("returns no matches and tolerates special characters", () => {
    expect(searchActors("zzzzzz-not-real", ALL_ACTORS)).toEqual([]);
    expect(() => searchActors("capital &&&", ALL_ACTORS)).not.toThrow();
  });

  it("searches pillars by name and metadata", () => {
    expect(searchPillars("governance", ALL_PILLARS)[0]?.slug).toBe(
      "governance-accountability",
    );
  });
});
