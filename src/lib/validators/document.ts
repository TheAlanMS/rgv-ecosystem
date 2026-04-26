type ConvexPrivateFields = {
  _id?: unknown;
  _creationTime?: unknown;
};

const PRIVATE_FIELD_NAMES = new Set([
  "_id",
  "_creationTime",
  "createdAt",
  "updatedAt",
  "sortOrder",
  "submitterEmail",
  "reviewerNotes",
  "moderationNotes",
  "internalSortKey",
  "adminOnly",
  "draftNotes",
]);

export type ConvexLikeDocument<TDomain extends object> = TDomain &
  ConvexPrivateFields &
  Record<string, unknown>;

export function stripConvexPrivateFields<TDomain extends object>(
  document: unknown,
): Partial<TDomain> {
  if (typeof document !== "object" || document === null || Array.isArray(document)) {
    return {};
  }

  const domainFields: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(document)) {
    if (!PRIVATE_FIELD_NAMES.has(key)) {
      domainFields[key] = value;
    }
  }

  return domainFields as Partial<TDomain>;
}
