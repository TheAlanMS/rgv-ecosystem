import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/utils/slug";

describe("slugify", () => {
  it("lowercases text and replaces separator runs with hyphens", () => {
    expect(slugify("Rio Grande Valley Innovation")).toBe(
      "rio-grande-valley-innovation",
    );
    expect(slugify("  eBridge Center!!! ")).toBe("ebridge-center");
  });

  it("strips non-ascii characters under the current slug contract", () => {
    expect(slugify("Café Niño")).toBe("caf-ni-o");
  });

  it("is deterministic", () => {
    expect(slugify("Same Input")).toBe(slugify("Same Input"));
  });
});
