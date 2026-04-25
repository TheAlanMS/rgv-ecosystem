import { ALL_PILLARS } from "@/lib/data";
import type { Pillar, PillarGroup } from "@/lib/types";

export function getAllPillars(): readonly Pillar[] {
  return ALL_PILLARS;
}

export function getPillarBySlug(slug: string): Pillar | undefined {
  return ALL_PILLARS.find((p) => p.slug === slug);
}

export function getPillarById(id: number): Pillar | undefined {
  return ALL_PILLARS.find((p) => p.id === id);
}

export function getPillarsByGroup(group: PillarGroup): Pillar[] {
  return ALL_PILLARS.filter((p) => p.group === group);
}
