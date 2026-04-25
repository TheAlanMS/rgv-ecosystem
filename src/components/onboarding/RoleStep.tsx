import type { Role } from "@/lib/types";

interface RoleStepProps {
  roles: readonly Role[];
  selectedRoleId?: string;
  onSelectRole: (roleId: string) => void;
}

export function RoleStep({ roles, selectedRoleId, onSelectRole }: RoleStepProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {roles.map((role) => {
        const selected = role.id === selectedRoleId;

        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onSelectRole(role.id)}
            className={`min-h-28 rounded-lg border p-3 text-left transition-colors hover:bg-surface2 ${
              selected
                ? "border-gold bg-surface2"
                : "border-border-default bg-surface"
            }`}
            aria-pressed={selected}
          >
            <span
              className="mb-2 flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold font-heading"
              style={{ background: role.colors.bg, color: role.colors.fg }}
            >
              {role.initials}
            </span>
            <span className="block text-[13px] font-semibold text-text-primary font-heading">
              {role.label}
            </span>
            <span className="mt-1 block text-[11px] leading-snug text-text-muted">
              {role.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
