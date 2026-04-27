import type { Actor } from "@/lib/types";

const CITY_COORDINATES: Record<string, Actor["coordinates"]> = {
  Austin: { lat: 30.2672, lng: -97.7431 },
  Brownsville: { lat: 25.9017, lng: -97.4975 },
  Edinburg: { lat: 26.3017, lng: -98.1633 },
  Harlingen: { lat: 26.1906, lng: -97.6961 },
  McAllen: { lat: 26.2034, lng: -98.2300 },
  Alton: { lat: 26.2873, lng: -98.3134 },
  Pharr: { lat: 26.1948, lng: -98.1836 },
  "San Antonio": { lat: 29.4252, lng: -98.4946 },
  Washington: { lat: 38.9072, lng: -77.0369 },
  Weslaco: { lat: 26.1595, lng: -97.9908 },
};

export function withActorCoordinates<T extends Actor>(actors: readonly T[]): T[] {
  return actors.map((actor) => {
    if (actor.coordinates) {
      return actor;
    }

    const coordinates = CITY_COORDINATES[actor.city];

    if (!coordinates) {
      return actor;
    }

    return {
      ...actor,
      coordinates,
      coordinateSource:
        actor.county === "OutsideRGV" ? "representative" : "city-center",
    };
  });
}
