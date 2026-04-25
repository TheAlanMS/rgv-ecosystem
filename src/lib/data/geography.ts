import type { County } from "@/lib/types";

export interface CountyInfo {
  id: County;
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
