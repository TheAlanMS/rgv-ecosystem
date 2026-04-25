import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/ui/PageHeader";

export default function SubmitPage() {
  return (
    <main className="flex-1 py-7">
      <Shell>
        <PageHeader
          title="Submit or Correct"
          subtitle="Help make the ecosystem map more complete and accurate. All submissions are reviewed before publication."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          <SubmitOption
            title="Suggest an Organization"
            description="Know an actor that should be on the map? Submit their details and we'll review within 5 business days."
          />
          <SubmitOption
            title="Correct a Listing"
            description="See something inaccurate? Let us know what's wrong and what the correct information should be."
          />
          <SubmitOption
            title="Flag a Gap"
            description="Notice a missing type of actor in a specific county? Flag it and we'll add it to the Gap Registry."
          />
        </div>

        <div className="bg-surface border border-border-default rounded-[10px] p-5">
          <h2 className="font-heading text-sm font-semibold text-text-primary mb-2">
            How submissions work
          </h2>
          <ol className="space-y-2 text-sm text-text-secondary leading-relaxed">
            <li>
              <span className="text-gold font-medium">1.</span> You submit
              details via the form (name, email, and relevant information).
            </li>
            <li>
              <span className="text-gold font-medium">2.</span> Our team
              reviews the submission within 5 business days.
            </li>
            <li>
              <span className="text-gold font-medium">3.</span> If approved,
              the entry goes live with a &quot;Community Added&quot; badge for
              90 days.
            </li>
            <li>
              <span className="text-gold font-medium">4.</span> If declined,
              you receive a clear explanation and alternative suggestions.
            </li>
          </ol>
          <p className="text-xs text-text-muted mt-4">
            Submission forms are coming in a future update. For now, email
            submissions to the FLI team directly.
          </p>
        </div>
      </Shell>
    </main>
  );
}

function SubmitOption({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-surface border border-border-default rounded-[10px] p-4">
      <h3 className="font-heading text-[13px] font-semibold text-text-primary mb-1.5">
        {title}
      </h3>
      <p className="text-xs text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}
