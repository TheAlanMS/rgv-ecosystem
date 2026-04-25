"use client";

import dynamic from "next/dynamic";
import type { Actor, Gap } from "@/lib/types";

interface EcosystemMapProps {
  actors: readonly Actor[];
  gaps: readonly Gap[];
}

const LeafletEcosystemMap = dynamic(
  () =>
    import("./LeafletEcosystemMap").then((module) => module.LeafletEcosystemMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[22rem] items-center justify-center rounded-lg border border-border-default bg-surface text-sm text-text-muted sm:h-[28rem] md:h-[36rem]">
        Loading map...
      </div>
    ),
  },
);

export function EcosystemMap({ actors, gaps }: EcosystemMapProps) {
  return <LeafletEcosystemMap actors={actors} gaps={gaps} />;
}
