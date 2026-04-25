"use client";

import { useState } from "react";
import Link from "next/link";
import type { Journey, Role, Pillar } from "@/lib/types";
import { PillarLink } from "./PillarLink";

interface JourneyViewProps {
  journey: Journey;
  role: Role;
  pillarMap: Record<number, Pillar>;
}

export function JourneyView({ journey, role, pillarMap }: JourneyViewProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const currentStep =
    activeStep !== null ? journey.steps[activeStep] : undefined;

  return (
    <div>
      {/* Role badge + title */}
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold font-heading"
          style={{ background: role.colors.bg, color: role.colors.fg }}
        >
          {role.initials}
        </div>
        <span className="text-xs text-text-muted">{role.label}</span>
      </div>
      <h1 className="font-heading text-xl font-bold text-text-primary mb-1">
        {journey.title}
      </h1>
      <p className="text-[13px] text-text-muted mb-5 leading-relaxed">
        Your four-base progression through the RGV ecosystem — from foundation
        to full impact. Click each base to see your strategy.
      </p>

      {/* Step bar */}
      <div className="flex flex-col overflow-hidden rounded-[10px] border border-border-default md:flex-row">
        {journey.steps.map((step, i) => (
          <button
            key={step.base}
            onClick={() => setActiveStep(activeStep === i ? null : i)}
            className={`relative min-h-11 min-w-0 flex-1 cursor-pointer border-b border-border-default bg-surface p-3 text-left transition-colors last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 ${
              activeStep === i ? "bg-surface2" : "hover:bg-surface2"
            }`}
          >
            <div className="text-[10px] font-semibold text-gold tracking-wider uppercase font-heading mb-1">
              {step.base}
            </div>
            <div className="text-[11px] font-medium text-text-primary leading-tight">
              {step.label}
            </div>
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {step.pillars.map((pid) => {
                const p = pillarMap[pid];
                return (
                  <span
                    key={pid}
                    className="rounded-full border border-border-default bg-surface2 px-1.5 py-0.5 text-[10px] text-text-muted"
                  >
                    {p?.name ?? `Pillar ${pid}`}
                  </span>
                );
              })}
            </div>
            {activeStep === i && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
            )}
          </button>
        ))}
      </div>

      {/* Step detail */}
      {currentStep ? (
        <div className="bg-surface border border-border2 rounded-[10px] p-4 mt-3">
          <div className="text-[10px] font-semibold text-text-muted tracking-widest uppercase font-heading mb-2">
            {currentStep.base} — Strategy
          </div>
          <p className="text-[13px] text-text-secondary leading-[1.7]">
            {currentStep.strategy}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
            {currentStep.pillars.map((pid) => {
              const p = pillarMap[pid];
              return p ? <PillarLink key={pid} pillar={p} /> : null;
            })}
          </div>
        </div>
      ) : (
        <div className="text-center text-[11px] text-text-muted py-3 opacity-70">
          Click any base above to reveal your strategy
        </div>
      )}

      {/* Footer nav */}
      <div className="mt-4 flex flex-col gap-2 border-t border-border-default pt-3.5 sm:flex-row sm:justify-between">
        <Link
          href="/journeys"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border2 px-4 text-xs text-text-muted transition-colors hover:border-text-muted hover:text-text-primary"
        >
          &larr; Change role
        </Link>
        <Link
          href="/map"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border2 px-4 text-xs text-text-muted transition-colors hover:border-text-muted hover:text-text-primary"
        >
          Explore full map &rarr;
        </Link>
      </div>
    </div>
  );
}
