import { render, screen, within } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";
import { LeafletEcosystemMap } from "@/components/map/LeafletEcosystemMap";
import { ALL_ACTORS, ALL_GAPS } from "@/lib/data";

vi.mock("leaflet/dist/leaflet.css", () => ({}));
vi.mock("react-leaflet-cluster/dist/assets/MarkerCluster.css", () => ({}));
vi.mock("react-leaflet-cluster/dist/assets/MarkerCluster.Default.css", () => ({}));

vi.mock("leaflet", () => ({
  default: {
    divIcon: vi.fn((options) => options),
  },
}));

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  Marker: ({
    children,
    title,
  }: {
    children?: React.ReactNode;
    title?: string;
  }) => <div data-title={title}>{children}</div>,
  Popup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
}));

vi.mock("react-leaflet-cluster", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="marker-cluster">{children}</div>
  ),
}));

describe("LeafletEcosystemMap", () => {
  it("renders map legends and county-level open gap markers", () => {
    render(<LeafletEcosystemMap actors={ALL_ACTORS} gaps={ALL_GAPS} />);

    const actorLegend = screen.getByLabelText("Actor marker legend");
    const statusLegend = screen.getByLabelText("Marker status legend");

    expect(actorLegend).toBeInTheDocument();
    expect(statusLegend).toBeInTheDocument();
    expect(screen.getByLabelText("County gap marker legend")).toBeInTheDocument();
    expect(within(actorLegend).getByText("Supply")).toBeInTheDocument();
    expect(within(statusLegend).getByText("Emerging")).toBeInTheDocument();
    expect(
      screen.getByText(/Numbered diamond markers show open ecosystem gaps/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No active Starr County ecosystem actors/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No active Willacy County ecosystem actors/i),
    ).toBeInTheDocument();
  });
});
