import { getConvexActorsPage } from "@/lib/convex/server";
import { badRequest, fieldErrors, ok, serverError } from "@/lib/api/responses";
import { ActorsQuerySchema, paramsObject } from "@/lib/api/query";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = ActorsQuerySchema.safeParse(paramsObject(url.searchParams));

  if (!parsed.success) {
    return badRequest("Invalid actor filters.", fieldErrors(parsed.error));
  }

  try {
    const page = await getConvexActorsPage(parsed.data);
    return ok(page);
  } catch (error) {
    console.error("Failed to fetch actors API response.", error);
    return serverError("Unable to fetch actors.");
  }
}
