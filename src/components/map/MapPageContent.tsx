"use client";

import { ActorCard } from "@/components/actors/ActorCard";
import { FilterBar } from "@/components/filters/FilterBar";
import { SortControl } from "@/components/filters/SortControl";
import { GapCard } from "@/components/ui/GapCard";
import { useFilters } from "@/hooks/useFilters";
import type { Actor, Gap } from "@/lib/types";
import { filterActors, sortActors } from "@/lib/utils/filters";
import { EcosystemMap } from "./EcosystemMap";
import { MapToggle } from "./MapToggle";
import type { MapViewMode } from "./MapToggle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface MapPageContentProps {
  actors: readonly Actor[];
  gaps: readonly Gap[];
}

export function MapPageContent({ actors, gaps }: MapPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") === "map" ? "map" : "list";
  const {
    filters,
    sortConfig,
    activeFilterCount,
    setFilter,
    clearAll,
    setSort,
  } = useFilters();

  const filteredActors = sortActors(filterActors(actors, filters), sortConfig);
  const visibleGaps = gaps.filter(
    (gap) =>
      (filters.county.length === 0 || filters.county.includes(gap.county)) &&
      (filters.pillar.length === 0 || filters.pillar.includes(gap.pillar)),
  );

  function setView(nextView: MapViewMode) {
    const params = new URLSearchParams(searchParams);
    if (nextView === "map") {
      params.set("view", "map");
    } else {
      params.delete("view");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="space-y-3">
      <FilterBar
        filters={filters}
        activeFilterCount={activeFilterCount}
        onFilterChange={setFilter}
        onClearAll={clearAll}
      />

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-text-muted">
          Showing {filteredActors.length} of {actors.length} actors
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <SortControl
            sortField={sortConfig.field}
            sortDirection={sortConfig.direction}
            onSortChange={setSort}
          />
          <MapToggle value={view} onChange={setView} />
        </div>
      </div>

      {view === "map" ? (
        <EcosystemMap actors={filteredActors} />
      ) : (
        <ActorList actors={filteredActors} onClearAll={clearAll} />
      )}

      {visibleGaps.length > 0 ? (
        <section className="space-y-2 pt-2" aria-labelledby="map-gap-heading">
          <h2
            id="map-gap-heading"
            className="font-heading text-base font-semibold text-text-primary"
          >
            Visible ecosystem gaps
          </h2>
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {visibleGaps.map((gap) => (
              <GapCard key={gap.id}>
                <p className="text-sm text-text-secondary">{gap.description}</p>
                <p className="mt-2 text-xs text-text-muted">
                  {gap.county} County · Pillar {gap.pillar}
                </p>
              </GapCard>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function ActorList({
  actors,
  onClearAll,
}: {
  actors: readonly Actor[];
  onClearAll: () => void;
}) {
  if (actors.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border2 bg-surface p-6 text-center">
        <h2 className="font-heading text-base font-semibold text-text-primary">
          No actors match your current filters
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Clear filters or broaden your selections to see more ecosystem actors.
        </p>
        <button
          type="button"
          onClick={onClearAll}
          className="mt-4 min-h-10 rounded-lg border border-border2 px-4 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface2 hover:text-text-primary"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
      {actors.map((actor) => (
        <ActorCard key={actor.id} actor={actor} />
      ))}
    </div>
  );
}
