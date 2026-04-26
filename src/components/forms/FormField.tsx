import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  helpText?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  helpText,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold text-text-secondary"
      >
        {label}
      </label>
      {children}
      {helpText ? (
        <p className="text-[11px] leading-relaxed text-text-muted">{helpText}</p>
      ) : null}
      {error ? (
        <p className="text-[11px] leading-relaxed text-red-700">{error}</p>
      ) : null}
    </div>
  );
}
