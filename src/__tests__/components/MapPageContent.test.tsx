import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MapPageContent } from "@/components/map/MapPageContent";
import { ALL_ACTORS, ALL_GAPS, ALL_PILLARS } from "@/lib/data";

vi.mock("next/navigation", () => ({
  usePathname: () => "/map",
  useRouter: () => ({
    replace: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("MapPageContent", () => {
  it("renders explicit Starr and Willacy gap context on the map page", () => {
    render(
      <MapPageContent
        actors={ALL_ACTORS}
        gaps={ALL_GAPS}
        pillars={ALL_PILLARS}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Visible ecosystem gaps" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No active Starr County ecosystem actors/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No active Willacy County ecosystem actors/i),
    ).toBeInTheDocument();
  });
});
