import { ALL_PILLARS } from "@/lib/data/pillars";
import type {
  Actor,
  County,
  OrgType,
  PillarGroup,
  Stage,
  Status,
} from "@/lib/types";

export type FilterDimension =
  | "pillar"
  | "county"
  | "status"
  | "orgType"
  | "stage"
  | "pillarGroup";

export type SortField = "name" | "status" | "county" | "recentlyAdded" | "pillar";
export type SortDirection = "asc" | "desc";

export interface FilterState {
  pillar: number[];
  county: County[];
  status: Status[];
  orgType: OrgType[];
  stage: Stage[];
  pillarGroup: PillarGroup[];
}

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export type FilterValues<D extends FilterDimension> = FilterState[D];

export const DEFAULT_FILTERS: FilterState = {
  pillar: [],
  county: [],
  status: [],
  orgType: [],
  stage: [],
  pillarGroup: [],
};

export const DEFAULT_SORT: SortConfig = {
  field: "name",
  direction: "asc",
};

export function filterActors(
  actors: readonly Actor[],
  filters: FilterState,
): Actor[] {
  const pillarIdsFromGroups = new Set(
    ALL_PILLARS.filter((pillar) => filters.pillarGroup.includes(pillar.group)).map(
      (pillar) => pillar.id,
    ),
  );

  return actors.filter((actor) => {
    const matchesPillar =
      filters.pillar.length === 0 ||
      actor.pillars.some((pillarId) => filters.pillar.includes(pillarId));

    const matchesPillarGroup =
      filters.pillarGroup.length === 0 ||
      actor.pillars.some((pillarId) => pillarIdsFromGroups.has(pillarId));

    const matchesCounty =
      filters.county.length === 0 || filters.county.includes(actor.county);

    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(actor.status);

    const matchesOrgType =
      filters.orgType.length === 0 || filters.orgType.includes(actor.orgType);

    const matchesStage =
      filters.stage.length === 0 ||
      actor.stagesServed?.some((stage) => filters.stage.includes(stage)) === true;

    return (
      matchesPillar &&
      matchesPillarGroup &&
      matchesCounty &&
      matchesStatus &&
      matchesOrgType &&
      matchesStage
    );
  });
}

export function sortActors(
  actors: readonly Actor[],
  sortConfig: SortConfig,
): Actor[] {
  const directionMultiplier = sortConfig.direction === "asc" ? 1 : -1;

  return actors
    .map((actor, index) => ({ actor, index }))
    .sort((left, right) => {
      const comparison = compareActors(left.actor, right.actor, sortConfig.field);

      if (comparison !== 0) {
        return comparison * directionMultiplier;
      }

      return left.index - right.index;
    })
    .map(({ actor }) => actor);
}

export function getActiveFilterCount(filters: FilterState): number {
  return Object.values(filters).reduce((count, values) => count + values.length, 0);
}

export function isFilterActive(filters: FilterState): boolean {
  return getActiveFilterCount(filters) > 0;
}

function compareActors(left: Actor, right: Actor, field: SortField): number {
  switch (field) {
    case "name":
      return left.name.localeCompare(right.name);
    case "status":
      return left.status.localeCompare(right.status);
    case "county":
      return left.county.localeCompare(right.county);
    case "recentlyAdded":
      return left.dateAdded.localeCompare(right.dateAdded);
    case "pillar":
      return Math.min(...left.pillars) - Math.min(...right.pillars);
  }
}
