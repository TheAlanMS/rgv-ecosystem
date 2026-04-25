/**
 * Convert a string to a URL-friendly slug.
 * Deterministic: same input always produces same output.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
