import { Suspense } from "react";
import { Shell } from "@/components/layout/Shell";
import { MapPageContent } from "@/components/map/MapPageContent";
import { PageHeader } from "@/components/ui/PageHeader";
import { ALL_GAPS } from "@/lib/data/gaps";
import { getAllActors } from "@/lib/queries/actors";

export default function MapPage() {
  const actors = getAllActors();

  return (
    <main className="flex-1 py-7">
      <Shell>
        <PageHeader
          title="Ecosystem Map"
          subtitle={`${actors.length} actors across the Rio Grande Valley. Filter the ecosystem once, then switch between list and geographic map views.`}
        />
        <Suspense fallback={<DirectoryFallback />}>
          <MapPageContent actors={actors} gaps={ALL_GAPS} />
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
