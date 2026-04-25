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
      <div className="flex rounded-[10px] overflow-hidden border border-border-default mb-0">
        {journey.steps.map((step, i) => (
          <button
            key={step.base}
            onClick={() => setActiveStep(activeStep === i ? null : i)}
            className={`flex-1 p-3 bg-surface border-r border-border-default last:border-r-0 cursor-pointer transition-colors text-left relative ${
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
                    className="text-[10px] px-1.5 py-0.5 rounded-full bg-surface2 text-text-muted border border-border-default whitespace-nowrap"
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
      <div className="flex justify-between mt-4 pt-3.5 border-t border-border-default">
        <Link
          href="/journeys"
          className="text-xs text-text-muted border border-border2 rounded-lg px-4 py-1.5 hover:text-text-primary hover:border-text-muted transition-colors"
        >
          &larr; Change role
        </Link>
        <Link
          href="/map"
          className="text-xs text-text-muted border border-border2 rounded-lg px-4 py-1.5 hover:text-text-primary hover:border-text-muted transition-colors"
        >
          Explore full map &rarr;
        </Link>
      </div>
    </div>
  );
}
