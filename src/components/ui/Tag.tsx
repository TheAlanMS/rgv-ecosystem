import type { PillarGroup } from "@/lib/types";

const GROUP_STYLES: Record<PillarGroup, string> = {
  supply:
    "bg-[var(--supply-bg)] text-[var(--supply-fg)] border-[var(--supply-border)]",
  engine:
    "bg-[var(--engine-bg)] text-[var(--engine-fg)] border-[var(--engine-border)]",
  demand:
    "bg-[var(--demand-bg)] text-[var(--demand-fg)] border-[var(--demand-border)]",
  infra:
    "bg-[var(--infra-bg)] text-[var(--infra-fg)] border-[var(--infra-border)]",
};

interface TagProps {
  group: PillarGroup;
  children: React.ReactNode;
}

export function Tag({ group, children }: TagProps) {
  return (
    <span
      className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border tracking-wide ${GROUP_STYLES[group]}`}
    >
      {children}
    </span>
  );
}
