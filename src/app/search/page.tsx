import { Suspense } from "react";
import { Shell } from "@/components/layout/Shell";
import { SearchPageContent } from "@/components/search/SearchPageContent";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllActors } from "@/lib/queries/actors";
import { getAllPillars } from "@/lib/queries/pillars";

export default function SearchPage() {
  const actors = getAllActors();
  const pillars = getAllPillars();

  return (
    <main className="flex-1 py-7">
      <Shell>
        <PageHeader
          title="Search"
          subtitle="Find organizations, ecosystem pillars, services, counties, and gaps across the Rio Grande Valley."
        />
        <Suspense fallback={<SearchFallback />}>
          <SearchPageContent actors={actors} pillars={pillars} />
        </Suspense>
      </Shell>
    </main>
  );
}

function SearchFallback() {
  return (
    <div className="rounded-xl border border-border-default bg-surface p-6 text-sm text-text-muted">
      Loading search...
    </div>
  );
}
