import { ConvexHttpClient } from "convex/browser";
import { internal } from "../convex/_generated/api";
import {
  ActorSchema,
  GapSchema,
  JourneySchema,
  PillarSchema,
  RoleSchema,
} from "../src/lib/types";
import {
  ALL_ACTORS,
  ALL_GAPS,
  ALL_JOURNEYS,
  ALL_PILLARS,
  ALL_ROLES,
} from "../src/lib/data";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is required to import seed data.");
}

const actors = ALL_ACTORS.map((actor) => ActorSchema.parse(actor));
const pillars = ALL_PILLARS.map((pillar) => PillarSchema.parse(pillar));
const gaps = ALL_GAPS.map((gap) => GapSchema.parse(gap));
const roles = ALL_ROLES.map((role) => RoleSchema.parse(role));
const journeys = ALL_JOURNEYS.map((journey) => JourneySchema.parse(journey));

const client = new ConvexHttpClient(convexUrl);

const importMutation = internal.importSeedData.upsertSeedData as unknown as Parameters<
  ConvexHttpClient["mutation"]
>[0];

void (async () => {
  const result = await client.mutation(importMutation, {
    actors,
    pillars,
    gaps,
    roles,
    journeys,
  });
  console.log("Imported Convex seed data:", result);
})();
