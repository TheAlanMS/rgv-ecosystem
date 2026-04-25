import Link from "next/link";
import type { Role } from "@/lib/types";

interface RoleSelectorProps {
  roles: readonly Role[];
}

export function RoleSelector({ roles }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
      {roles.map((role) => (
        <Link
          key={role.id}
          href={`/journeys/${role.id}`}
          className="flex gap-3 items-start bg-surface border border-border-default rounded-[10px] p-3.5 transition-colors hover:border-border2 hover:bg-surface2"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold font-heading shrink-0"
            style={{ background: role.colors.bg, color: role.colors.fg }}
          >
            {role.initials}
          </div>
          <div>
            <div className="text-[13px] font-medium text-text-primary font-heading">
              {role.label}
            </div>
            <div className="text-[11px] text-text-muted mt-0.5 leading-snug">
              {role.description}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
