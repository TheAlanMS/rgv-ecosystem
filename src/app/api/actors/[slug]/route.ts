import { getConvexActorBySlug } from "@/lib/convex/server";
import { ok, notFound, serverError } from "@/lib/api/responses";

interface ActorRouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: ActorRouteContext) {
  const { slug } = await context.params;

  try {
    const actor = await getConvexActorBySlug(slug);

    if (!actor) {
      return notFound("Actor not found.");
    }

    return ok({ actor });
  } catch (error) {
    console.error("Failed to fetch actor API response.", error);
    return serverError("Unable to fetch actor.");
  }
}
