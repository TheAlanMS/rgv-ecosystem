"use client";

import { ALL_PILLARS } from "@/lib/data/pillars";
import {
  COUNTY_LABELS,
  PILLAR_GROUP_LABELS,
  STAGE_LABELS,
  STATUS_LABELS,
} from "@/lib/types";
import {
  CountySchema,
  OrgTypeSchema,
  PillarGroupSchema,
  StageSchema,
  StatusSchema,
} from "@/lib/types";
import type {
  County,
  FilterDimension,
  FilterState,
  FilterValues,
  OrgType,
  PillarGroup,
  Stage,
  Status,
} from "@/hooks/useFilters";

interface FilterBarProps {
  filters: FilterState;
  activeFilterCount: number;
  lockedDimensions?: FilterDimension[];
  onFilterChange: <D extends FilterDimension>(
    dimension: D,
    values: FilterValues<D>,
  ) => void;
  onClearAll: () => void;
}

type Option<T extends string | number> = {
  value: T;
  label: string;
};
type FilterOptionValue = string | number;

const COUNTY_OPTIONS: Option<County>[] = CountySchema.options.map((county) => ({
  value: county,
  label: COUNTY_LABELS[county],
}));

const STATUS_OPTIONS: Option<Status>[] = StatusSchema.options.map((status) => ({
  value: status,
  label: STATUS_LABELS[status],
}));

const ORG_TYPE_OPTIONS: Option<OrgType>[] = OrgTypeSchema.options.map((orgType) => ({
  value: orgType,
  label: orgType,
}));

const STAGE_OPTIONS: Option<Stage>[] = StageSchema.options.map((stage) => ({
  value: stage,
  label: STAGE_LABELS[stage],
}));

const PILLAR_GROUP_OPTIONS: Option<PillarGroup>[] = PillarGroupSchema.options.map(
  (group) => ({
    value: group,
    label: PILLAR_GROUP_LABELS[group],
  }),
);

const PILLAR_OPTIONS: Option<number>[] = ALL_PILLARS.map((pillar) => ({
  value: pillar.id,
  label: `${pillar.id}. ${pillar.name}`,
}));

export function FilterBar({
  filters,
  activeFilterCount,
  lockedDimensions = [],
  onFilterChange,
  onClearAll,
}: FilterBarProps) {
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <section
      className="rounded-xl border border-border-default bg-surface/90 p-3"
      aria-label="Filter actors"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <FilterGroup
            label="Pillar"
            dimension="pillar"
            options={PILLAR_OPTIONS}
            values={filters.pillar}
            locked={lockedDimensions.includes("pillar")}
            onChange={onFilterChange}
          />
          <FilterGroup
            label="County"
            dimension="county"
            options={COUNTY_OPTIONS}
            values={filters.county}
            locked={lockedDimensions.includes("county")}
            onChange={onFilterChange}
          />
          <FilterGroup
            label="Status"
            dimension="status"
            options={STATUS_OPTIONS}
            values={filters.status}
            locked={lockedDimensions.includes("status")}
            onChange={onFilterChange}
          />
          <FilterGroup
            label="Org type"
            dimension="orgType"
            options={ORG_TYPE_OPTIONS}
            values={filters.orgType}
            locked={lockedDimensions.includes("orgType")}
            onChange={onFilterChange}
          />
          <FilterGroup
            label="Stage"
            dimension="stage"
            options={STAGE_OPTIONS}
            values={filters.stage}
            locked={lockedDimensions.includes("stage")}
            onChange={onFilterChange}
          />
          <FilterGroup
            label="Pillar group"
            dimension="pillarGroup"
            options={PILLAR_GROUP_OPTIONS}
            values={filters.pillarGroup}
            locked={lockedDimensions.includes("pillarGroup")}
            onChange={onFilterChange}
          />
        </div>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onClearAll}
            className="min-h-11 shrink-0 rounded-lg border border-border2 px-3 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface2 hover:text-text-primary"
          >
            Clear all ({activeFilterCount})
          </button>
        ) : null}
      </div>
    </section>
  );
}

interface FilterGroupProps<D extends FilterDimension> {
  label: string;
  dimension: D;
  options: Option<FilterOptionValue>[];
  values: FilterState[D];
  locked: boolean;
  onChange: <T extends FilterDimension>(
    dimension: T,
    values: FilterValues<T>,
  ) => void;
}

function FilterGroup<D extends FilterDimension>({
  label,
  dimension,
  options,
  values,
  locked,
  onChange,
}: FilterGroupProps<D>) {
  const count = values.length;
  const selectedValues = values as FilterOptionValue[];

  return (
    <details className="group min-w-0 rounded-lg border border-border-default bg-surface2">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-3 text-xs font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 truncate">{label}</span>
        <span className="flex items-center gap-1 text-text-muted">
          {count > 0 ? (
            <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] text-ink">
              {count}
            </span>
          ) : null}
          <span aria-hidden="true">v</span>
        </span>
      </summary>
      <div className="border-t border-border-default p-2">
        {locked ? (
          <p className="px-1 py-1 text-[11px] text-text-muted">
            Locked to this page context.
          </p>
        ) : null}
        <div className="max-h-64 overflow-y-auto">
          {options.map((option) => {
            const checked = selectedValues.includes(option.value);
            return (
              <label
                key={String(option.value)}
                className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-2 text-xs leading-snug text-text-secondary hover:bg-surface"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={locked}
                  onChange={() => {
                    const nextValues = checked
                      ? selectedValues.filter((value) => value !== option.value)
                      : [...selectedValues, option.value];
                    onChange(dimension, nextValues as FilterValues<D>);
                  }}
                  className="size-4 shrink-0 accent-accent"
                />
                <span className="min-w-0">{option.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </details>
  );
}
