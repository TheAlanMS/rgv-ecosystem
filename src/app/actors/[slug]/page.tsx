import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { ActorProfile } from "@/components/actors/ActorProfile";
import { getAllActors, getActorBySlug } from "@/lib/queries/actors";
import Link from "next/link";

interface ActorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllActors()
    .filter((a) => a.status !== "Gap")
    .map((a) => ({ slug: a.slug }));
}

export default async function ActorPage({ params }: ActorPageProps) {
  const { slug } = await params;
  const actor = getActorBySlug(slug);

  if (!actor) {
    notFound();
  }

  return (
    <main className="flex-1 py-7">
      <Shell>
        <div className="mb-4">
          <Link
            href="/map"
            className="text-xs text-text-muted hover:text-text-secondary transition-colors"
          >
            &larr; All Actors
          </Link>
        </div>
        <ActorProfile actor={actor} />
      </Shell>
    </main>
  );
}
