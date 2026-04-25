import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillarDiagnostic } from "@/components/pillars/PillarDiagnostic";
import { PillarGrid } from "@/components/pillars/PillarGrid";

export default function PillarsPage() {
  return (
    <main className="flex-1 py-7">
      <Shell>
        <PageHeader
          title="The 10 Pillars"
          subtitle="The I2E framework maps innovation ecosystems across ten structural pillars — from talent supply through demand-side customers, with infrastructure underneath."
        />
        <PillarDiagnostic />
        <div className="flex gap-4 flex-wrap mb-4">
          <Legend color="var(--supply-fg)" label="Supply side" />
          <Legend color="var(--engine-fg)" label="The engine" />
          <Legend color="var(--demand-fg)" label="Demand side" />
          <Legend color="var(--infra-fg)" label="Infrastructure" />
        </div>
        <PillarGrid />
      </Shell>
    </main>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </div>
  );
}
