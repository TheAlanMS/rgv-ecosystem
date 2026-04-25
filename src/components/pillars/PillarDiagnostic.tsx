export function PillarDiagnostic() {
  return (
    <div className="bg-surface border border-border-default rounded-[10px] p-4 mb-6">
      <div className="text-[10px] font-semibold text-text-muted tracking-widest uppercase font-heading mb-2.5">
        Ecosystem Diagnostic — RGV 2026
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        <DiagCell label="Strong pillars">
          Education, Communities, Customers, Policy, Accelerators
        </DiagCell>
        <DiagCell label="Critical gaps" variant="gap">
          Formal angel/venture capital &middot; Shared coordination platform
          &middot; PSP depth
        </DiagCell>
        <DiagCell label="Primary bottleneck">
          Capital infrastructure + ecosystem coordination layer
        </DiagCell>
      </div>
    </div>
  );
}

function DiagCell({
  label,
  children,
  variant,
}: {
  label: string;
  children: React.ReactNode;
  variant?: "gap";
}) {
  return (
    <div className="bg-surface2 border border-border-default rounded-lg p-2.5">
      <div
        className={`text-[10px] font-medium uppercase tracking-wide mb-1 ${
          variant === "gap" ? "text-terra2" : "text-text-muted"
        }`}
      >
        {label}
      </div>
      <div className="text-xs text-text-primary leading-snug">{children}</div>
    </div>
  );
}
