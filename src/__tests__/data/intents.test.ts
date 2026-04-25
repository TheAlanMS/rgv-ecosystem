import { describe, expect, it } from "vitest";
import { ALL_ACTORS, ALL_GAPS, ALL_JOURNEYS, ALL_PILLARS } from "@/lib/data";
import {
  ALL_INTENTS,
  getIntentsForRole,
  getIntentRoute,
  ROLE_INTENT_ROUTES,
  RoleIntentRouteSchema,
} from "@/lib/data/intents";
import type { IntentId, RoleId, RoleIntentRoute } from "@/lib/data/intents";
import { ALL_ROLES } from "@/lib/data/roles";
import {
  CountySchema,
  OrgTypeSchema,
  PillarGroupSchema,
  StageSchema,
  StatusSchema,
} from "@/lib/types";
import type {
  Actor,
  County,
  OrgType,
  PillarGroup,
  Stage,
  Status,
} from "@/lib/types";
import { DEFAULT_FILTERS, filterActors, filterGaps } from "@/lib/utils/filters";
import type { FilterState } from "@/lib/utils/filters";

describe("role intent routes", () => {
  it("exposes schema-valid routes for every configured role intent pair", () => {
    for (const role of ALL_ROLES) {
      expect(role.id in ROLE_INTENT_ROUTES).toBe(true);

      const roleId = role.id as RoleId;
      const configuredIntents = Object.keys(ROLE_INTENT_ROUTES[roleId]);

      expect(configuredIntents.length).toBeGreaterThan(0);

      for (const intent of ALL_INTENTS.filter((item) =>
        configuredIntents.includes(item.id),
      )) {
        const route = getIntentRoute(roleId, intent.id);

        expect(RoleIntentRouteSchema.safeParse(route).success).toBe(true);
        expect(route?.rationale.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("points every route at a known Phase 2 surface", () => {
    const journeyPaths = new Set(ALL_ROLES.map((role) => `/journeys/${role.id}`));

    for (const route of getAllRoutes()) {
      const url = new URL(route.href, "https://example.test");

      expect(url.pathname).toMatch(/^\/(map|ecosystem-health|journeys\/[a-z-]+)$/);

      if (url.pathname.startsWith("/journeys/")) {
        expect(journeyPaths.has(url.pathname)).toBe(true);
      }
    }
  });

  it("keeps map routes relevant to real actor or explicit gap records", () => {
    for (const route of getAllRoutes().filter((item) => item.href.startsWith("/map"))) {
      const url = new URL(route.href, "https://example.test");
      const filters = parseRouteFilters(url.searchParams);
      const actorMatches = filterActors(ALL_ACTORS, filters);
      const gapMatches = filterGaps(ALL_GAPS, filters);

      expect(
        actorMatches.length + gapMatches.length,
        `${route.roleId} ${route.intentId} should resolve to actors or explicit gaps`,
      ).toBeGreaterThan(0);
    }
  });

  it("routes every understand-gaps intent to the ecosystem-health diagnostic", () => {
    for (const route of getAllRoutes().filter((item) => item.intentId === "understand-gaps")) {
      expect(route.href).toBe("/ecosystem-health");
      expect(route.rationale.toLocaleLowerCase()).toMatch(/gap|health|data-quality/);
    }
  });

  it("keeps exposed onboarding intents in sync with retrievable routes", () => {
    for (const role of ALL_ROLES) {
      const roleId = role.id as RoleId;

      for (const intent of getIntentsForRole(roleId)) {
        const route = getIntentRoute(roleId, intent.id);

        expect(
          route,
          `${roleId} ${intent.id} should have a retrievable route`,
        ).toBeDefined();
        expect(route?.roleId).toBe(roleId);
        expect(route?.intentId).toBe(intent.id);
      }
    }
  });

  it("routes get-started intents to the selected role journey", () => {
    const journeyRoleIds = new Set(ALL_JOURNEYS.map((journey) => journey.roleId));

    for (const route of getAllRoutes().filter((item) => item.intentId === "get-started")) {
      const url = new URL(route.href, "https://example.test");

      expect(url.pathname).toBe(`/journeys/${route.roleId}`);
      expect(journeyRoleIds.has(route.roleId)).toBe(true);
    }
  });

  it("uses only managed filter params in map routes", () => {
    const allowedParams = new Set([
      "county",
      "dir",
      "orgType",
      "pillar",
      "pillarGroup",
      "sort",
      "stage",
      "status",
      "view",
    ]);

    for (const route of getAllRoutes().filter((item) => item.href.startsWith("/map"))) {
      const url = new URL(route.href, "https://example.test");

      for (const key of url.searchParams.keys()) {
        expect(
          allowedParams.has(key),
          `${route.roleId} ${route.intentId} uses unmanaged param ${key}`,
        ).toBe(true);
      }
    }
  });

  it("does not silently drop invalid map route filter values", () => {
    for (const route of getAllRoutes().filter((item) => item.href.startsWith("/map"))) {
      const url = new URL(route.href, "https://example.test");
      const parsedFilters = parseRouteFilters(url.searchParams);

      expect(parsedFilters.pillar).toEqual(parseRequiredNumberList(url, "pillar"));
      expect(parsedFilters.county).toEqual(
        parseRequiredEnumList(url, "county", CountySchema.options),
      );
      expect(parsedFilters.status).toEqual(
        parseRequiredEnumList(url, "status", StatusSchema.options),
      );
      expect(parsedFilters.orgType).toEqual(
        parseRequiredEnumList(url, "orgType", OrgTypeSchema.options),
      );
      expect(parsedFilters.stage).toEqual(
        parseRequiredEnumList(url, "stage", StageSchema.options),
      );
      expect(parsedFilters.pillarGroup).toEqual(
        parseRequiredEnumList(url, "pillarGroup", PillarGroupSchema.options),
      );
    }
  });

  it("keeps map route matches relevant to the explicit route filters", () => {
    for (const route of getAllRoutes().filter((item) => item.href.startsWith("/map"))) {
      const url = new URL(route.href, "https://example.test");
      const filters = parseRouteFilters(url.searchParams);
      const actorMatches = filterActors(ALL_ACTORS, filters);
      const gapMatches = filterGaps(ALL_GAPS, filters);

      expect(
        actorMatches.length + gapMatches.length,
        `${route.roleId} ${route.intentId} should resolve to actors or explicit gaps`,
      ).toBeGreaterThan(0);

      for (const actor of actorMatches) {
        expect(
          actorMatchesExplicitFilter(actor, filters),
          `${route.roleId} ${route.intentId} matched ${actor.name} without satisfying an explicit route filter`,
        ).toBe(true);
      }
    }
  });

  it("keeps intent destination types aligned with product intent", () => {
    for (const route of getAllRoutes()) {
      const url = new URL(route.href, "https://example.test");

      if (route.intentId === "understand-gaps") {
        expect(url.pathname).toBe("/ecosystem-health");
      } else if (route.intentId === "get-started") {
        expect(url.pathname).toBe(`/journeys/${route.roleId}`);
      } else {
        expect(url.pathname).toBe("/map");
      }
    }
  });
});

function getAllRoutes(): RoleIntentRoute[] {
  return Object.entries(ROLE_INTENT_ROUTES).flatMap(([roleId, intents]) =>
    Object.keys(intents).flatMap((intentId) => {
      const route = getIntentRoute(roleId as RoleId, intentId as IntentId);

      return route ? [route] : [];
    }),
  );
}

function parseRouteFilters(searchParams: URLSearchParams): FilterState {
  return {
    ...DEFAULT_FILTERS,
    pillar: parseNumberList(searchParams.get("pillar")).filter((id) =>
      ALL_PILLARS.some((pillar) => pillar.id === id),
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

function parseNumberList(value: string | null): number[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => Number(item))
    .filter((item) => Number.isInteger(item));
}

function parseEnumList<T extends County | OrgType | PillarGroup | Stage | Status>(
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

function parseRequiredNumberList(url: URL, key: string): number[] {
  const rawValues = splitParam(url.searchParams.get(key));
  const parsedValues = rawValues.map((item) => Number(item));

  expect(
    parsedValues.every((item) => Number.isInteger(item)),
    `${url.pathname}${url.search} has invalid ${key} value`,
  ).toBe(true);

  return parsedValues;
}

function parseRequiredEnumList<T extends County | OrgType | PillarGroup | Stage | Status>(
  url: URL,
  key: string,
  allowedValues: readonly T[],
): T[] {
  const rawValues = splitParam(url.searchParams.get(key));

  for (const value of rawValues) {
    expect(
      allowedValues.includes(value as T),
      `${url.pathname}${url.search} has invalid ${key} value ${value}`,
    ).toBe(true);
  }

  return rawValues as T[];
}

function splitParam(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

function actorMatchesExplicitFilter(actor: Actor, filters: FilterState): boolean {
  const hasExplicitActorFilter =
    filters.pillar.length > 0 ||
    filters.county.length > 0 ||
    filters.status.length > 0 ||
    filters.orgType.length > 0 ||
    filters.stage.length > 0 ||
    filters.pillarGroup.length > 0;

  if (!hasExplicitActorFilter) {
    return true;
  }

  return (
    filters.pillar.some((pillarId) => actor.pillars.includes(pillarId)) ||
    filters.county.includes(actor.county) ||
    filters.status.includes(actor.status) ||
    filters.orgType.includes(actor.orgType) ||
    filters.stage.some((stage) => actor.stagesServed?.includes(stage)) ||
    filters.pillarGroup.some((group) =>
      ALL_PILLARS.some(
        (pillar) => pillar.group === group && actor.pillars.includes(pillar.id),
      ),
    )
  );
}
