import { GapSchema } from "@/lib/types";
import type { Gap } from "@/lib/types";
import {
  stripConvexPrivateFields,
  type ConvexLikeDocument,
} from "./document";

export type GapDocument = ConvexLikeDocument<Gap>;

export function mapGapDocument(document: unknown): Gap {
  return GapSchema.parse(stripConvexPrivateFields(document));
}

export function mapGapDocuments(documents: readonly unknown[]): Gap[] {
  return documents.map(mapGapDocument);
}
