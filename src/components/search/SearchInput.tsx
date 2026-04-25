"use client";

import { useEffect, useId, useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  compact?: boolean;
  autoFocus?: boolean;
  onDismiss?: () => void;
  onSubmit?: (value: string) => void;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search the ecosystem",
  label = "Search",
  compact = false,
  autoFocus = false,
  onDismiss,
  onSubmit,
}: SearchInputProps) {
  const inputId = useId();
  const [draftValue, setDraftValue] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (draftValue !== value) {
        onChange(draftValue);
      }
    }, 200);

    return () => window.clearTimeout(timeout);
  }, [draftValue, onChange, value]);

  return (
    <form
      className="w-full"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onChange(draftValue);
        onSubmit?.(draftValue);
      }}
    >
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div
        className={[
          "flex items-center gap-2 rounded-lg border border-border-default bg-surface2 px-3 transition-colors focus-within:border-accent",
          compact ? "min-h-11" : "min-h-12",
        ].join(" ")}
      >
        <span className="text-sm text-text-muted" aria-hidden="true">
          /
        </span>
        <input
          id={inputId}
          type="search"
          value={draftValue}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={(event) => setDraftValue(event.target.value)}
          className="min-h-11 min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
        />
        {draftValue ? (
          <button
            type="button"
            onClick={() => {
              setDraftValue("");
              onChange("");
            }}
            className="min-h-11 rounded-md border border-border2 px-3 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
            aria-label="Clear search"
          >
            Clear
          </button>
        ) : null}
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="min-h-11 rounded-md border border-border2 px-3 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
            aria-label="Close search"
          >
            Close
          </button>
        ) : null}
      </div>
    </form>
  );
}
