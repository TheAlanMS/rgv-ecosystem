import { describe, expect, it } from "vitest";
import {
  ALL_ACTORS,
  ALL_GAPS,
  COUNTY_DATA,
  getGeographicMapContext,
  isOutsideRegionPartner,
  isRgvMappableActor,
} from "@/lib/data";
import { CITIES_BY_COUNTY, CITY_COUNTY_MAP } from "@/lib/types";

describe("geography seed data", () => {
  it("keeps city-county maps in agreement", () => {
    for (const [county, cities] of Object.entries(CITIES_BY_COUNTY)) {
      for (const city of cities) {
        expect(CITY_COUNTY_MAP[city]).toBe(county);
      }
    }

    for (const county of COUNTY_DATA) {
      expect(CITIES_BY_COUNTY[county.id]).toEqual(county.cities);
    }
  });

  it("maps every RGV actor city to the actor county", () => {
    for (const actor of ALL_ACTORS) {
      if (actor.county === "OutsideRGV") {
        expect(CITY_COUNTY_MAP[actor.city]).toBeUndefined();
      } else {
        expect(CITY_COUNTY_MAP[actor.city]).toBe(actor.county);
      }
    }
  });

  it("separates RGV map markers from outside-region partners", () => {
    const context = getGeographicMapContext(ALL_ACTORS, ALL_GAPS);

    expect(context.rgvActors.length).toBeGreaterThan(0);
    expect(context.outsideRegionActors.length).toBeGreaterThan(0);
    expect(context.rgvActors.every(isRgvMappableActor)).toBe(true);
    expect(context.outsideRegionActors.every(isOutsideRegionPartner)).toBe(true);
    expect(
      context.rgvActors.some((actor) => actor.county === "OutsideRGV"),
    ).toBe(false);
    expect(
      context.outsideRegionActors.some(
        (actor) => actor.coordinateSource === "representative",
      ),
    ).toBe(true);
    expect(
      context.rgvActors.some((actor) =>
        context.outsideRegionActors.some((outsideActor) => outsideActor.id === actor.id),
      ),
    ).toBe(false);
    expect(
      ALL_ACTORS.some(
        (actor) =>
          actor.county === "OutsideRGV" &&
          Boolean(actor.coordinates) &&
          actor.coordinateSource === "representative",
      ),
    ).toBe(true);
  });

  it("keeps Starr and Willacy gap context visible in map county summaries", () => {
    const context = getGeographicMapContext(ALL_ACTORS, ALL_GAPS);

    for (const countyName of ["Starr", "Willacy"] as const) {
      const county = context.counties.find((item) => item.county === countyName);

      expect(county).toBeDefined();
      expect(county?.openGapCount).toBeGreaterThan(0);
      expect(county?.centroid.lat).toEqual(expect.any(Number));
      expect(county?.centroid.lng).toEqual(expect.any(Number));
      expect(county?.openGaps.length).toBe(county?.openGapCount);
      expect(
        county?.openGaps.every(
          (gap) => gap.county === countyName && gap.status === "Open",
        ),
      ).toBe(true);
    }
  });
});
