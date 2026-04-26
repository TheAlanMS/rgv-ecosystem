import { PillarSchema } from "@/lib/types";
import type { Pillar } from "@/lib/types";
import {
  stripConvexPrivateFields,
  type ConvexLikeDocument,
} from "./document";

export type PillarDocument = ConvexLikeDocument<Pillar>;

export function mapPillarDocument(document: unknown): Pillar {
  return PillarSchema.parse(stripConvexPrivateFields(document));
}

export function mapPillarDocuments(documents: readonly unknown[]): Pillar[] {
  return documents.map(mapPillarDocument);
}
