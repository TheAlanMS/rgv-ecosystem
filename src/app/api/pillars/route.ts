import { getConvexPillars } from "@/lib/convex/server";
import { ok, serverError } from "@/lib/api/responses";

export async function GET() {
  try {
    const pillars = await getConvexPillars();
    return ok({ items: pillars, total: pillars.length });
  } catch (error) {
    console.error("Failed to fetch pillars API response.", error);
    return serverError("Unable to fetch pillars.");
  }
}
