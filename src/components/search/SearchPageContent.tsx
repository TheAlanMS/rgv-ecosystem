"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterBar } from "@/components/filters/FilterBar";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchResults } from "@/components/search/SearchResults";
import { useFilters } from "@/hooks/useFilters";
import { filterActors, sortActors } from "@/lib/utils/filters";
import { searchActors, searchPillars } from "@/lib/utils/search";
import type { Actor, Pillar } from "@/lib/types";

interface SearchPageContentProps {
  actors: readonly Actor[];
  pillars: readonly Pillar[];
}

export function SearchPageContent({ actors, pillars }: SearchPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const {
    filters,
    sortConfig,
    activeFilterCount,
    setFilter,
    clearAll,
  } = useFilters();

  const setQuery = useCallback(
    (nextQuery: string) => {
      const params = new URLSearchParams(searchParams);
      const trimmedQuery = nextQuery.trim();

      if (trimmedQuery) {
        params.set("q", trimmedQuery);
      } else {
        params.delete("q");
      }

      const next = params.toString();
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const filteredActors = filterActors(actors, filters);
  const actorResults = sortActors(searchActors(query, filteredActors), sortConfig);
  const pillarResults = searchPillars(query, pillars);

  return (
    <div className="space-y-4">
      <SearchInput
        key={query}
        value={query}
        onChange={setQuery}
        placeholder="Search actors, pillars, counties, or support needs"
      />
      <FilterBar
        filters={filters}
        activeFilterCount={activeFilterCount}
        onFilterChange={setFilter}
        onClearAll={clearAll}
      />
      <SearchResults
        query={query}
        actors={actorResults}
        pillars={pillarResults}
        totalActorCount={actors.length}
      />
    </div>
  );
}
