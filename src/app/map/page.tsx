import { Suspense } from "react";
import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/ui/PageHeader";
import { ActorDirectory } from "@/components/actors/ActorDirectory";
import { getAllActors } from "@/lib/queries/actors";

export default function MapPage() {
  const actors = getAllActors();

  return (
    <main className="flex-1 py-7">
      <Shell>
        <PageHeader
          title="Ecosystem Map"
          subtitle={`${actors.length} actors across the Rio Grande Valley. Filter the list now; geographic map view comes later in Phase 2.`}
        />
        <Suspense fallback={<DirectoryFallback />}>
          <ActorDirectory actors={actors} />
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
