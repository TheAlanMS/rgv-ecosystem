"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CountySchema,
  OrgTypeSchema,
  PillarGroupSchema,
  StageSchema,
  StatusSchema,
} from "@/lib/types";
import type { County, OrgType, PillarGroup, Stage, Status } from "@/lib/types";
import {
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  getActiveFilterCount,
  isFilterActive,
} from "@/lib/utils/filters";
import type {
  FilterDimension,
  FilterState,
  FilterValues,
  SortConfig,
  SortDirection,
  SortField,
} from "@/lib/utils/filters";

interface UseFiltersOptions {
  lockedFilters?: Partial<FilterState>;
}

export function useFilters(options: UseFiltersOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lockedFilters = useMemo(
    () => options.lockedFilters ?? {},
    [options.lockedFilters],
  );
  const filters = useMemo(
    () => applyLockedFilters(parseFilters(searchParams), lockedFilters),
    [lockedFilters, searchParams],
  );
  const sortConfig = useMemo(
    () => parseSort(searchParams),
    [searchParams],
  );

  const commitState = useCallback(
    (nextFilters: FilterState, nextSort: SortConfig) => {
      const params = createParams(nextFilters, nextSort, lockedFilters);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [lockedFilters, pathname, router],
  );

  const setFilter = useCallback(
    <D extends FilterDimension>(dimension: D, values: FilterValues<D>) => {
      const nextFilters = applyLockedFilters(
        { ...filters, [dimension]: values },
        lockedFilters,
      );
      commitState(nextFilters, sortConfig);
    },
    [commitState, filters, lockedFilters, sortConfig],
  );

  const clearFilter = useCallback(
    (dimension: FilterDimension) => {
      const nextFilters = applyLockedFilters(
        { ...filters, [dimension]: [] },
        lockedFilters,
      );
      commitState(nextFilters, sortConfig);
    },
    [commitState, filters, lockedFilters, sortConfig],
  );

  const clearAll = useCallback(() => {
    const nextFilters = applyLockedFilters(DEFAULT_FILTERS, lockedFilters);
    commitState(nextFilters, DEFAULT_SORT);
  }, [commitState, lockedFilters]);

  const setSort = useCallback(
    (field: SortField, direction: SortDirection) => {
      const nextSort = { field, direction };
      commitState(filters, nextSort);
    },
    [commitState, filters],
  );

  return useMemo(
    () => ({
      filters,
      sortConfig,
      activeFilterCount: getActiveFilterCount(filters),
      hasActiveFilters: isFilterActive(filters),
      setFilter,
      clearFilter,
      clearAll,
      setSort,
    }),
    [clearAll, clearFilter, filters, setFilter, setSort, sortConfig],
  );
}

function applyLockedFilters(
  filters: FilterState,
  lockedFilters: Partial<FilterState>,
): FilterState {
  return {
    ...filters,
    ...lockedFilters,
  };
}

function parseFilters(searchParams: URLSearchParams): FilterState {
  return {
    pillar: parseNumberList(searchParams.get("pillar")).filter(
      (pillarId) => pillarId >= 1 && pillarId <= 10,
    ),
    county: parseEnumList(searchParams.get("county"), CountySchema.options),
    status: parseEnumList(searchParams.get("status"), StatusSchema.options),
    orgType: parseEnumList(searchParams.get("orgType"), OrgTypeSchema.options),
    stage: parseEnumList(searchParams.get("stage"), StageSchema.options),
    pillarGroup: parseEnumList(
      searchParams.get("pillarGroup"),
      PillarGroupSchema.options,
    ),
  };
}

function parseSort(searchParams: URLSearchParams): SortConfig {
  const field = searchParams.get("sort");
  const direction = searchParams.get("dir");

  return {
    field: isSortField(field) ? field : DEFAULT_SORT.field,
    direction: direction === "desc" ? "desc" : "asc",
  };
}

function createParams(
  filters: FilterState,
  sortConfig: SortConfig,
  lockedFilters: Partial<FilterState>,
): URLSearchParams {
  const params = new URLSearchParams();
  const visibleFilters = removeLockedFilters(filters, lockedFilters);

  appendList(params, "pillar", visibleFilters.pillar.map(String));
  appendList(params, "county", visibleFilters.county);
  appendList(params, "status", visibleFilters.status);
  appendList(params, "orgType", visibleFilters.orgType);
  appendList(params, "stage", visibleFilters.stage);
  appendList(params, "pillarGroup", visibleFilters.pillarGroup);

  if (sortConfig.field !== DEFAULT_SORT.field) {
    params.set("sort", sortConfig.field);
  }
  if (sortConfig.direction !== DEFAULT_SORT.direction) {
    params.set("dir", sortConfig.direction);
  }

  return params;
}

function removeLockedFilters(
  filters: FilterState,
  lockedFilters: Partial<FilterState>,
): FilterState {
  return {
    pillar: lockedFilters.pillar ? [] : filters.pillar,
    county: lockedFilters.county ? [] : filters.county,
    status: lockedFilters.status ? [] : filters.status,
    orgType: lockedFilters.orgType ? [] : filters.orgType,
    stage: lockedFilters.stage ? [] : filters.stage,
    pillarGroup: lockedFilters.pillarGroup ? [] : filters.pillarGroup,
  };
}

function parseNumberList(value: string | null): number[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => Number(item))
    .filter((item) => Number.isInteger(item));
}

function parseEnumList<T extends string>(
  value: string | null,
  allowedValues: readonly T[],
): T[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .filter((item): item is T => allowedValues.includes(item as T));
}

function appendList(params: URLSearchParams, key: string, values: string[]) {
  if (values.length > 0) {
    params.set(key, values.join(","));
  }
}

function isSortField(value: string | null): value is SortField {
  return (
    value === "name" ||
    value === "status" ||
    value === "county" ||
    value === "recentlyAdded" ||
    value === "pillar"
  );
}

export type {
  County,
  FilterDimension,
  FilterState,
  FilterValues,
  OrgType,
  PillarGroup,
  SortConfig,
  SortDirection,
  SortField,
  Stage,
  Status,
};
