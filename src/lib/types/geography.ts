import type { County } from "./enums";

/** City-to-county mapping for RGV region */
export const CITY_COUNTY_MAP: Record<string, County> = {
  // Cameron County
  "Brownsville": "Cameron",
  "Harlingen": "Cameron",
  "San Benito": "Cameron",
  "Los Fresnos": "Cameron",
  "Boca Chica": "Cameron",
  "South Padre Island": "Cameron",

  // Hidalgo County
  "McAllen": "Hidalgo",
  "Edinburg": "Hidalgo",
  "Mission": "Hidalgo",
  "Pharr": "Hidalgo",
  "Weslaco": "Hidalgo",
  "Donna": "Hidalgo",
  "Alamo": "Hidalgo",
  "Mercedes": "Hidalgo",

  // Starr County
  "Rio Grande City": "Starr",
  "Roma": "Starr",

  // Willacy County
  "Raymondville": "Willacy",
  "Lyford": "Willacy",
};

/** All cities grouped by county */
export const CITIES_BY_COUNTY: Record<County, readonly string[]> = {
  Cameron: [
    "Brownsville",
    "Harlingen",
    "San Benito",
    "Los Fresnos",
    "Boca Chica",
    "South Padre Island",
  ],
  Hidalgo: [
    "McAllen",
    "Edinburg",
    "Mission",
    "Pharr",
    "Weslaco",
    "Donna",
    "Alamo",
    "Mercedes",
  ],
  Starr: ["Rio Grande City", "Roma"],
  Willacy: ["Raymondville", "Lyford"],
  OutsideRGV: [],
};
