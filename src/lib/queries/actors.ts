import { ALL_ACTORS } from "@/lib/data";
import type { Actor, County, Status } from "@/lib/types";

function isPublicActor(actor: Actor): boolean {
  return actor.publicVisibility !== "internal";
}

const PUBLIC_ACTORS = ALL_ACTORS.filter(isPublicActor);

export function getAllActors(): readonly Actor[] {
  return PUBLIC_ACTORS;
}

export function getActorBySlug(slug: string): Actor | undefined {
  return PUBLIC_ACTORS.find((a) => a.slug === slug);
}

export function getActorsByPillar(pillarId: number): Actor[] {
  return PUBLIC_ACTORS.filter((a) => a.pillars.includes(pillarId));
}

export function getActorsByCounty(county: County): Actor[] {
  return PUBLIC_ACTORS.filter((a) => a.county === county);
}

export function getActorsByStatus(status: Status): Actor[] {
  return PUBLIC_ACTORS.filter((a) => a.status === status);
}

export function getGapActors(): Actor[] {
  return PUBLIC_ACTORS.filter((a) => a.status === "Gap");
}

export function getActorCount(): number {
  return PUBLIC_ACTORS.length;
}

export function getActiveActorCount(): number {
  return PUBLIC_ACTORS.filter((a) => a.status === "Active").length;
}
