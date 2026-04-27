import { auth } from "@clerk/nextjs/server";
import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/ui/PageHeader";
import { getActorCount } from "@/lib/queries/actors";
import { getAllPillars } from "@/lib/queries/pillars";

export default async function AdminPage() {
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) {
    return redirectToSignIn({ returnBackUrl: "/admin" });
  }

  const actorCount = getActorCount();
  const pillarCount = getAllPillars().length;

  return (
    <main className="flex-1 py-7">
      <Shell>
        <PageHeader
          title="Admin"
          subtitle="Review ecosystem data operations before they become public."
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <MetricCard label="Current actors" value={actorCount.toString()} />
          <MetricCard label="Pillars" value={pillarCount.toString()} />
          <MetricCard label="Pending reviews" value="0" />
        </div>

        <section className="mt-8 rounded-[10px] border border-border-default bg-surface p-5">
          <h2 className="font-heading text-sm font-semibold text-text-primary">
            Moderation queue
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Submitted organizations, listing corrections, and gap flags will
            appear here after Clerk roles are connected to Convex moderation
            mutations.
          </p>
        </section>
      </Shell>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] border border-border-default bg-surface p-4">
      <div className="text-xs font-medium uppercase tracking-widest text-text-muted">
        {label}
      </div>
      <div className="mt-2 font-heading text-3xl font-bold text-gold">
        {value}
      </div>
    </div>
  );
}
