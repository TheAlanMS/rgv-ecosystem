import { ALL_ACTORS } from "@/lib/data";
import type { Actor, County, Status } from "@/lib/types";

export function getAllActors(): readonly Actor[] {
  return ALL_ACTORS;
}

export function getActorBySlug(slug: string): Actor | undefined {
  return ALL_ACTORS.find((a) => a.slug === slug);
}

export function getActorsByPillar(pillarId: number): Actor[] {
  return ALL_ACTORS.filter((a) => a.pillars.includes(pillarId));
}

export function getActorsByCounty(county: County): Actor[] {
  return ALL_ACTORS.filter((a) => a.county === county);
}

export function getActorsByStatus(status: Status): Actor[] {
  return ALL_ACTORS.filter((a) => a.status === status);
}

export function getGapActors(): Actor[] {
  return ALL_ACTORS.filter((a) => a.status === "Gap");
}

export function getActorCount(): number {
  return ALL_ACTORS.length;
}

export function getActiveActorCount(): number {
  return ALL_ACTORS.filter((a) => a.status === "Active").length;
}
