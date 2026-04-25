"use client";

import "leaflet/dist/leaflet.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";

import MarkerClusterGroup from "react-leaflet-cluster";
import { MapContainer, TileLayer } from "react-leaflet";
import type { Actor } from "@/lib/types";
import { ActorMarker } from "./ActorMarker";

interface LeafletEcosystemMapProps {
  actors: readonly Actor[];
}

const RGV_CENTER: [number, number] = [26.2, -97.7];

export function LeafletEcosystemMap({ actors }: LeafletEcosystemMapProps) {
  const mappableActors = actors.filter((actor) => actor.coordinates);

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
          {mappableActors.map((actor) => (
            <ActorMarker key={actor.id} actor={actor} />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      <div className="border-t border-border-default px-4 py-3 text-xs text-text-muted">
        Showing {mappableActors.length} mapped actors. City-center coordinates are
        used where exact addresses are not yet verified.
      </div>
    </div>
  );
}
