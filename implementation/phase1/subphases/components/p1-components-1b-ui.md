# p1-components-1b-ui

> **Phase:** 1 — Foundations
> **Group:** Components
> **Status:** ✅ Complete
> **Dependencies:** p1-components-1a-layout

## Objective

Create reusable UI primitive components used across multiple pages.

## Tasks

### T1: Card component
- **File:** `src/components/ui/Card.tsx`
- Generic card wrapper with dark theme styling

### T2: Page header
- **File:** `src/components/ui/PageHeader.tsx`
- Consistent page title + description header

### T3: Status badge
- **File:** `src/components/ui/StatusBadge.tsx`
- Color-coded badge for Active, Emerging, Gap, Proposed statuses

### T4: Tag component
- **File:** `src/components/ui/Tag.tsx`
- Small label tag for categories, pillar groups, etc.

### T5: Gap card
- **File:** `src/components/ui/GapCard.tsx`
- Specialized card for displaying ecosystem gaps

## Acceptance Criteria

- [x] All UI components follow the dark theme + gold accent design system
- [x] StatusBadge colors match status semantics
- [x] Components accept reasonable props for customization
- [x] No hardcoded data — all content via props
