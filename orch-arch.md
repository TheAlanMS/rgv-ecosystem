# Orchestration Architecture
## RGV Innovation Ecosystem — Multi-Agent Execution Model

> Reference document for running any project phase with the parallel agent workflow.
> Adapted from the AI Presentation Updater orchestration model.
> Compatible with: **Claude Code**, **Codex**, **OpenCode**, **Local LLMs**

---

## Concept

The **orchestrator** is the main coding session (any agent). It reads the phase progress tracker, checks prerequisites, spawns isolated agents, waits for results, merges changes, runs gate checks, commits, and advances to the next subphase.

**Agents** are isolated subprocesses. In Claude Code, these use the `Agent` tool with `isolation: "worktree"`. In Codex/OpenCode/Local LLMs, the agent receives its subphase spec and works on an isolated branch. Each agent gets its own git branch, writes its assigned files, and returns. The orchestrator merges all branches after the subphase completes.

The pattern: **sequential at the subphase level, parallel within each subphase.**

---

## Orchestration Loop

```
┌──────────────────────────────────────────────────────────────────┐
│                        ORCHESTRATOR                              │
│              (any agent: Claude Code, Codex, etc.)               │
└──────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  1. Read progress  │
                    │     tracker        │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │  2. Check prereqs  │◄── Are prior subphases
                    │                    │    marked complete?
                    └─────────┬─────────┘
                     YES │         │ NO
                         │         └──► STOP. Surface blocker.
                    ┌────▼──────────┐
                    │  3. Spawn     │
                    │     agents    │◄── Parallel if tasks are
                    │               │    file-independent
                    └────┬──────────┘
                         │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
       [Agent A]     [Agent B]     [Agent C]
       worktree      worktree      worktree
       branch A      branch B      branch C
           │             │             │
           └─────────────┼─────────────┘
                         │ (all complete)
                    ┌────▼──────────┐
                    │  4. Merge     │◄── Sequential merges.
                    │     branches  │    No file overlap = clean.
                    └────┬──────────┘
                    CONFLICT?
                    YES └──► STOP. Surface to user.
                         │
                    ┌────▼──────────┐
                    │  5. Gate check │◄── tsc / lint / build / test
                    │                │
                    └────┬──────────┘
                    FAIL?
                    YES └──► Fix. Re-run gate. Do not advance.
                         │
                    ┌────▼──────────┐
                    │  6. Update    │
                    │     progress  │
                    └────┬──────────┘
                         │
                    ┌────▼──────────┐
                    │  7. Commit +  │
                    │     push      │
                    └────┬──────────┘
                         │
                    ┌────▼──────────┐
                    │  8. Next      │
                    │     subphase  │
                    └───────────────┘
```

---

## Agent Platform Notes

| Platform | Isolation Method | How to Provide Spec | Gate Check Method |
|----------|-----------------|--------------------|--------------------|
| **Claude Code** | `Agent` tool with `isolation: "worktree"` | Full subphase file content in agent prompt | Orchestrator runs Bash tool after merge |
| **Codex** | Separate Codex task per subphase | Paste subphase spec as task description | Codex runs terminal commands; verify in PR |
| **OpenCode** | Git branch per task | Feed subphase file as context | Run gate commands in terminal |
| **Local LLMs** | Manual branch checkout | Copy subphase spec into prompt | Run gate commands manually |

**Key rule:** Regardless of platform, each agent must only modify files listed in its subphase spec under "Files Created/Modified". This prevents merge conflicts.

---

## Gate Checks

| Phase | Gate Command | When |
|-------|-------------|------|
| Phase 1-2 (pre-tests) | `npx tsc --noEmit && npm run lint && npm run build` | After each subphase |
| Phase 2 (after M7) | `npx tsc --noEmit && npm run lint && npm run build && npm test` | After each subphase |
| Phase 3+ | `npx tsc --noEmit && npm run lint && npm run build && npm test` | After each subphase |
| Phase 3 (database) | Add `npx prisma validate && npx prisma generate` | After database subphases |
| Any phase (final) | Full gate + manual verification | After last subphase |

**Rule**: Gate failure stops execution. Fix before advancing. Never skip or `--force`.

---

## Commit Cadence

One commit per subphase, after the gate passes.

```
p2-filters-1a complete → gate passes → commit: "feat(p2-filters-1a): add useFilters hook and filter utilities"
p2-filters-1b complete → gate passes → commit: "feat(p2-filters-1b): add FilterBar and SortControl components"
p2-filters-2a complete → gate passes → commit: "feat(p2-filters-2a): integrate filters into map and pillar pages"
Audit complete          →              → commit: "chore(audit): resolve phase2 audit findings"
```

Conventional commit format: `type(scope): description`
- `feat` for new functionality
- `fix` for bug fixes
- `chore` for housekeeping (audits, restructure)
- `docs` for documentation only
- `test` for test-only changes

---

## Naming Convention

All planning docs use: **`p{phase}-{group}-{sequence}-{description}.md`**

| Part | Meaning | Example Values |
|------|---------|----------------|
| `p{N}` | Phase number | `p1`, `p2`, `p3` |
| `{group}` | Logical grouping | `filters`, `search`, `map`, `database`, `api`, `auth` |
| `{sequence}` | Ordering label | `1a`, `1b`, `2a`, `2b`, `3a` |
| `{description}` | What this subphase builds | `infrastructure`, `components`, `integration` |

**Examples:**
```
p1-types-1a-enums-and-schemas.md    ← Phase 1, types, first task group, enums/schemas
p2-filters-1a-infrastructure.md     ← Phase 2, filters, first task group, infrastructure
p2-map-2b-data-audit.md             ← Phase 2, map, second batch task B, data audit
p3-database-1a-prisma-init.md       ← Phase 3, database, first task group, Prisma init
p6-partners-2a-admin-ui.md          ← Phase 6, partners, second batch task A, admin UI
```

**Why this matters:** File names are unambiguous out of context. `p2-map-3a-integration.md` can only mean one thing, regardless of which folder you find it in.

---

## Folder Structure

```
implementation/
├── phase{N}/
│   ├── phase{N}-implementation.md    ← master plan (context, DoD, execution order, risks)
│   ├── phase{N}-progress.md          ← ASCII progress tracker (single source of truth)
│   ├── audits/                       ← one audit per phase, post-execution
│   │   └── phase{N}-audit-YYYY-MM-DD.md
│   └── subphases/
│       └── {group}/                  ← logical grouping (descriptive noun)
│           └── p{N}-{group}-{seq}-{desc}.md
```

**Rules:**
- One `phase{N}-progress.md` per phase. Never split the progress tracker.
- One `audits/` folder per phase. Audit runs after all subphases pass, not per subphase.
- Sub-folder names within `subphases/` are descriptive nouns, not numbers.
- All commands run from repo root. Never `cd` into subdirectories for execution.

---

## Parallel Execution Rules

### File Ownership
Each subphase file lists exclusive files under "Files Created/Modified". No two concurrent agents may touch the same file.

### Sequence Numbers
- The number prefix indicates the **batch**: all `1x` subphases complete before any `2x` starts
- The letter suffix allows **parallel** execution within a batch: `1a` and `1b` can run in parallel if their files don't overlap
- Example: `p2-filters-1a` and `p2-filters-1b` → parallel (different files). `p2-filters-2a` → waits for both.

### Cross-Group Parallelism
Different subphase groups with no shared file dependencies can run in parallel across agents. Check the dependency graph in each phase's implementation doc.

---

## How to Apply This to a New Phase

### Step 1: Create the planning docs

```bash
mkdir -p implementation/phase{N}/subphases/{group-name}
mkdir implementation/phase{N}/audits
```

Create:
- `phase{N}-implementation.md` — context, DoD evidence, execution order, dependency graph, risks
- `phase{N}-progress.md` — ASCII tracker with all tasks pending
- `subphases/{group}/p{N}-{group}-{seq}-{desc}.md` — one file per subphase

### Step 2: Map out parallelism

For each subphase, list its tasks and the files each task writes. Tasks that write non-overlapping files can run in parallel.

```
Subphase 1b:
  Task A → writes: src/hooks/useFilters.ts
  Task B → writes: src/lib/utils/filters.ts
  → Tasks A, B are independent → run in parallel
```

### Step 3: Run the orchestration loop

For each subphase (in prerequisite order):
1. Spawn one agent per independent task (worktree in Claude Code, branch in others)
2. Provide each agent the full subphase spec + its specific task assignment
3. Wait for all agents to return
4. Merge branches: `git merge <branch>` for each
5. Run gate check
6. Update `phase{N}-progress.md`
7. Commit + push

### Step 4: Phase audit

After all subphases pass their gates:
- Spawn an audit agent with the full phase spec and all output files
- Findings → `audits/phase{N}-audit-YYYY-MM-DD.md`
- Fix HIGH/CRITICAL findings
- Final commit

---

## Phase 2 Execution Map (Example)

```
PHASE 2 — INTERACTIVE FEATURES & POLISH
Dependency chains:
  filters → search → (wait for polish)
  filters → map → pillar → (wait for polish)
  onboarding (independent) → (wait for polish)
  polish → testing

TIME →

Batch 1:  [filters-1a] [filters-1b]   [onboarding-1a] [onboarding-1b]
Batch 2:  [filters-2a]                 [onboarding-2a]
Batch 3:  [search-1a] [search-1b]      [map-1a] [map-1b]
Batch 4:  [search-2a]                  [map-2a] [map-2b]
Batch 5:                               [map-3a]
Batch 6:  [pillar-1a]
Batch 7:  [pillar-2a]
Batch 8:  [polish-1a] [polish-1b]
Batch 9:  [polish-1c]
Batch 10: [testing-1a]
Batch 11: [testing-2a] [testing-2b] [testing-2c] [testing-2d]
```

With 2-3 agents operating in parallel, Phase 2 completes in ~11 sequential batches rather than 20 sequential subphases.

---

## Progress Tracker Format

Each `phase{N}-progress.md` follows this format:

```markdown
# Phase N Progress Tracker

> **Last updated:** YYYY-MM-DD
> **Single source of truth for Phase N status**

## Overall
Phase N  ░░░░░░░░░░░░░░░░░░░░  0 / {total} subphases

## {group-name}
| Subphase | Status | Agent | Commit |
|----------|--------|-------|--------|
| p{N}-{group}-1a-{desc} | ⬜ | — | — |

Status values: ⬜ Not Started → 🟡 In Progress → ✅ Complete
```

**Update rules:**
- Only the orchestrator updates progress (not individual agents)
- Update immediately after gate check passes
- Include commit hash in the Commit column
