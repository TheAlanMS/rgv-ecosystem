"use client";

import type { Actor, Pillar } from "@/lib/types";
import { PillarAccordionItem } from "./PillarAccordionItem";

interface PillarAccordionProps {
  pillars: readonly Pillar[];
  actors: readonly Actor[];
}

export function PillarAccordion({ pillars, actors }: PillarAccordionProps) {
  return (
    <div className="space-y-2.5">
      {pillars.map((pillar) => (
        <PillarAccordionItem
          key={pillar.id}
          pillar={pillar}
          actors={actors.filter((actor) => actor.pillars.includes(pillar.id))}
        />
      ))}
    </div>
  );
}
