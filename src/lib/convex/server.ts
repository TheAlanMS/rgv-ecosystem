import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import type { County, GapStatus, PillarGroup, Status } from "@/lib/types";
import {
  mapActorDocument,
  mapActorDocuments,
  mapGapDocuments,
  mapJourneyDocument,
  mapJourneyDocuments,
  mapPillarDocument,
  mapPillarDocuments,
  mapRoleDocument,
  mapRoleDocuments,
} from "@/lib/validators";

function getConvexClient(): ConvexHttpClient {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is required for Convex queries.");
  }
  return new ConvexHttpClient(url);
}

export async function getConvexActors(limit?: number) {
  return mapActorDocuments(
    await getConvexClient().query(api.actors.list, { limit }),
  );
}

export async function getConvexActorBySlug(slug: string) {
  const actor = await getConvexClient().query(api.actors.bySlug, { slug });
  return actor ? mapActorDocument(actor) : null;
}

export async function getConvexActorsByCounty(county: County, limit?: number) {
  return mapActorDocuments(
    await getConvexClient().query(api.actors.byCounty, { county, limit }),
  );
}

export async function getConvexActorsByStatus(status: Status, limit?: number) {
  return mapActorDocuments(
    await getConvexClient().query(api.actors.byStatus, { status, limit }),
  );
}

export async function getConvexActorsByPillar(pillarId: number, limit?: number) {
  return mapActorDocuments(
    await getConvexClient().query(api.actors.byPillar, {
      pillarId,
      limit,
    }),
  );
}

export async function getConvexPillars() {
  return mapPillarDocuments(await getConvexClient().query(api.pillars.list, {}));
}

export async function getConvexPillarBySlug(slug: string) {
  const pillar = await getConvexClient().query(api.pillars.bySlug, { slug });
  return pillar ? mapPillarDocument(pillar) : null;
}

export async function getConvexPillarById(id: number) {
  const pillar = await getConvexClient().query(api.pillars.byId, { id });
  return pillar ? mapPillarDocument(pillar) : null;
}

export async function getConvexPillarsByGroup(group: PillarGroup) {
  return mapPillarDocuments(
    await getConvexClient().query(api.pillars.byGroup, { group }),
  );
}

export async function getConvexGaps(limit?: number) {
  return mapGapDocuments(await getConvexClient().query(api.gaps.list, { limit }));
}

export async function getConvexGapsByPillar(pillarId: number, limit?: number) {
  return mapGapDocuments(
    await getConvexClient().query(api.gaps.byPillar, { pillarId, limit }),
  );
}

export async function getConvexGapsByCounty(county: County, limit?: number) {
  return mapGapDocuments(
    await getConvexClient().query(api.gaps.byCounty, { county, limit }),
  );
}

export async function getConvexGapsByStatus(status: GapStatus, limit?: number) {
  return mapGapDocuments(
    await getConvexClient().query(api.gaps.byStatus, { status, limit }),
  );
}

export async function getConvexRoles() {
  return mapRoleDocuments(
    await getConvexClient().query(api.journeys.listRoles, {}),
  );
}

export async function getConvexRoleById(roleId: string) {
  const role = await getConvexClient().query(api.journeys.roleById, { roleId });
  return role ? mapRoleDocument(role) : null;
}

export async function getConvexJourneys() {
  return mapJourneyDocuments(
    await getConvexClient().query(api.journeys.listJourneys, {}),
  );
}

export async function getConvexJourneyByRole(roleId: string) {
  const journey = await getConvexClient().query(api.journeys.journeyByRole, {
    roleId,
  });
  return journey ? mapJourneyDocument(journey) : null;
}

export async function getConvexHealthMetrics() {
  return await getConvexClient().query(api.health.metrics, {});
}
