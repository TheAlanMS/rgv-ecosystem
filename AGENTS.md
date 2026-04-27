# AGENTS.md

This repository is intended to be worked on by human engineers and agentic engineers.

## Prime directive

Agents must optimize for:
- correctness
- maintainability
- clear architecture
- explicit reasoning
- tested output
- small, reviewable changes

Do not optimize for speed at the expense of code quality or product integrity.

## Self-improving loop

Every agent working in this repo should operate in a continuous improvement loop:

1. Read the task and inspect the current state of the repo
2. Form a plan before changing code
3. Make the smallest meaningful set of changes
4. Run validation
5. Critique your own work
6. Fix issues found during review
7. Re-run validation
8. Summarize what changed, what remains, and what should be tested next

This loop is not optional.

## Required validation loop

For every non-trivial change, agents should attempt to:

- run lint
- run typecheck
- run tests
- run build when relevant
- inspect console/runtime errors
- review changed files for duplication, poor naming, or leaky abstractions
- confirm routes, components, and data contracts still align with the PRD

If any validation step cannot be run, the agent must say so explicitly and explain why.

## Rules for agentic engineering in this repo

### 1. Start with the source of truth
- The PRD is the product source of truth.
- The HTML files are implementation and design references.
- If the HTML conflicts with the PRD, follow the PRD.

### 2. Plan before coding
Before large changes, agents should produce:
- the current state
- the target state
- assumptions
- risks
- files likely to change
- validation steps

### 3. Prefer small diffs
Avoid sweeping rewrites unless they are clearly necessary.

### 4. Keep domain logic separate
Do not bury domain rules inside presentation components.

### 5. Make gaps explicit
If the ecosystem data is missing, model the gap intentionally instead of hiding it.

### 6. Preserve type safety
No silent any types.
No vague data contracts.
No untyped JSON blobs where schemas should exist.

### 7. Build for future moderation
Assume future versions will require:
- verification metadata
- editorial review
- submission approval workflows
- auditability

### 8. Test the real behavior
Do not stop at static implementation.
Verify filtering, route behavior, empty states, and critical data flows.

### 9. Explain your edits
Every meaningful change should be accompanied by:
- what changed
- why it changed
- risk or tradeoff introduced
- follow-up work

### 10. Critique yourself
Agents should actively look for:
- brittle logic
- duplicated constants
- weak naming
- confusing data flow
- inaccessible UI
- uncaught edge cases
- unvalidated assumptions

## Minimum completion checklist

Before calling work complete, confirm:

- code is formatted
- lint passes
- types pass
- tests pass or gaps are clearly stated
- build passes or blocker is clearly stated
- new routes and components are wired correctly
- the implementation still matches the PRD
- dead code was not left behind
- TODOs are intentional and specific

## Preferred engineering behavior

Agents should:
- be explicit
- be conservative with changes
- isolate concerns
- document decisions
- use descriptive naming
- leave the repo cleaner than they found it

Agents should not:
- invent requirements
- mark speculative features as done
- hide failures
- skip validation silently
- duplicate logic across files
- hardcode values that belong in shared schemas or config

## Repo-level expectation

This codebase should steadily improve through repeated cycles of:
- plan
- implement
- validate
- critique
- refine

That is the expected operating model for all agentic contributors.

<!-- convex-ai-start -->
This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.
<!-- convex-ai-end -->
