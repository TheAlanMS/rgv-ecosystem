import type { Actor, County, Gap } from "@/lib/types";

export type RgvCounty = Exclude<County, "OutsideRGV">;

export interface CountyInfo {
  id: RgvCounty;
  name: string;
  cities: readonly string[];
}

export const COUNTY_DATA: readonly CountyInfo[] = [
  {
    id: "Cameron",
    name: "Cameron County",
    cities: [
      "Brownsville",
      "Harlingen",
      "San Benito",
      "Los Fresnos",
      "Boca Chica",
      "South Padre Island",
    ],
  },
  {
    id: "Hidalgo",
    name: "Hidalgo County",
    cities: [
      "McAllen",
      "Edinburg",
      "Mission",
      "Pharr",
      "Weslaco",
      "Donna",
      "Alamo",
      "Mercedes",
    ],
  },
  {
    id: "Starr",
    name: "Starr County",
    cities: ["Rio Grande City", "Roma"],
  },
  {
    id: "Willacy",
    name: "Willacy County",
    cities: ["Raymondville", "Lyford"],
  },
];

const RGV_COUNTIES = new Set<County>(["Cameron", "Hidalgo", "Starr", "Willacy"]);

export interface CountyMapContext {
  county: RgvCounty;
  actorCount: number;
  gapCount: number;
  openGapCount: number;
}

export interface GeographicMapContext {
  rgvActors: Actor[];
  outsideRegionActors: Actor[];
  counties: CountyMapContext[];
}

export function getGeographicMapContext(
  actors: readonly Actor[],
  gaps: readonly Gap[],
): GeographicMapContext {
  const rgvActors = actors.filter(isRgvMappableActor);
  const outsideRegionActors = actors.filter(isOutsideRegionPartner);

  return {
    rgvActors,
    outsideRegionActors,
    counties: COUNTY_DATA.map((county) => {
      const countyGaps = gaps.filter((gap) => gap.county === county.id);

      return {
        county: county.id,
        actorCount: actors.filter((actor) => actor.county === county.id).length,
        gapCount: countyGaps.length,
        openGapCount: countyGaps.filter((gap) => gap.status === "Open").length,
      };
    }),
  };
}

export function isRgvMappableActor(actor: Actor): boolean {
  return RGV_COUNTIES.has(actor.county) && Boolean(actor.coordinates);
}

export function isOutsideRegionPartner(actor: Actor): boolean {
  return actor.county === "OutsideRGV";
}
