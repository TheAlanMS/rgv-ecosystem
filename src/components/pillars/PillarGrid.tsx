import type { Pillar } from "@/lib/types";
import { getPillarsByGroup } from "@/lib/queries/pillars";
import { PillarCard } from "./PillarCard";

export function PillarGrid() {
  const supply = getPillarsByGroup("supply");
  const engine = getPillarsByGroup("engine");
  const demand = getPillarsByGroup("demand");
  const infra = getPillarsByGroup("infra");

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <PillarColumn label="Supply" pillars={supply} />
        <PillarColumn label="Engine" pillars={engine} />
        <PillarColumn label="Demand" pillars={demand} />
      </div>
      <div className="text-[10px] font-semibold text-text-muted tracking-widest uppercase font-heading mb-2.5 px-0.5">
        Ecosystem Infrastructure (foundation layer)
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {infra.map((p) => (
          <PillarCard key={p.id} pillar={p} />
        ))}
      </div>
    </div>
  );
}

function PillarColumn({
  label,
  pillars,
}: {
  label: string;
  pillars: Pillar[];
}) {
  return (
    <div>
      <div className="text-[10px] font-semibold text-text-muted tracking-widest uppercase font-heading mb-2.5 px-0.5">
        {label} &rarr;
      </div>
      <div className="flex flex-col gap-2.5">
        {pillars.map((p) => (
          <PillarCard key={p.id} pillar={p} />
        ))}
      </div>
    </div>
  );
}
