import { ALL_PILLARS } from "@/lib/data/pillars";
import type { Actor, Gap, Pillar } from "@/lib/types";

interface ScoredResult<T> {
  item: T;
  score: number;
  index: number;
}

export function searchActors(query: string, actors: readonly Actor[]): Actor[] {
  const terms = tokenizeQuery(query);

  if (terms.length === 0) {
    return [...actors];
  }

  return scoreAndSort(actors, terms, getActorSearchFields);
}

export function searchPillars(query: string, pillars: readonly Pillar[]): Pillar[] {
  const terms = tokenizeQuery(query);

  if (terms.length === 0) {
    return [...pillars];
  }

  return scoreAndSort(pillars, terms, getPillarSearchFields);
}

export function searchGaps(query: string, gaps: readonly Gap[]): Gap[] {
  const terms = tokenizeQuery(query);

  if (terms.length === 0) {
    return [...gaps];
  }

  return scoreAndSort(gaps, terms, getGapSearchFields);
}

function scoreAndSort<T>(
  items: readonly T[],
  terms: readonly string[],
  getFields: (item: T) => readonly string[],
): T[] {
  return items
    .map<ScoredResult<T>>((item, index) => ({
      item,
      score: scoreFields(terms, getFields(item)),
      index,
    }))
    .filter((result) => result.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.index - right.index;
    })
    .map((result) => result.item);
}

function scoreFields(terms: readonly string[], fields: readonly string[]): number {
  return fields.reduce((score, field, fieldIndex) => {
    const normalizedField = normalizeText(field);
    const fieldWeight = fieldIndex === 0 ? 3 : 1;
    const matchedTerms = terms.filter((term) => normalizedField.includes(term));

    return score + matchedTerms.length * fieldWeight;
  }, 0);
}

function getActorSearchFields(actor: Actor): string[] {
  const actorPillars = ALL_PILLARS.filter((pillar) =>
    actor.pillars.includes(pillar.id),
  );

  return [
    actor.name,
    actor.description,
    actor.city,
    actor.county,
    actor.orgType,
    actor.status,
    actor.whatTheyOffer.join(" "),
    actor.whoTheyServe.join(" "),
    actor.stagesServed?.join(" ") ?? "",
    actor.industryFocus?.join(" ") ?? "",
    actor.rgvConnection ?? "",
    actor.websiteUrl ?? "",
    actor.thumbnailUrl ?? "",
    actor.pillarAssignments?.join(" ") ?? "",
    actor.internalNotes ?? "",
    actor.qaStatus ?? "",
    actorPillars
      .map((pillar) =>
        [
          `Pillar ${pillar.id}`,
          pillar.name,
          pillar.capacity,
          pillar.group,
          pillar.description,
        ].join(" "),
      )
      .join(" "),
  ];
}

function getPillarSearchFields(pillar: Pillar): string[] {
  return [
    pillar.name,
    pillar.description,
    pillar.capacity,
    pillar.group,
    pillar.status,
  ];
}

function getGapSearchFields(gap: Gap): string[] {
  const pillar = ALL_PILLARS.find((item) => item.id === gap.pillar);

  return [
    gap.id,
    gap.description,
    gap.county,
    gap.status,
    gap.flaggedBy,
    `Pillar ${gap.pillar}`,
    pillar
      ? [
          pillar.name,
          pillar.capacity,
          pillar.group,
          pillar.description,
          pillar.status,
        ].join(" ")
      : "",
  ];
}

function tokenizeQuery(query: string): string[] {
  return normalizeText(query)
    .split(/\s+/)
    .filter(Boolean);
}

function normalizeText(value: string): string {
  return value.trim().toLocaleLowerCase();
}
