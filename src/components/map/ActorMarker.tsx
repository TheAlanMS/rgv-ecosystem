"use client";

import { Marker } from "react-leaflet";
import { ALL_PILLARS } from "@/lib/data/pillars";
import L from "leaflet";
import type { Actor, PillarGroup } from "@/lib/types";
import { ActorPopup } from "./ActorPopup";

interface ActorMarkerProps {
  actor: Actor;
}

const GROUP_COLORS: Record<PillarGroup, string> = {
  demand: "#f2c94c",
  engine: "#27ae60",
  infra: "#94a3b8",
  supply: "#2f80ed",
};

const STATUS_RADIUS: Record<Actor["status"], number> = {
  Active: 9,
  Emerging: 7,
  Gap: 6,
  Inactive: 5,
};

export function ActorMarker({ actor }: ActorMarkerProps) {
  if (!actor.coordinates) {
    return null;
  }

  const pillarGroup = getPrimaryPillarGroup(actor);
  const color = GROUP_COLORS[pillarGroup];
  const size = STATUS_RADIUS[actor.status] * 2;
  const touchSize = 44;
  const icon = L.divIcon({
    className: "ecosystem-marker",
    html: `<span style="background:${color}; width:${size}px; height:${size}px;"></span>`,
    iconAnchor: [touchSize / 2, touchSize / 2],
    iconSize: [touchSize, touchSize],
    popupAnchor: [0, -size / 2],
  });

  return (
    <Marker
      icon={icon}
      position={[actor.coordinates.lat, actor.coordinates.lng]}
      title={actor.name}
    >
      <ActorPopup actor={actor} />
    </Marker>
  );
}

function getPrimaryPillarGroup(actor: Actor): PillarGroup {
  return (
    ALL_PILLARS.find((pillar) => pillar.id === actor.pillars[0])?.group ?? "infra"
  );
}
