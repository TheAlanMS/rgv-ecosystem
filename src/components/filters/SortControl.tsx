"use client";

import type { SortDirection, SortField } from "@/hooks/useFilters";

interface SortControlProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField, direction: SortDirection) => void;
}

const SORT_OPTIONS: Array<{ value: SortField; label: string }> = [
  { value: "name", label: "Name" },
  { value: "status", label: "Status" },
  { value: "county", label: "County" },
  { value: "recentlyAdded", label: "Recently Added" },
  { value: "pillar", label: "Pillar" },
];

export function SortControl({
  sortField,
  sortDirection,
  onSortChange,
}: SortControlProps) {
  const nextDirection = sortDirection === "asc" ? "desc" : "asc";

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border-default bg-surface/90 p-3">
      <label
        htmlFor="actor-sort"
        className="text-[11px] font-semibold uppercase tracking-wide text-text-muted"
      >
        Sort
      </label>
      <select
        id="actor-sort"
        value={sortField}
        onChange={(event) =>
          onSortChange(event.target.value as SortField, sortDirection)
        }
        className="min-h-10 rounded-lg border border-border-default bg-surface2 px-3 text-xs text-text-primary outline-none focus:border-accent"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => onSortChange(sortField, nextDirection)}
        className="min-h-10 rounded-lg border border-border2 px-3 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface2 hover:text-text-primary"
        aria-label={`Switch to ${nextDirection}ending sort`}
      >
        {sortDirection === "asc" ? "Asc ↑" : "Desc ↓"}
      </button>
    </div>
  );
}
