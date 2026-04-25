"use client";

export type MapViewMode = "list" | "map" | "pillar";

interface MapToggleProps {
  value: MapViewMode;
  onChange: (value: MapViewMode) => void;
}

const OPTIONS: Array<{
  value: MapViewMode;
  label: string;
  icon: "list" | "map" | "pillar";
}> = [
  { value: "list", label: "List", icon: "list" },
  { value: "map", label: "Map", icon: "map" },
  { value: "pillar", label: "By Pillar", icon: "pillar" },
];

export function MapToggle({ value, onChange }: MapToggleProps) {
  return (
    <div className="inline-flex w-full rounded-lg border border-border-default bg-surface p-1 sm:w-auto">
      {OPTIONS.map(({ value: optionValue, label, icon }) => {
        const isActive = value === optionValue;

        return (
          <button
            key={optionValue}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(optionValue)}
            className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md px-3 text-xs font-semibold transition-colors sm:flex-none ${
              isActive
                ? "bg-surface2 text-text-primary"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <ToggleIcon icon={icon} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function ToggleIcon({ icon }: { icon: "list" | "map" | "pillar" }) {
  if (icon === "map") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15" />
        <path d="M15 6v15" />
      </svg>
    );
  }

  if (icon === "pillar") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 5h16" />
        <path d="M4 12h16" />
        <path d="M4 19h16" />
        <path d="m8 8 2-3 2 3" />
        <path d="m14 15 2 3 2-3" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </svg>
  );
}
