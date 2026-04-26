# RGV Innovation Ecosystem Cardinal Map

A community-owned digital platform for making the Rio Grande Valley innovation ecosystem legible, navigable, and self-reinforcing.

## What this project is

The RGV Innovation Ecosystem Cardinal Map is an open-source ecosystem mapping product built to help founders, students, investors, educators, economic development organizations, corporate buyers, service providers, and policy leaders understand the Rio Grande Valley innovation landscape and move through it with clarity.

This project is not a pitch deck, static directory, or gated marketplace. It is intended to be shared infrastructure: a living, navigable map of the ecosystem that shows actors, gaps, pathways, and opportunities across the region.

## Product intent

The product should:

- map the 10 pillars of the I2E ecosystem model
- show actors by pillar, geography, and role
- reveal gaps and underserved counties as visible product features
- support role-based and intent-based navigation
- provide both a list view and a geographic view
- let the community submit corrections and new entries
- act as shared memory for the region over time

## Who it serves

The product is designed for:

- Founders and entrepreneurs
- Investors and funders
- Academic institutions
- Economic development organizations
- Corporate and innovation buyers
- Service providers
- Students and emerging builders
- Government and policy leaders

## Core product surfaces

- Homepage
- Full Map
- Pillar Pages
- Actor Profiles
- My Journey
- Ecosystem Health
- Submit / Correct
- About / Governance

## Design direction

The attached HTML files suggest a polished, editorial, strategic interface with:

- strong information hierarchy
- clear color-coded ecosystem groupings
- role-based journeys
- interactive pillar exploration
- ecosystem diagnostic summaries
- responsive layouts for desktop and mobile

The PRD should be treated as the source of truth for product requirements. The HTML files should guide interaction patterns, information density, and visual direction.

## Suggested stack

- Next.js
- TypeScript
- React Server Components where useful
- Tailwind CSS or a clean component styling system
- Zod for schema validation
- Convex for structured actor data, submissions, moderation workflows, and backend functions
- Map layer for geography view
- MDX or CMS-backed content for governance and pillar education pages
- Test suite covering data contracts, filtering logic, and role-based journeys

## V1 philosophy

Version 1 should optimize for usefulness, clarity, and maintainability over completeness. A smaller, verified, well-structured dataset is more valuable than a bloated, messy directory.

## Source materials

This repo is based on:
- the PRD for the RGV Innovation Ecosystem Cardinal Map
- the example HTML ecosystem map
- the ecosystem lifecycle framework HTML
