import { Suspense } from "react";
import type { Pillar, Actor } from "@/lib/types";
import { Tag } from "@/components/ui/Tag";
import { PILLAR_GROUP_LABELS } from "@/lib/types";
import { ActorDirectory } from "@/components/actors/ActorDirectory";

interface PillarDetailProps {
  pillar: Pillar;
  actors: Actor[];
}

export function PillarDetail({ pillar, actors }: PillarDetailProps) {
  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Tag group={pillar.group}>
              {PILLAR_GROUP_LABELS[pillar.group]}
            </Tag>
            <span className="text-[10px] text-text-muted font-heading font-semibold tracking-wide">
              Pillar {pillar.id}
            </span>
          </div>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            {pillar.name}
          </h2>
          <p className="text-[13px] text-text-muted">{pillar.capacity}</p>
        </div>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {pillar.description}
      </p>

      <div className="text-[10px] text-text-muted mb-1 font-medium uppercase tracking-wide">
        Status
      </div>
      <p className="text-xs text-text-secondary mb-6">{pillar.status}</p>

      <div className="text-[10px] font-semibold text-text-muted tracking-widest uppercase font-heading mb-2.5">
        Actors ({actors.length})
      </div>
      <Suspense fallback={<ActorDirectoryFallback />}>
        <ActorDirectory
          actors={actors}
          lockedFilters={{ pillar: [pillar.id] }}
          lockedFilterLabels={[`Pillar ${pillar.id}`]}
        />
      </Suspense>
    </div>
  );
}

function ActorDirectoryFallback() {
  return (
    <div className="rounded-xl border border-border-default bg-surface p-6 text-sm text-text-muted">
      Loading filters...
    </div>
  );
}
