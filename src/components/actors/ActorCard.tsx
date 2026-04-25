import Link from "next/link";
import type { Actor } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface ActorCardProps {
  actor: Actor;
}

export function ActorCard({ actor }: ActorCardProps) {
  if (actor.status === "Gap") {
    return (
      <div className="bg-surface border border-dashed border-border2 rounded-lg p-3 opacity-65">
        <div className="text-[10px] font-semibold text-terra2 uppercase tracking-wide mb-1">
          Gap
        </div>
        <div className="text-[13px] font-medium text-text-primary leading-tight">
          {actor.name}
        </div>
        <div className="text-[11px] text-text-muted mt-1">
          {actor.orgType} &middot; {actor.city}, {actor.county}
        </div>
        <p className="text-xs text-text-muted mt-2 leading-relaxed line-clamp-2">
          {actor.description}
        </p>
      </div>
    );
  }

  return (
    <Link
      href={`/actors/${actor.slug}`}
      className="block bg-surface border border-border-default rounded-[10px] p-3 transition-colors hover:border-border2 hover:bg-surface2"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="text-[13px] font-medium text-text-primary leading-tight">
          {actor.name}
        </div>
        <StatusBadge status={actor.status} />
      </div>
      <div className="text-[11px] text-text-muted">
        {actor.orgType} &middot; {actor.city}, {actor.county}
      </div>
      <p className="text-xs text-text-muted mt-2 leading-relaxed line-clamp-2">
        {actor.description}
      </p>
    </Link>
  );
}
