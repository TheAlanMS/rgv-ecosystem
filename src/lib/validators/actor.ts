import { ActorSchema } from "@/lib/types";
import type { Actor } from "@/lib/types";
import {
  stripConvexPrivateFields,
  type ConvexLikeDocument,
} from "./document";

export type ActorDocument = ConvexLikeDocument<Actor>;

export function mapActorDocument(document: unknown): Actor {
  return ActorSchema.parse(stripConvexPrivateFields(document));
}

export function mapActorDocuments(documents: readonly unknown[]): Actor[] {
  return documents.map(mapActorDocument);
}
