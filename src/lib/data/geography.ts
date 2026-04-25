import type { Actor, County, Gap } from "@/lib/types";

export type RgvCounty = Exclude<County, "OutsideRGV">;

export interface CountyInfo {
  id: RgvCounty;
  name: string;
  cities: readonly string[];
  centroid: {
    lat: number;
    lng: number;
  };
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
    centroid: { lat: 26.129, lng: -97.484 },
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
    centroid: { lat: 26.397, lng: -98.18 },
  },
  {
    id: "Starr",
    name: "Starr County",
    cities: ["Rio Grande City", "Roma"],
    centroid: { lat: 26.562, lng: -98.747 },
  },
  {
    id: "Willacy",
    name: "Willacy County",
    cities: ["Raymondville", "Lyford"],
    centroid: { lat: 26.481, lng: -97.592 },
  },
];

const RGV_COUNTIES = new Set<County>(["Cameron", "Hidalgo", "Starr", "Willacy"]);

export interface CountyMapContext {
  county: RgvCounty;
  countyName: string;
  centroid: {
    lat: number;
    lng: number;
  };
  actorCount: number;
  gapCount: number;
  openGapCount: number;
  openGaps: Gap[];
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
      const openGaps = countyGaps.filter((gap) => gap.status === "Open");

      return {
        county: county.id,
        countyName: county.name,
        centroid: county.centroid,
        actorCount: actors.filter((actor) => actor.county === county.id).length,
        gapCount: countyGaps.length,
        openGapCount: openGaps.length,
        openGaps,
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
