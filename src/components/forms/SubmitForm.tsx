"use client";

import { useMemo, useState, type FormEvent } from "react";
import { z } from "zod/v4";
import { ALL_PILLARS } from "@/lib/data";
import {
  COUNTY_LABELS,
  CountySchema,
  OrgTypeSchema,
  PILLAR_GROUP_LABELS,
  type County,
  type OrgType,
} from "@/lib/types";
import {
  SubmissionSchema,
  type CreateSubmissionInput,
  type SubmissionType,
} from "@/lib/types/submission";
import { FormField } from "./FormField";

type FormValues = Record<string, string>;
type FieldErrors = Record<string, string>;

const submissionTypes: Array<{ value: SubmissionType; label: string }> = [
  { value: "newListing", label: "New listing" },
  { value: "correction", label: "Correction" },
  { value: "gapFlag", label: "Gap flag" },
];

const baseInput =
  "w-full rounded-[8px] border border-border-default bg-background px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-gold";

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function zodFieldErrors(error: z.ZodError): FieldErrors {
  const fields: FieldErrors = {};

  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (path && !fields[path]) {
      fields[path] = issue.message;
    }
  }

  return fields;
}

export function SubmitForm() {
  const [type, setType] = useState<SubmissionType>("newListing");
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const countyOptions = useMemo(() => CountySchema.options, []);
  const orgTypeOptions = useMemo(() => OrgTypeSchema.options, []);

  function update(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function checkedPillars() {
    return Object.entries(values)
      .filter(([key, value]) => key.startsWith("pillar.") && value === "true")
      .map(([key]) => Number(key.replace("pillar.", "")));
  }

  function buildPayload(): CreateSubmissionInput {
    const submitter = {
      submitterName: values.submitterName ?? "",
      submitterEmail: values.submitterEmail ?? "",
    };

    if (type === "newListing") {
      return {
        type,
        ...submitter,
        organizationName: values.organizationName ?? "",
        orgType: values.orgType as OrgType,
        pillars: checkedPillars(),
        city: values.city ?? "",
        county: values.county as County,
        description: values.description ?? "",
        whatTheyOffer: lines(values.whatTheyOffer ?? ""),
        whoTheyServe: lines(values.whoTheyServe ?? ""),
        websiteUrl: values.websiteUrl ?? "",
        contactEmail: values.contactEmail ?? "",
      } as CreateSubmissionInput;
    }

    if (type === "correction") {
      return {
        type,
        ...submitter,
        actor: values.actor ?? "",
        issue: values.issue ?? "",
        correction: values.correction ?? "",
      };
    }

    const pillarId = Number(values.gapPillar ?? "0");
    const pillar = ALL_PILLARS.find((item) => item.id === pillarId);

    return {
      type,
      ...submitter,
      missingActorType: values.missingActorType ?? "",
      county: values.county as County,
      pillar: pillarId,
      pillarGroup: pillar?.group,
      whyItMatters: values.whyItMatters ?? "",
    } as CreateSubmissionInput;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage(null);

    const payload = buildPayload();
    const parsed = SubmissionSchema.safeParse(payload);

    if (!parsed.success) {
      setErrors(zodFieldErrors(parsed.error));
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = await response.json();

      if (!response.ok) {
        setServerMessage(body?.error?.message ?? "Submission failed.");
        setErrors(
          Object.fromEntries(
            Object.entries(body?.error?.fields ?? {}).map(([key, messages]) => [
              key,
              Array.isArray(messages) ? messages[0] : String(messages),
            ]),
          ),
        );
        setStatus("idle");
        return;
      }

      setStatus("success");
      setServerMessage(
        `Submission received for review. Confirmation sent to ${body.submission.submitterEmail}.`,
      );
    } catch {
      setServerMessage("Submission failed. Please check your connection and try again.");
      setStatus("idle");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-border-default rounded-[10px] p-4 md:p-5 space-y-5"
    >
      <div className="grid grid-cols-3 gap-2 rounded-[8px] bg-surface2 p-1">
        {submissionTypes.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              setType(option.value);
              setErrors({});
              setServerMessage(null);
              setStatus("idle");
            }}
            className={`rounded-[7px] px-3 py-2 text-xs font-semibold transition-colors ${
              type === option.value
                ? "bg-background text-text-primary shadow-sm"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {type === "newListing" ? (
          <NewListingFields
            values={values}
            errors={errors}
            update={update}
            countyOptions={countyOptions}
            orgTypeOptions={orgTypeOptions}
          />
        ) : null}
        {type === "correction" ? (
          <CorrectionFields values={values} errors={errors} update={update} />
        ) : null}
        {type === "gapFlag" ? (
          <GapFields
            values={values}
            errors={errors}
            update={update}
            countyOptions={countyOptions}
          />
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border-default pt-4">
        <FormField label="Your name" htmlFor="submitterName" error={errors.submitterName}>
          <input
            id="submitterName"
            className={baseInput}
            value={values.submitterName ?? ""}
            onChange={(event) => update("submitterName", event.target.value)}
          />
        </FormField>
        <FormField
          label="Private email"
          htmlFor="submitterEmail"
          helpText="Used only for review follow-up. It is not published."
          error={errors.submitterEmail}
        >
          <input
            id="submitterEmail"
            type="email"
            className={baseInput}
            value={values.submitterEmail ?? ""}
            onChange={(event) => update("submitterEmail", event.target.value)}
          />
        </FormField>
      </div>

      {serverMessage ? (
        <p
          className={`rounded-[8px] border px-3 py-2 text-sm ${
            status === "success"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {serverMessage}
        </p>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className="rounded-[8px] bg-text-primary px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-text-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting..." : "Submit for review"}
        </button>
      </div>
    </form>
  );
}

function NewListingFields({
  values,
  errors,
  update,
  countyOptions,
  orgTypeOptions,
}: {
  values: FormValues;
  errors: FieldErrors;
  update: (name: string, value: string) => void;
  countyOptions: readonly string[];
  orgTypeOptions: readonly string[];
}) {
  return (
    <>
      <FormField label="Organization name" htmlFor="organizationName" error={errors.organizationName}>
        <input id="organizationName" className={baseInput} value={values.organizationName ?? ""} onChange={(event) => update("organizationName", event.target.value)} />
      </FormField>
      <FormField label="Organization type" htmlFor="orgType" error={errors.orgType}>
        <select id="orgType" className={baseInput} value={values.orgType ?? ""} onChange={(event) => update("orgType", event.target.value)}>
          <option value="">Choose type</option>
          {orgTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </FormField>
      <FormField label="City" htmlFor="city" error={errors.city}>
        <input id="city" className={baseInput} value={values.city ?? ""} onChange={(event) => update("city", event.target.value)} />
      </FormField>
      <CountySelect values={values} errors={errors} update={update} countyOptions={countyOptions} />
      <PillarCheckboxes values={values} errors={errors} update={update} />
      <FormField label="Description" htmlFor="description" error={errors.description}>
        <textarea id="description" className={baseInput} rows={4} value={values.description ?? ""} onChange={(event) => update("description", event.target.value)} />
      </FormField>
      <FormField label="What they offer" htmlFor="whatTheyOffer" helpText="One offering per line." error={errors.whatTheyOffer}>
        <textarea id="whatTheyOffer" className={baseInput} rows={4} value={values.whatTheyOffer ?? ""} onChange={(event) => update("whatTheyOffer", event.target.value)} />
      </FormField>
      <FormField label="Who they serve" htmlFor="whoTheyServe" helpText="One audience per line." error={errors.whoTheyServe}>
        <textarea id="whoTheyServe" className={baseInput} rows={4} value={values.whoTheyServe ?? ""} onChange={(event) => update("whoTheyServe", event.target.value)} />
      </FormField>
      <FormField label="Website" htmlFor="websiteUrl" error={errors.websiteUrl}>
        <input id="websiteUrl" type="url" className={baseInput} value={values.websiteUrl ?? ""} onChange={(event) => update("websiteUrl", event.target.value)} />
      </FormField>
      <FormField label="Public contact email" htmlFor="contactEmail" error={errors.contactEmail}>
        <input id="contactEmail" type="email" className={baseInput} value={values.contactEmail ?? ""} onChange={(event) => update("contactEmail", event.target.value)} />
      </FormField>
    </>
  );
}

function CorrectionFields({
  values,
  errors,
  update,
}: {
  values: FormValues;
  errors: FieldErrors;
  update: (name: string, value: string) => void;
}) {
  return (
    <>
      <FormField label="Actor name or slug" htmlFor="actor" error={errors.actor}>
        <input id="actor" className={baseInput} value={values.actor ?? ""} onChange={(event) => update("actor", event.target.value)} />
      </FormField>
      <FormField label="What is wrong" htmlFor="issue" error={errors.issue}>
        <textarea id="issue" className={baseInput} rows={5} value={values.issue ?? ""} onChange={(event) => update("issue", event.target.value)} />
      </FormField>
      <FormField label="Correct information" htmlFor="correction" error={errors.correction}>
        <textarea id="correction" className={baseInput} rows={5} value={values.correction ?? ""} onChange={(event) => update("correction", event.target.value)} />
      </FormField>
    </>
  );
}

function GapFields({
  values,
  errors,
  update,
  countyOptions,
}: {
  values: FormValues;
  errors: FieldErrors;
  update: (name: string, value: string) => void;
  countyOptions: readonly string[];
}) {
  return (
    <>
      <FormField label="Missing actor type" htmlFor="missingActorType" error={errors.missingActorType}>
        <input id="missingActorType" className={baseInput} value={values.missingActorType ?? ""} onChange={(event) => update("missingActorType", event.target.value)} />
      </FormField>
      <CountySelect values={values} errors={errors} update={update} countyOptions={countyOptions} />
      <FormField label="Pillar" htmlFor="gapPillar" error={errors.pillar}>
        <select id="gapPillar" className={baseInput} value={values.gapPillar ?? ""} onChange={(event) => update("gapPillar", event.target.value)}>
          <option value="">Choose pillar</option>
          {ALL_PILLARS.map((pillar) => (
            <option key={pillar.id} value={pillar.id}>
              {pillar.id}. {pillar.name} ({PILLAR_GROUP_LABELS[pillar.group]})
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Why it matters" htmlFor="whyItMatters" error={errors.whyItMatters}>
        <textarea id="whyItMatters" className={baseInput} rows={5} value={values.whyItMatters ?? ""} onChange={(event) => update("whyItMatters", event.target.value)} />
      </FormField>
    </>
  );
}

function CountySelect({
  values,
  errors,
  update,
  countyOptions,
}: {
  values: FormValues;
  errors: FieldErrors;
  update: (name: string, value: string) => void;
  countyOptions: readonly string[];
}) {
  return (
    <FormField label="County" htmlFor="county" error={errors.county}>
      <select id="county" className={baseInput} value={values.county ?? ""} onChange={(event) => update("county", event.target.value)}>
        <option value="">Choose county</option>
        {countyOptions.map((county) => (
          <option key={county} value={county}>
            {COUNTY_LABELS[county as keyof typeof COUNTY_LABELS]}
          </option>
        ))}
      </select>
    </FormField>
  );
}

function PillarCheckboxes({
  values,
  errors,
  update,
}: {
  values: FormValues;
  errors: FieldErrors;
  update: (name: string, value: string) => void;
}) {
  return (
    <div className="md:col-span-2">
      <FormField label="Pillars" error={errors.pillars}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ALL_PILLARS.map((pillar) => {
            const key = `pillar.${pillar.id}`;
            return (
              <label
                key={pillar.id}
                className="flex items-start gap-2 rounded-[8px] border border-border-default bg-background p-2 text-xs text-text-secondary"
              >
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={values[key] === "true"}
                  onChange={(event) => update(key, event.target.checked ? "true" : "")}
                />
                <span>
                  <span className="font-semibold text-text-primary">{pillar.name}</span>
                  <span className="block text-text-muted">
                    {PILLAR_GROUP_LABELS[pillar.group]}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </FormField>
    </div>
  );
}
