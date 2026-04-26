import { JourneySchema } from "@/lib/types";
import type { Journey } from "@/lib/types";
import {
  stripConvexPrivateFields,
  type ConvexLikeDocument,
} from "./document";

export type JourneyDocument = ConvexLikeDocument<Journey>;

export function mapJourneyDocument(document: unknown): Journey {
  return JourneySchema.parse(stripConvexPrivateFields(document));
}

export function mapJourneyDocuments(documents: readonly unknown[]): Journey[] {
  return documents.map(mapJourneyDocument);
}
