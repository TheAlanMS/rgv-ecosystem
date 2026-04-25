import { describe, expect, it } from "vitest";
import { ALL_ACTORS, COUNTY_DATA } from "@/lib/data";
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
});
