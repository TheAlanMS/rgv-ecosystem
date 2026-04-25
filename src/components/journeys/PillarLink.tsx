import Link from "next/link";
import type { Pillar } from "@/lib/types";
import { getActorsByPillar } from "@/lib/queries/actors";

interface PillarLinkProps {
  pillar: Pillar;
}

export function PillarLink({ pillar }: PillarLinkProps) {
  const actorCount = getActorsByPillar(pillar.id).length;

  const groupColors: Record<string, string> = {
    supply: "var(--supply-fg)",
    engine: "var(--engine-fg)",
    demand: "var(--demand-fg)",
    infra: "var(--infra-fg)",
  };

  return (
    <Link
      href={`/pillars/${pillar.slug}`}
      className="block p-3 bg-surface2 border border-border-default rounded-lg transition-colors hover:border-border2"
    >
      <div
        className="text-[10px] font-semibold font-heading mb-0.5"
        style={{ color: groupColors[pillar.group] ?? "var(--text-muted)" }}
      >
        Pillar {pillar.id}
      </div>
      <div className="text-xs font-medium text-text-primary font-heading mb-0.5">
        {pillar.name}
      </div>
      <div className="text-[11px] text-text-muted">{pillar.capacity}</div>
      <div className="text-[10px] text-text-muted mt-1 opacity-70">
        {actorCount} actors mapped &rarr;
      </div>
    </Link>
  );
}
