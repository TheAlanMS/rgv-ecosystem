import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SearchResults } from "@/components/search/SearchResults";
import { ALL_GAPS } from "@/lib/data";

describe("SearchResults", () => {
  it("renders gap-only matches instead of the global no-results state", () => {
    const starrGap = ALL_GAPS.find(
      (gap) => gap.id === "gap-starr-county-actor-coverage",
    );

    expect(starrGap).toBeDefined();

    render(
      <SearchResults
        query="Starr"
        actors={[]}
        gaps={starrGap ? [starrGap] : []}
        pillars={[]}
        totalActorCount={0}
        totalGapCount={ALL_GAPS.length}
      />,
    );

    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Gaps (1)" })).toBeInTheDocument();
    expect(
      screen.getByText(/Showing 1 of \d+ documented gaps after search and filters/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No active Starr County ecosystem actors/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Starr County .* Pillar 9 .* Open/i)).toBeInTheDocument();
  });

  it("shows the gap empty state when a query has actor or pillar matches only", () => {
    render(
      <SearchResults
        query="capital"
        actors={[]}
        gaps={[]}
        pillars={[{ ...mockPillar, name: "Capital Providers" }]}
        totalActorCount={0}
        totalGapCount={ALL_GAPS.length}
      />,
    );

    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/No documented gaps match this search within the active filters/i),
    ).toBeInTheDocument();
  });
});

const mockPillar = {
  id: 3,
  slug: "capital-providers",
  name: "Capital Providers",
  group: "engine",
  capacity: "Capital",
  description: "Funding and capital access.",
  status: "Active",
} as const;
