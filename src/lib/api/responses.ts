import { NextResponse } from "next/server";
import type { ZodError } from "zod/v4";

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    fields?: Record<string, string[]>;
  };
}

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function badRequest(message: string, fields?: Record<string, string[]>) {
  return NextResponse.json<ApiErrorBody>(
    {
      error: {
        code: "bad_request",
        message,
        ...(fields ? { fields } : {}),
      },
    },
    { status: 400 },
  );
}

export function notFound(message: string) {
  return NextResponse.json<ApiErrorBody>(
    { error: { code: "not_found", message } },
    { status: 404 },
  );
}

export function tooManyRequests(message: string) {
  return NextResponse.json<ApiErrorBody>(
    { error: { code: "rate_limited", message } },
    { status: 429 },
  );
}

export function serverError(message = "Unexpected server error.") {
  return NextResponse.json<ApiErrorBody>(
    { error: { code: "server_error", message } },
    { status: 500 },
  );
}

export function fieldErrors(error: ZodError): Record<string, string[]> {
  const fields: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const path = issue.path.join(".") || "body";
    fields[path] = [...(fields[path] ?? []), issue.message];
  }

  return fields;
}
