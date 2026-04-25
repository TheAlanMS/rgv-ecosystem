# Technical Goals

This file defines the technical goals and success conditions for Project 2.

## North Star

Build a durable, navigable, community-owned ecosystem mapping platform that transforms the PRD and reference HTML into a real product with clear architecture, maintainable code, and credible UX.

## Overarching success criteria

The project is successful when it:

1. faithfully implements the PRD’s core information architecture
2. turns the reference HTML into reusable product components instead of static mockups
3. makes the 10-pillar ecosystem model explorable and understandable
4. supports role-based navigation and pathway discovery
5. makes gaps and underserved geographies visible without breaking trust
6. can grow from a curated V1 into a community-maintained platform

## Product goals

### 1. Implement the core site architecture
Build production-ready routes and layouts for:

- Homepage
- The Map
- Pillar Pages
- Actor Profiles
- My Journey
- Ecosystem Health
- Submit / Correct
- About / Governance

### 2. Model the ecosystem as structured data
Define durable data models for:

- Pillars
- Actors
- Player types
- Counties and cities
- Stages served
- Status values such as active, emerging, gap, proposed
- Journey pathways
- Governance content
- Submission records

### 3. Build a dual exploration experience
Support both:

- list/card exploration
- geographic exploration

Filtering must work consistently across views.

### 4. Build role-based navigation
Support at minimum the role entry flows described in the PRD:

- Founder / Entrepreneur
- Investor / Funder
- Educator / University
- EDO / Ecosystem Builder
- Corporate / Innovation Buyer
- Service Provider
- Student / Builder
- Government / Policy

### 5. Build the journey/path system
Implement a reusable journey engine that can render role-based pathway content such as:

- stage-gated founder journeys
- policy leader and EDO diagnostic entry points
- student path discovery
- innovation buyer pathways
- service provider and ecosystem builder flows

### 6. Build pillar exploration
Users must be able to:

- see all 10 pillars
- understand each pillar’s capacity and status
- inspect mapped actors per pillar
- see where gaps exist
- understand adjacent relationships between pillars

### 7. Build actor profiles that are useful
Each actor profile should support:

- title and type
- location
- county and city
- pillar tags
- role relevance
- what they offer
- what they need
- how to connect
- status and verification metadata
- outside-region connection labeling where relevant

### 8. Build ecosystem diagnostics
Create an ecosystem health surface that can show:

- pillar strength indicators
- known gaps
- geographic distribution
- capital deserts or underserved regions
- trend-ready placeholders for future versions

### 9. Build contribution workflows
Implement a V1 community submission model for:

- suggest an organization
- correct an existing listing
- add missing metadata
- queue items for review instead of auto-publishing

### 10. Build governance-ready content surfaces
The product should include an explicit about/governance layer covering:

- platform purpose
- data ownership philosophy
- editorial review model
- open-source intent
- community stewardship principles

## Engineering goals

### Architecture
- clear separation between content, data, UI, and domain logic
- route-driven IA that mirrors the PRD
- reusable components instead of page-specific duplication
- typed schemas and validations across data flows

### Data quality
- schema-enforced actor and pillar records
- seed data that is easy to update
- support for gap records as first-class entities
- support for future moderation and verification fields

### Frontend quality
- accessible navigation
- responsive layouts
- low-friction filtering
- readable empty states, gap states, and error states
- strong information hierarchy

### Maintainability
- linted, formatted, typed codebase
- tests for filtering, route behavior, schemas, and critical UI logic
- documented conventions for future contributors and agents

## Suggested phased delivery

### Phase 1 — Foundations
- initialize repo
- define app routes
- define core schemas and types
- add seed data for pillars, actors, roles, and journeys
- implement base layout and design tokens

### Phase 2 — Browse experience
- build homepage
- build map/list view
- build pillar cards and pillar detail views
- implement filters and sorting
- add actor cards and actor profile routes

### Phase 3 — Guided pathways
- build role selection
- build intent selection
- build journey pages and step detail modules
- connect journey steps back into pillars and actor discovery

### Phase 4 — Diagnostics and governance
- build ecosystem health dashboard
- build about/governance page
- build submit/correct forms
- implement review-ready data contracts

### Phase 5 — Hardening
- tests
- accessibility pass
- responsive polish
- metadata/SEO
- analytics hooks
- deploy-ready configuration

## Non-goals for V1

Avoid overbuilding these in the first version:

- full marketplace mechanics
- user accounts for all player types
- complex procurement workflows
- advanced CMS before the domain model is stable
- algorithmic recommendation engines
- automatic publishing of community submissions
