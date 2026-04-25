"use client";

import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import type { CountyMapContext } from "@/lib/data/geography";

interface CountyGapMarkerProps {
  county: CountyMapContext;
}

export function CountyGapMarker({ county }: CountyGapMarkerProps) {
  if (county.openGapCount === 0) {
    return null;
  }

  const size = Math.min(34, 22 + county.openGapCount * 4);
  const touchSize = 44;
  const icon = L.divIcon({
    className: "ecosystem-gap-marker",
    html: `<span aria-hidden="true" style="width:${size}px; height:${size}px;"><b>${county.openGapCount}</b></span>`,
    iconAnchor: [touchSize / 2, touchSize / 2],
    iconSize: [touchSize, touchSize],
    popupAnchor: [0, -size / 2],
  });

  return (
    <Marker
      icon={icon}
      position={[county.centroid.lat, county.centroid.lng]}
      title={`${county.countyName}: ${county.openGapCount} open ecosystem gaps`}
    >
      <Popup className="ecosystem-popup">
        <div className="space-y-2">
          <div>
            <p className="text-sm font-semibold">{county.countyName}</p>
            <p className="text-xs text-slate-300">
              {county.actorCount} actors - {county.openGapCount} open gaps
            </p>
          </div>
          <ul className="space-y-1 text-xs text-slate-200">
            {county.openGaps.map((gap) => (
              <li key={gap.id}>{gap.description}</li>
            ))}
          </ul>
        </div>
      </Popup>
    </Marker>
  );
}
