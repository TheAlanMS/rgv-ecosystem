import Link from "next/link";
import { ActorCard } from "@/components/actors/ActorCard";
import { PillarCard } from "@/components/pillars/PillarCard";
import type { Actor, Pillar } from "@/lib/types";

interface SearchResultsProps {
  query: string;
  actors: readonly Actor[];
  pillars: readonly Pillar[];
  totalActorCount: number;
}

export function SearchResults({
  query,
  actors,
  pillars,
  totalActorCount,
}: SearchResultsProps) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return (
      <div className="rounded-xl border border-border-default bg-surface p-6">
        <h2 className="font-heading text-base font-semibold text-text-primary">
          Search across the RGV ecosystem
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
          Find organizations, ecosystem pillars, support offerings, founder stages,
          counties, and service populations.
        </p>
      </div>
    );
  }

  if (actors.length === 0 && pillars.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border2 bg-surface p-6 text-center">
        <h2 className="font-heading text-base font-semibold text-text-primary">
          No results found for &quot;{normalizedQuery}&quot;
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-text-muted">
          Try broadening the search or submit a missing ecosystem actor for review.
        </p>
        <Link
          href="/submit"
          className="mt-4 inline-flex min-h-10 items-center rounded-lg border border-border2 px-4 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface2 hover:text-text-primary"
        >
          Submit an actor
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <section className="space-y-2" aria-labelledby="actor-results-heading">
        <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="actor-results-heading"
              className="font-heading text-base font-semibold text-text-primary"
            >
              Actors
            </h2>
            <p className="text-xs text-text-muted">
              Showing {actors.length} of {totalActorCount} actors after search and filters.
            </p>
          </div>
        </div>
        {actors.length > 0 ? (
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {actors.map((actor) => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border2 bg-surface p-5 text-sm text-text-muted">
            No actors match this search within the active filters.
          </div>
        )}
      </section>

      <section className="space-y-2" aria-labelledby="pillar-results-heading">
        <h2
          id="pillar-results-heading"
          className="font-heading text-base font-semibold text-text-primary"
        >
          Pillars ({pillars.length})
        </h2>
        {pillars.length > 0 ? (
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.id} pillar={pillar} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border2 bg-surface p-5 text-sm text-text-muted">
            No pillars match this search.
          </div>
        )}
      </section>
    </div>
  );
}
