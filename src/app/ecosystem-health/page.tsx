import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillarDiagnostic } from "@/components/pillars/PillarDiagnostic";
import { getOpenGaps } from "@/lib/queries/gaps";
import { getActorCount, getActiveActorCount } from "@/lib/queries/actors";

export default function EcosystemHealthPage() {
  const openGaps = getOpenGaps();
  const totalActors = getActorCount();
  const activeActors = getActiveActorCount();

  return (
    <main className="flex-1 py-7">
      <Shell>
        <PageHeader
          title="Ecosystem Health"
          subtitle="A diagnostic view of the RGV innovation ecosystem — pillar strength, known gaps, and data quality."
        />

        <PillarDiagnostic />

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-6">
          <MetricCard label="Total actors mapped" value={totalActors} />
          <MetricCard label="Active actors" value={activeActors} />
          <MetricCard
            label="Open gaps"
            value={openGaps.length}
            variant="gap"
          />
        </div>

        {/* Gap registry */}
        <div className="text-[10px] font-semibold text-text-muted tracking-widest uppercase font-heading mb-2.5">
          Gap Registry
        </div>
        <div className="space-y-2">
          {openGaps.map((gap) => (
            <div
              key={gap.id}
              className="bg-surface border border-dashed border-border2 rounded-lg p-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-semibold text-terra2 uppercase tracking-wide">
                  Pillar {gap.pillar}
                </span>
                <span className="text-[10px] text-text-muted">
                  {gap.county}
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {gap.description}
              </p>
            </div>
          ))}
        </div>
      </Shell>
    </main>
  );
}

function MetricCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant?: "gap";
}) {
  return (
    <div className="bg-surface border border-border-default rounded-[10px] p-4">
      <div
        className={`text-[10px] font-medium uppercase tracking-wide mb-1 ${
          variant === "gap" ? "text-terra2" : "text-text-muted"
        }`}
      >
        {label}
      </div>
      <div
        className={`text-2xl font-heading font-bold ${
          variant === "gap" ? "text-terra2" : "text-text-primary"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
