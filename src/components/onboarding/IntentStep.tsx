import type { Intent, IntentId } from "@/lib/data/intents";

interface IntentStepProps {
  intents: readonly Intent[];
  onSelectIntent: (intentId: IntentId) => void;
}

export function IntentStep({ intents, onSelectIntent }: IntentStepProps) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      {intents.map((intent) => (
        <button
          key={intent.id}
          type="button"
          aria-pressed="false"
          onClick={() => onSelectIntent(intent.id)}
          className="min-h-28 rounded-lg border border-border-default bg-surface p-3 text-left transition-colors hover:border-border2 hover:bg-surface2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gold font-heading">
            {intent.prompt}
          </span>
          <span className="mt-2 block text-[13px] font-semibold text-text-primary font-heading">
            {intent.label}
          </span>
          <span className="mt-1 block text-[11px] leading-snug text-text-muted">
            {intent.description}
          </span>
        </button>
      ))}
    </div>
  );
}
