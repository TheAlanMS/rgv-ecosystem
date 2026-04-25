"use client";

import { ActorCard } from "@/components/actors/ActorCard";
import { FilterBar } from "@/components/filters/FilterBar";
import { SortControl } from "@/components/filters/SortControl";
import { PillarAccordion } from "@/components/pillars/PillarAccordion";
import { GapCard } from "@/components/ui/GapCard";
import { useFilters } from "@/hooks/useFilters";
import type { Actor, Gap, Pillar } from "@/lib/types";
import { filterActors, sortActors } from "@/lib/utils/filters";
import { EcosystemMap } from "./EcosystemMap";
import { MapToggle } from "./MapToggle";
import type { MapViewMode } from "./MapToggle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface MapPageContentProps {
  actors: readonly Actor[];
  gaps: readonly Gap[];
  pillars: readonly Pillar[];
}

export function MapPageContent({ actors, gaps, pillars }: MapPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = getMapViewMode(searchParams.get("view"));
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
    if (nextView === "list") {
      params.delete("view");
    } else {
      params.set("view", nextView);
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
        <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-2 md:flex md:flex-wrap md:items-center">
          <SortControl
            sortField={sortConfig.field}
            sortDirection={sortConfig.direction}
            onSortChange={setSort}
          />
          <MapToggle value={view} onChange={setView} />
        </div>
      </div>

      <MapView
        view={view}
        actors={filteredActors}
        gaps={visibleGaps}
        pillars={pillars}
        onClearAll={clearAll}
      />

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

function getMapViewMode(value: string | null): MapViewMode {
  if (value === "map" || value === "pillar") return value;
  return "list";
}

function MapView({
  view,
  actors,
  gaps,
  pillars,
  onClearAll,
}: {
  view: MapViewMode;
  actors: readonly Actor[];
  gaps: readonly Gap[];
  pillars: readonly Pillar[];
  onClearAll: () => void;
}) {
  if (view === "map") {
    return <EcosystemMap actors={actors} gaps={gaps} />;
  }

  if (view === "pillar") {
    return <PillarAccordion pillars={pillars} actors={actors} />;
  }

  return <ActorList actors={actors} onClearAll={onClearAll} />;
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
          className="mt-4 min-h-11 rounded-lg border border-border2 px-4 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface2 hover:text-text-primary"
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
