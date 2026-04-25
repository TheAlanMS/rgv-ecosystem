import Link from "next/link";
import type { Pillar } from "@/lib/types";
import { PILLAR_GROUP_LABELS } from "@/lib/types";
import { Tag } from "@/components/ui/Tag";
import { getActorsByPillar } from "@/lib/queries/actors";

interface PillarCardProps {
  pillar: Pillar;
}

export function PillarCard({ pillar }: PillarCardProps) {
  const actors = getActorsByPillar(pillar.id);
  const gapCount = actors.filter((a) => a.status === "Gap").length;

  return (
    <Link
      href={`/pillars/${pillar.slug}`}
      className="block bg-surface border border-border-default rounded-[10px] p-3 transition-colors hover:border-border2 hover:bg-surface2"
    >
      <div className="text-[10px] text-text-muted font-semibold font-heading tracking-wide mb-0.5">
        Pillar {pillar.id}
      </div>
      <div className="text-[13px] font-medium text-text-primary font-heading leading-tight mb-0.5">
        {pillar.name}
      </div>
      <div className="text-[11px] text-text-muted mb-2">{pillar.capacity}</div>
      <div className="flex items-center gap-1.5 flex-wrap">
        <Tag group={pillar.group}>
          {PILLAR_GROUP_LABELS[pillar.group]}
        </Tag>
        {gapCount > 0 && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[var(--gap-bg)] text-[var(--gap-fg)] border border-[var(--gap-border)]">
            {gapCount} gap{gapCount > 1 ? "s" : ""}
          </span>
        )}
        <span className="text-[10px] text-text-muted">
          {actors.length} actors
        </span>
      </div>
    </Link>
  );
}
