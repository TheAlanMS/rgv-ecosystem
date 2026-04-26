import {
  getConvexActorsByPillar,
  getConvexPillarBySlug,
} from "@/lib/convex/server";
import { ok, notFound, serverError } from "@/lib/api/responses";

interface PillarRouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: PillarRouteContext) {
  const { slug } = await context.params;

  try {
    const pillar = await getConvexPillarBySlug(slug);

    if (!pillar) {
      return notFound("Pillar not found.");
    }

    const actors = await getConvexActorsByPillar(pillar.id, 100);
    return ok({ pillar, actors });
  } catch (error) {
    console.error("Failed to fetch pillar API response.", error);
    return serverError("Unable to fetch pillar.");
  }
}
