import { Suspense } from "react";
import { Shell } from "@/components/layout/Shell";
import { MapPageContent } from "@/components/map/MapPageContent";
import { PageHeader } from "@/components/ui/PageHeader";
import { ALL_GAPS } from "@/lib/data/gaps";
import { getAllActors } from "@/lib/queries/actors";
import { getAllPillars } from "@/lib/queries/pillars";

export default function MapPage() {
  const actors = getAllActors();
  const pillars = getAllPillars();

  return (
    <main className="flex-1 py-7">
      <Shell>
        <PageHeader
          title="Ecosystem Map"
          subtitle={`${actors.length} actors across the Rio Grande Valley. Filter the ecosystem once, then switch between list, geographic map, and pillar views.`}
        />
        <Suspense fallback={<DirectoryFallback />}>
          <MapPageContent actors={actors} gaps={ALL_GAPS} pillars={pillars} />
        </Suspense>
      </Shell>
    </main>
  );
}

function DirectoryFallback() {
  return (
    <div className="rounded-xl border border-border-default bg-surface p-6 text-sm text-text-muted">
      Loading filters...
    </div>
  );
}
