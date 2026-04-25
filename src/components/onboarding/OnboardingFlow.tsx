"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { RoleStep } from "@/components/onboarding/RoleStep";
import { IntentStep } from "@/components/onboarding/IntentStep";
import {
  getIntentRoute,
  getIntentsForRole,
  RoleIdSchema,
  type IntentId,
  type RoleId,
} from "@/lib/data/intents";
import type { Role } from "@/lib/types";

interface OnboardingFlowProps {
  roles: readonly Role[];
}

type Step = "role" | "intent";

export function OnboardingFlow({ roles }: OnboardingFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("role");
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId | undefined>();

  const selectedRole = useMemo(
    () => roles.find((role) => role.id === selectedRoleId),
    [roles, selectedRoleId],
  );
  const intents = selectedRoleId ? getIntentsForRole(selectedRoleId) : [];

  function selectRole(roleId: string) {
    const parsedRole = RoleIdSchema.safeParse(roleId);

    if (!parsedRole.success) {
      return;
    }

    setSelectedRoleId(parsedRole.data);
    setStep("intent");
  }

  function selectIntent(intentId: IntentId) {
    if (!selectedRoleId) {
      return;
    }

    const route = getIntentRoute(selectedRoleId, intentId);

    if (route) {
      router.push(route.href);
    }
  }

  return (
    <section
      className="rounded-xl border border-border-default bg-surface/80 p-4 md:p-5"
      aria-label="Role and intent onboarding"
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-text-muted font-heading">
            Enter the ecosystem
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-text-primary font-heading">
            {step === "role" ? "I am a..." : "I want to..."}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-text-muted">
            {step === "role"
              ? "Choose the lens that best matches your work in the RGV."
              : selectedRole
                ? `Showing paths for ${selectedRole.label}.`
                : "Choose the outcome you want next."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {step === "intent" ? (
            <button
              type="button"
              onClick={() => setStep("role")}
              className="min-h-11 rounded-lg border border-border2 px-3 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface2 hover:text-text-primary"
            >
              Back
            </button>
          ) : null}
          <Link
            href="/map"
            className="flex min-h-11 items-center rounded-lg border border-border2 px-3 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface2 hover:text-text-primary"
          >
            Skip, explore freely
          </Link>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className={`transition-all duration-300 ease-out ${
            step === "role"
              ? "translate-x-0 opacity-100"
              : "-translate-x-3 opacity-100"
          }`}
        >
          {step === "role" ? (
            <RoleStep
              roles={roles}
              selectedRoleId={selectedRoleId}
              onSelectRole={selectRole}
            />
          ) : (
            <IntentStep intents={intents} onSelectIntent={selectIntent} />
          )}
        </div>
      </div>
    </section>
  );
}
