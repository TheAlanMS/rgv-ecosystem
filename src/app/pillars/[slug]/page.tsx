import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { PillarDetail } from "@/components/pillars/PillarDetail";
import { getAllPillars, getPillarBySlug } from "@/lib/queries/pillars";
import { getActorsByPillar } from "@/lib/queries/actors";
import Link from "next/link";

interface PillarPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPillars().map((p) => ({ slug: p.slug }));
}

export default async function PillarPage({ params }: PillarPageProps) {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);

  if (!pillar) {
    notFound();
  }

  const actors = getActorsByPillar(pillar.id);

  return (
    <main className="flex-1 py-7">
      <Shell>
        <div className="mb-4">
          <Link
            href="/pillars"
            className="text-xs text-text-muted hover:text-text-secondary transition-colors"
          >
            &larr; All Pillars
          </Link>
        </div>
        <PillarDetail pillar={pillar} actors={actors} />
      </Shell>
    </main>
  );
}
