import { describe, expect, it } from "vitest";
import { SubmissionSchema } from "@/lib/types/submission";

describe("SubmissionSchema", () => {
  it("accepts a new listing submission payload", () => {
    const result = SubmissionSchema.safeParse({
      type: "newListing",
      submitterName: "Ada Lovelace",
      submitterEmail: "ada@example.com",
      organizationName: "RGV Founder Lab",
      orgType: "Incubator",
      pillars: [7],
      city: "McAllen",
      county: "Hidalgo",
      description: "A founder support program serving early RGV entrepreneurs.",
      whatTheyOffer: ["Mentorship", "Workspace"],
      whoTheyServe: ["Startup founders"],
      websiteUrl: "https://example.com",
      contactEmail: "hello@example.com",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a correction payload without the required correction detail", () => {
    const result = SubmissionSchema.safeParse({
      type: "correction",
      submitterName: "Ada Lovelace",
      submitterEmail: "ada@example.com",
      actor: "rgv-founder-lab",
      issue: "The website is wrong.",
      correction: "",
    });

    expect(result.success).toBe(false);
  });

  it("accepts a gap flag submission payload", () => {
    const result = SubmissionSchema.safeParse({
      type: "gapFlag",
      submitterName: "Ada Lovelace",
      submitterEmail: "ada@example.com",
      missingActorType: "Founder-friendly lenders",
      county: "Starr",
      pillar: 3,
      pillarGroup: "supply",
      whyItMatters:
        "The county needs more visible early capital pathways for small business founders.",
    });

    expect(result.success).toBe(true);
  });
});
