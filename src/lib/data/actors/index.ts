import type { Actor } from "@/lib/types";

import { PILLAR_01_ACTORS } from "./pillar-01-innovation-customers";
import { PILLAR_02_ACTORS } from "./pillar-02-talent-pool";
import { PILLAR_03_ACTORS } from "./pillar-03-capital-providers";
import { PILLAR_04_ACTORS } from "./pillar-04-education-pipelines";
import { PILLAR_05_ACTORS } from "./pillar-05-professional-services";
import { PILLAR_06_ACTORS } from "./pillar-06-communities-peer-groups";
import { PILLAR_07_ACTORS } from "./pillar-07-incubators-accelerators";
import { PILLAR_08_ACTORS } from "./pillar-08-advocacy-policy";
import { PILLAR_09_ACTORS } from "./pillar-09-shared-platform";
import { PILLAR_10_ACTORS } from "./pillar-10-governance-accountability";

// Re-export per-pillar arrays
export {
  PILLAR_01_ACTORS,
  PILLAR_02_ACTORS,
  PILLAR_03_ACTORS,
  PILLAR_04_ACTORS,
  PILLAR_05_ACTORS,
  PILLAR_06_ACTORS,
  PILLAR_07_ACTORS,
  PILLAR_08_ACTORS,
  PILLAR_09_ACTORS,
  PILLAR_10_ACTORS,
};

// Merge all pillar arrays and deduplicate by id
const allPillarArrays: Actor[][] = [
  PILLAR_01_ACTORS,
  PILLAR_02_ACTORS,
  PILLAR_03_ACTORS,
  PILLAR_04_ACTORS,
  PILLAR_05_ACTORS,
  PILLAR_06_ACTORS,
  PILLAR_07_ACTORS,
  PILLAR_08_ACTORS,
  PILLAR_09_ACTORS,
  PILLAR_10_ACTORS,
];

const seen = new Set<string>();
export const ALL_ACTORS: Actor[] = allPillarArrays.flat().filter((actor) => {
  if (seen.has(actor.id)) return false;
  seen.add(actor.id);
  return true;
});
