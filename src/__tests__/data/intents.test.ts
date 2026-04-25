import { describe, expect, it } from "vitest";
import { ALL_ACTORS, ALL_GAPS, ALL_PILLARS } from "@/lib/data";
import {
  ALL_INTENTS,
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
import type { County, OrgType, PillarGroup, Stage, Status } from "@/lib/types";
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
