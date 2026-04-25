import type { Status } from "@/lib/types";

const STATUS_STYLES: Record<Status, string> = {
  Active: "bg-green/15 text-green2 border-green/25",
  Emerging: "bg-gold/15 text-gold2 border-gold/25",
  Inactive: "bg-surface2 text-text-muted border-border2",
  Gap: "bg-[var(--gap-bg)] text-[var(--gap-fg)] border-[var(--gap-border)]",
};

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border tracking-wide ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
