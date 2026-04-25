"use client";

import { ActorCard } from "@/components/actors/ActorCard";
import { FilterBar } from "@/components/filters/FilterBar";
import { SortControl } from "@/components/filters/SortControl";
import { useFilters } from "@/hooks/useFilters";
import { filterActors, sortActors } from "@/lib/utils/filters";
import type { Actor } from "@/lib/types";
import type { FilterState } from "@/lib/utils/filters";

interface ActorDirectoryProps {
  actors: readonly Actor[];
  lockedFilters?: Partial<FilterState>;
  lockedFilterLabels?: string[];
}

export function ActorDirectory({
  actors,
  lockedFilters,
  lockedFilterLabels = [],
}: ActorDirectoryProps) {
  const {
    filters,
    sortConfig,
    activeFilterCount,
    setFilter,
    clearAll,
    setSort,
  } = useFilters({ lockedFilters });

  const filteredActors = sortActors(filterActors(actors, filters), sortConfig);
  const lockedDimensions = Object.keys(lockedFilters ?? {}) as Array<keyof FilterState>;

  return (
    <div className="space-y-3">
      {lockedFilterLabels.length > 0 ? (
        <div className="rounded-lg border border-border-default bg-surface2 px-3 py-2 text-xs text-text-muted">
          Scoped to {lockedFilterLabels.join(", ")}.
        </div>
      ) : null}

      <FilterBar
        filters={filters}
        activeFilterCount={activeFilterCount}
        lockedDimensions={lockedDimensions}
        onFilterChange={setFilter}
        onClearAll={clearAll}
      />

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-text-muted">
          Showing {filteredActors.length} of {actors.length} actors
        </p>
        <SortControl
          sortField={sortConfig.field}
          sortDirection={sortConfig.direction}
          onSortChange={setSort}
        />
      </div>

      {filteredActors.length > 0 ? (
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {filteredActors.map((actor) => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border2 bg-surface p-6 text-center">
          <h2 className="font-heading text-base font-semibold text-text-primary">
            No actors match your current filters
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Clear filters or broaden your selections to see more ecosystem actors.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-4 min-h-11 rounded-lg border border-border2 px-4 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface2 hover:text-text-primary"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
