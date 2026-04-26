import { createConvexSubmission } from "@/lib/convex/server";
import { SubmissionSchema } from "@/lib/types/submission";
import {
  badRequest,
  fieldErrors,
  ok,
  serverError,
  tooManyRequests,
} from "@/lib/api/responses";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: Request) {
  if (isRateLimited(clientKey(request))) {
    return tooManyRequests("Please wait before sending another submission.");
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return badRequest("Request body must be valid JSON.");
  }

  const parsed = SubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return badRequest("Invalid submission.", fieldErrors(parsed.error));
  }

  try {
    const confirmation = await createConvexSubmission(parsed.data);
    return ok({ submission: confirmation }, { status: 201 });
  } catch (error) {
    console.error("Failed to create submission.", error);
    return serverError("Unable to create submission.");
  }
}
