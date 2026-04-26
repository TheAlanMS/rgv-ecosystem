import { RoleSchema } from "@/lib/types";
import type { Role } from "@/lib/types";
import {
  stripConvexPrivateFields,
  type ConvexLikeDocument,
} from "./document";

export type RoleDocument = ConvexLikeDocument<Role>;

export function mapRoleDocument(document: unknown): Role {
  return RoleSchema.parse(stripConvexPrivateFields(document));
}

export function mapRoleDocuments(documents: readonly unknown[]): Role[] {
  return documents.map(mapRoleDocument);
}
