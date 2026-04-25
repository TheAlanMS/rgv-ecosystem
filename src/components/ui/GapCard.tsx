interface GapCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GapCard({ children, className = "" }: GapCardProps) {
  return (
    <div
      className={`bg-surface border border-dashed border-border2 rounded-lg p-3 opacity-65 ${className}`}
    >
      <div className="text-[10px] font-semibold text-terra2 uppercase tracking-wide mb-1">
        Gap
      </div>
      {children}
    </div>
  );
}
