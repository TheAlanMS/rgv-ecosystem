import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { PillarDiagnostic } from "@/components/pillars/PillarDiagnostic";
import { getAllRoles } from "@/lib/queries/journeys";
import { getActorCount } from "@/lib/queries/actors";
import { getAllPillars } from "@/lib/queries/pillars";

export default function HomePage() {
  const roles = getAllRoles();
  const actorCount = getActorCount();
  const pillarCount = getAllPillars().length;

  return (
    <main className="flex-1 py-7">
      <Shell>
        {/* Hero */}
        <div className="text-center py-10 mb-8">
          <h1 className="font-heading text-3xl font-bold text-gold mb-3 tracking-tight">
            RGV Innovation Ecosystem
          </h1>
          <p className="text-text-secondary text-sm mb-1">
            Cardinal Map — Rio Grande City to Brownsville
          </p>
          <p className="text-text-muted text-xs mb-8 max-w-md mx-auto leading-relaxed">
            {pillarCount} pillars &middot; {actorCount} actors &middot; A
            community-owned map of the region&apos;s innovation infrastructure
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/map"
              className="bg-gold text-bg font-heading text-[13px] font-semibold px-7 py-2.5 rounded-lg hover:bg-gold2 transition-colors tracking-wide"
            >
              Explore the Map
            </Link>
            <Link
              href="/journeys"
              className="border border-border2 text-text-muted font-heading text-[13px] px-7 py-2.5 rounded-lg hover:text-text-primary hover:border-text-muted transition-colors"
            >
              Find Your Path
            </Link>
          </div>
        </div>

        {/* Diagnostic */}
        <PillarDiagnostic />

        {/* Role entry */}
        <div className="mt-8">
          <OnboardingFlow roles={roles} />
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mt-8">
          <QuickLink href="/pillars" label="10 Pillars" desc="Explore the I2E framework" />
          <QuickLink href="/ecosystem-health" label="Ecosystem Health" desc="Gaps, metrics, data quality" />
          <QuickLink href="/governance" label="Governance" desc="How this platform is governed" />
        </div>
      </Shell>
    </main>
  );
}

function QuickLink({
  href,
  label,
  desc,
}: {
  href: string;
  label: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="bg-surface border border-border-default rounded-[10px] p-4 transition-colors hover:border-border2 hover:bg-surface2"
    >
      <div className="text-[13px] font-medium text-text-primary font-heading mb-0.5">
        {label}
      </div>
      <div className="text-[11px] text-text-muted">{desc}</div>
    </Link>
  );
}
