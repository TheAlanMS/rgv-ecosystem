"use client";

import "leaflet/dist/leaflet.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";

import MarkerClusterGroup from "react-leaflet-cluster";
import { MapContainer, TileLayer } from "react-leaflet";
import { getGeographicMapContext } from "@/lib/data/geography";
import { COUNTY_LABELS } from "@/lib/types";
import type { Actor, Gap } from "@/lib/types";
import { ActorMarker } from "./ActorMarker";
import { CountyGapMarker } from "./CountyGapMarker";

interface LeafletEcosystemMapProps {
  actors: readonly Actor[];
  gaps: readonly Gap[];
}

const RGV_CENTER: [number, number] = [26.2, -97.7];

export function LeafletEcosystemMap({ actors, gaps }: LeafletEcosystemMapProps) {
  const { rgvActors, outsideRegionActors, counties } = getGeographicMapContext(
    actors,
    gaps,
  );

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border-default bg-surface">
      <MapContainer
        center={RGV_CENTER}
        className="h-[22rem] w-full touch-pan-x touch-pan-y sm:h-[28rem] md:h-[36rem]"
        scrollWheelZoom={false}
        zoom={9}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading showCoverageOnHover={false}>
          {rgvActors.map((actor) => (
            <ActorMarker key={actor.id} actor={actor} />
          ))}
        </MarkerClusterGroup>
        {counties.map((county) => (
          <CountyGapMarker key={county.county} county={county} />
        ))}
      </MapContainer>
      <div className="space-y-3 border-t border-border-default px-4 py-3">
        <div className="grid gap-3 text-xs md:grid-cols-[1.3fr_1fr]">
          <div aria-label="Actor marker legend">
            <p className="font-semibold text-text-primary">Actor markers</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <LegendSwatch color="#2f80ed" label="Supply" />
              <LegendSwatch color="#27ae60" label="Engine" />
              <LegendSwatch color="#f2c94c" label="Demand" />
              <LegendSwatch color="#94a3b8" label="Infrastructure" />
            </div>
          </div>
          <div aria-label="Marker status legend">
            <p className="font-semibold text-text-primary">Marker status</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <StatusSwatch borderStyle="solid" label="Active" />
              <StatusSwatch borderStyle="double" label="Emerging" />
              <StatusSwatch borderStyle="dashed" label="Gap" />
              <StatusSwatch borderStyle="dotted" label="Inactive" />
            </div>
          </div>
        </div>
        <div aria-label="County gap marker legend" className="text-xs">
          <p className="font-semibold text-text-primary">County gap markers</p>
          <p className="mt-1 text-text-muted">
            Numbered diamond markers show open ecosystem gaps at county
            centroids, so low-coverage counties remain visible even when no
            actors match the current filters.
          </p>
        </div>
        <p className="text-xs text-text-muted">
          Showing {rgvActors.length} RGV mapped actors.{" "}
          {outsideRegionActors.length} outside-region partners are counted
          separately and are not plotted as RGV markers. City-center coordinates
          are used where exact addresses are not yet verified.
        </p>
        <div
          className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 lg:grid-cols-4"
          aria-label="County map context"
        >
          {counties.map((county) => (
            <div
              key={county.county}
              className="rounded-md border border-border2 bg-surface2 px-3 py-2"
            >
              <p className="font-semibold text-text-primary">
                {COUNTY_LABELS[county.county]}
              </p>
              <p className="mt-1 text-text-muted">
                {county.actorCount} actors - {county.openGapCount} open gaps
              </p>
              {county.openGapCount > 0 ? (
                <p className="mt-1 text-text-muted">
                  Gap marker plotted at county centroid.
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-text-muted">
      <span
        aria-hidden="true"
        className="h-3 w-3 rounded-full border-2 border-white"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

function StatusSwatch({
  borderStyle,
  label,
}: {
  borderStyle: "solid" | "double" | "dashed" | "dotted";
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-text-muted">
      <span
        aria-hidden="true"
        className="h-3 w-3 rounded-full border-2 border-white bg-text-muted"
        style={{ borderStyle }}
      />
      {label}
    </span>
  );
}
