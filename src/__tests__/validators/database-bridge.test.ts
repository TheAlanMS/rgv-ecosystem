import { describe, expect, it } from "vitest";
import { ZodError } from "zod/v4";
import type { Actor, Gap, Journey, Pillar, Role } from "@/lib/types";
import {
  mapActorDocument,
  mapGapDocument,
  mapJourneyDocument,
  mapPillarDocument,
  mapRoleDocument,
} from "@/lib/validators";

const actor: Actor = {
  id: "startup-rgv",
  name: "Startup RGV",
  slug: "startup-rgv",
  orgType: "Incubator",
  pillars: [7],
  city: "Brownsville",
  county: "Cameron",
  description: "Supports founders in the Rio Grande Valley.",
  whatTheyOffer: ["Mentorship"],
  whoTheyServe: ["Founders"],
  status: "Active",
  stagesServed: ["Idea"],
  websiteUrl: "https://example.com",
  coordinates: { lat: 25.9017, lng: -97.4975 },
  coordinateSource: "city-center",
  dateAdded: "2026-04-22",
  lastVerified: "2026-04-22",
  verifiedBy: "system",
  communitySubmitted: false,
};

const pillar: Pillar = {
  id: 7,
  name: "Incubators & Accelerators",
  slug: "incubators-accelerators",
  capacity: "Company Formation",
  group: "engine",
  description: "Programs that help founders move from idea to viable company.",
  status: "Active",
};

const gap: Gap = {
  id: "gap-local-angel-networks",
  pillar: 3,
  county: "Hidalgo",
  description: "No organized angel investor network exists in the RGV.",
  flaggedBy: "system",
  dateFlagged: "2026-04-22",
  status: "Open",
};

const role: Role = {
  id: "startup",
  label: "Startup / Founder",
  shortLabel: "Founder",
  description: "Building a venture or product in the RGV",
  initials: "F",
  colors: { bg: "rgba(212,168,75,.18)", fg: "#e8c070" },
};

const journey: Journey = {
  roleId: "startup",
  title: "Founder's Journey",
  steps: [
    {
      base: "1st Base",
      label: "Get educated & connected",
      pillars: [4, 6],
      strategy: "Find a program that fits where you are.",
    },
    {
      base: "2nd Base",
      label: "Build & get supported",
      pillars: [7, 5],
      strategy: "Enter an accelerator or incubator.",
    },
    {
      base: "3rd Base",
      label: "Raise capital & build your team",
      pillars: [3, 2],
      strategy: "Access grants, programs, and team pipelines.",
    },
    {
      base: "Home Plate",
      label: "Land customers & scale",
      pillars: [1, 8],
      strategy: "Land your first institutional customer.",
    },
  ],
};

describe("database validation bridge", () => {
  it("maps Convex-like actor documents to public actors", () => {
    expect(
      mapActorDocument({
        ...actor,
        _id: "convex-actor-id",
        _creationTime: 1770000000000,
        submitterEmail: "private@example.com",
        moderationNotes: "private",
      }),
    ).toEqual(actor);
  });

  it("maps Convex-like pillar documents to public pillars", () => {
    expect(
      mapPillarDocument({
        ...pillar,
        _id: "convex-pillar-id",
        _creationTime: 1770000000000,
        internalSortKey: "private",
      }),
    ).toEqual(pillar);
  });

  it("maps Convex-like gap documents to public gaps", () => {
    expect(
      mapGapDocument({
        ...gap,
        _id: "convex-gap-id",
        _creationTime: 1770000000000,
        reviewerNotes: "private",
      }),
    ).toEqual(gap);
  });

  it("maps Convex-like role documents to public roles", () => {
    expect(
      mapRoleDocument({
        ...role,
        _id: "convex-role-id",
        _creationTime: 1770000000000,
        adminOnly: true,
      }),
    ).toEqual(role);
  });

  it("maps Convex-like journey documents to public journeys", () => {
    expect(
      mapJourneyDocument({
        ...journey,
        _id: "convex-journey-id",
        _creationTime: 1770000000000,
        draftNotes: "private",
      }),
    ).toEqual(journey);
  });

  it("throws Zod errors for invalid actor documents", () => {
    expect(() =>
      mapActorDocument({
        ...actor,
        orgType: "Funder",
        stagesServed: undefined,
      }),
    ).toThrow(ZodError);
  });

  it("throws Zod errors for invalid pillar, gap, role, and journey documents", () => {
    expect(() => mapPillarDocument({ ...pillar, id: 11 })).toThrow(ZodError);
    expect(() => mapGapDocument({ ...gap, county: "Bexar" })).toThrow(ZodError);
    expect(() => mapRoleDocument({ ...role, initials: "TOO_LONG" })).toThrow(
      ZodError,
    );
    expect(() =>
      mapJourneyDocument({
        ...journey,
        steps: journey.steps.slice(0, 3),
      }),
    ).toThrow(ZodError);
  });
});
