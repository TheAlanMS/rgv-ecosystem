import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/ui/PageHeader";

export default function GovernancePage() {
  return (
    <main className="flex-1 py-7">
      <Shell>
        <PageHeader
          title="About & Governance"
          subtitle="How this platform is governed, who stewards the data, and the principles that guide every decision."
        />

        <div className="space-y-6">
          <Section title="Platform Purpose">
            <p>
              The RGV Innovation Ecosystem Cardinal Map is a community-owned
              digital platform that makes the Rio Grande Valley innovation
              ecosystem legible, navigable, and self-reinforcing. It is not a
              pitch deck, static directory, or gated marketplace. It is shared
              infrastructure — a living, navigable map of the ecosystem that
              shows actors, gaps, pathways, and opportunities across the
              region.
            </p>
          </Section>

          <Section title="Founding Operator">
            <p>
              Frontera Leadership Institute (FLI) and LMNTS serve as founding
              operators during V1. This is a trust-based custodial role, not
              ownership. FLI is responsible for initial data curation,
              moderation, and editorial decisions. The platform is designed to
              transition to broader community governance as it matures.
            </p>
          </Section>

          <Section title="Data Ownership">
            <p>
              The data belongs to the community. All data is licensed under{" "}
              <span className="text-gold">
                Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)
              </span>
              . Anyone may use, copy, redistribute, and build upon the data.
              Derivative works must credit the RGV Innovation Ecosystem Map
              and use the same license. Commercial use is permitted under
              these conditions.
            </p>
          </Section>

          <Section title="Editorial Review">
            <p>
              Anyone can submit — not everything is published without review.
              Submissions are evaluated against four criteria: the
              organization exists and is verifiable, it genuinely operates in
              or for the RGV ecosystem, the profile is accurate and not
              promotional, and it does not duplicate an existing listing
              without meaningful distinction.
            </p>
          </Section>

          <Section title="Moderation Principles">
            <ul className="space-y-1.5">
              <li>
                &middot; Accountability through named submissions and annual
                verification
              </li>
              <li>&middot; All decisions documented and auditable</li>
              <li>
                &middot; Any actor may request removal at any time
              </li>
              <li>
                &middot; No preference given to affiliated organizations in
                listings or placement
              </li>
              <li>
                &middot; Conflict of interest: operators and future advisory
                board members must recuse from decisions involving
                organizations with whom they have financial or significant
                personal relationships
              </li>
            </ul>
          </Section>

          <Section title="Open Source">
            <p>
              The platform codebase is open source. The community can fork,
              audit, and extend it. Transparency in how the platform works is
              a foundational commitment.
            </p>
          </Section>

          <Section title="Future Governance (V2)">
            <p>
              V2 will introduce a Community Advisory Board (CAB) drawn from
              the I2E Council on Innovation model. The CAB will include
              representatives from multiple player types — at minimum one
              funder, one EDO, one academic institution, one founder, and one
              policy/government representative. The CAB meets quarterly and
              has authority to recommend governance changes.
            </p>
          </Section>
        </div>
      </Shell>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface border border-border-default rounded-[10px] p-5">
      <h2 className="font-heading text-sm font-semibold text-text-primary mb-2">
        {title}
      </h2>
      <div className="text-sm text-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  );
}
