"use client";

import { useId, useState } from "react";
import { ActorCard } from "@/components/actors/ActorCard";
import { Tag } from "@/components/ui/Tag";
import type { Actor, Pillar } from "@/lib/types";
import { PILLAR_GROUP_LABELS } from "@/lib/types";
import { pluralize } from "@/lib/utils/format";

interface PillarAccordionItemProps {
  pillar: Pillar;
  actors: readonly Actor[];
}

export function PillarAccordionItem({
  pillar,
  actors,
}: PillarAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <section className="overflow-hidden rounded-lg border border-border-default bg-surface transition-colors hover:border-border2">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-20 w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="min-w-0">
          <span className="mb-1.5 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
              Pillar {pillar.id}
            </span>
            <Tag group={pillar.group}>{PILLAR_GROUP_LABELS[pillar.group]}</Tag>
          </span>
          <span className="block font-heading text-sm font-semibold leading-tight text-text-primary">
            {pillar.name}
          </span>
          <span className="mt-1 block text-xs text-text-muted">
            {pillar.capacity}
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-2">
          <span className="rounded-full border border-border-default bg-surface2 px-2.5 py-1 text-xs font-semibold text-text-secondary">
            {pluralize(actors.length, "actor")}
          </span>
          <span
            aria-hidden="true"
            className={`grid h-8 w-8 place-items-center rounded-md border border-border-default text-text-muted transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </span>
      </button>

      <div
        id={contentId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-border-default px-4 py-3">
            {actors.length > 0 ? (
              <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                {actors.map((actor) => (
                  <ActorCard key={actor.id} actor={actor} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border2 bg-surface2 px-4 py-5 text-center text-sm text-text-muted">
                No matching actors
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
