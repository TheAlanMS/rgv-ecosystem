import type { Actor, Pillar } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { PILLAR_GROUP_LABELS, STAGE_LABELS } from "@/lib/types";
import { getPillarById } from "@/lib/queries/pillars";
import Link from "next/link";

interface ActorProfileProps {
  actor: Actor;
}

export function ActorProfile({ actor }: ActorProfileProps) {
  const pillars = actor.pillars
    .map((id) => getPillarById(id))
    .filter((p): p is Pillar => p !== undefined);

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="font-heading text-lg font-semibold text-text-primary">
            {actor.name}
          </h1>
          <div className="text-sm text-text-muted mt-0.5">
            {actor.orgType} &middot; {actor.city}, {actor.county}
          </div>
        </div>
        <StatusBadge status={actor.status} />
      </div>

      <p className="text-sm text-text-secondary leading-relaxed mb-6">
        {actor.description}
      </p>

      {/* Pillars */}
      <Section label="Pillars">
        <div className="flex flex-wrap gap-2">
          {pillars.map((p) => (
            <Link key={p.id} href={`/pillars/${p.slug}`}>
              <Tag group={p.group}>
                {p.id}. {p.name} — {PILLAR_GROUP_LABELS[p.group]}
              </Tag>
            </Link>
          ))}
        </div>
      </Section>

      {/* What they offer */}
      <Section label="What they offer">
        <ul className="space-y-1">
          {actor.whatTheyOffer.map((item) => (
            <li
              key={item}
              className="text-sm text-text-secondary before:content-['·'] before:mr-2 before:text-text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Who they serve */}
      <Section label="Who they serve">
        <div className="flex flex-wrap gap-1.5">
          {actor.whoTheyServe.map((role) => (
            <span
              key={role}
              className="text-[10px] px-2 py-0.5 rounded-full bg-surface2 border border-border-default text-text-muted"
            >
              {role}
            </span>
          ))}
        </div>
      </Section>

      {/* Stages served */}
      {actor.stagesServed && actor.stagesServed.length > 0 && (
        <Section label="Stages served">
          <div className="flex flex-wrap gap-1.5">
            {actor.stagesServed.map((stage) => (
              <span
                key={stage}
                className="text-[10px] px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20 text-gold2"
              >
                {STAGE_LABELS[stage]}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Outside RGV connection */}
      {actor.rgvConnection && (
        <Section label="RGV Connection">
          <p className="text-sm text-text-secondary">{actor.rgvConnection}</p>
        </Section>
      )}

      {/* System metadata */}
      <div className="mt-8 pt-4 border-t border-border-default">
        <div className="flex flex-wrap gap-4 text-[10px] text-text-muted">
          <span>Added: {actor.dateAdded}</span>
          <span>Verified: {actor.lastVerified}</span>
          <span>By: {actor.verifiedBy}</span>
          {actor.communitySubmitted && (
            <span className="text-gold">Community submitted</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="text-[10px] font-medium text-text-muted uppercase tracking-wide mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}
