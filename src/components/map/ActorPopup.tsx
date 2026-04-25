"use client";

import Link from "next/link";
import { Popup } from "react-leaflet";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Actor } from "@/lib/types";

interface ActorPopupProps {
  actor: Actor;
}

export function ActorPopup({ actor }: ActorPopupProps) {
  return (
    <Popup className="ecosystem-popup">
      <div className="min-w-48 space-y-2 text-sm">
        <div>
          <h3 className="font-heading text-base font-semibold text-slate-50">
            {actor.name}
          </h3>
          <p className="text-xs text-slate-300">
            {actor.orgType} · {actor.city}
          </p>
        </div>
        <StatusBadge status={actor.status} />
        {actor.coordinateSource && actor.coordinateSource !== "exact" ? (
          <p className="text-xs text-slate-400">
            Location shown at {actor.coordinateSource === "city-center" ? "city center" : "representative city"} level.
          </p>
        ) : null}
        <Link
          href={`/actors/${actor.slug}`}
          className="inline-flex min-h-9 items-center rounded-md border border-slate-500 px-3 text-xs font-semibold text-slate-50 transition-colors hover:border-slate-200 hover:bg-slate-800"
        >
          View profile
        </Link>
      </div>
    </Popup>
  );
}
