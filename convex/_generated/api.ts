/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import { anyApi } from "convex/server";
import type * as actors from "../actors.js";
import type * as gaps from "../gaps.js";
import type * as health from "../health.js";
import type * as importSeedData from "../importSeedData.js";
import type * as journeys from "../journeys.js";
import type * as pillars from "../pillars.js";
import type * as submissions from "../submissions.js";

const fullApi: ApiFromModules<{
  actors: typeof actors;
  gaps: typeof gaps;
  health: typeof health;
  importSeedData: typeof importSeedData;
  journeys: typeof journeys;
  pillars: typeof pillars;
  submissions: typeof submissions;
}> = anyApi as any;

export const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
> = anyApi as any;

export const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
> = anyApi as any;
