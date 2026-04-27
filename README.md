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


QA Notes:
Color Pallete sucks; example: https://startupgenome.com/ecosystems
Actors to add: eBridge Center for Business & Commercialization
Brownsville Community Improvement Corporation
Greater Brownsville Incentives Corporation
UTRGV Center for Innovation & Commercialization
Brownsville Chamber
COSTEP
1 Million Cups Brownsville
Leadership Brownsville
RGV Startup Week
StartUp Texas
City of Brownsville, TX - Municipal Government
Port of Brownsville, TX
Mitte Cultural District
RGV LEAD - Rio Grande Valley Linking Economic and Academic Development
RGV FOCUS
South Texas Manufacturing Association
Region One Education Service Center
Region One Gear Up
BISD
Rio Grande Guardian
TSC
TSC Performing Arts Center
Cameron County Education Initiative CCEI
ITEC
CEO Brownsville
Cameron County Regional Mobility
Index Reynosa
Index Matamoros
Index Nuevo Laredo
Index Nuevo Leon
ProMexico Industry
Asociacion de Maquiladoras de Matamoros
CODEMatamoros
South Texas Manufacturers Association
Cobifer
Rio Grande Valley Partnership
Rio South Texas Economic Council
Rio-South Texas Education & Community Develop
Collaborative Action Board
TSTC Harlingen
Business Development Fund
Texas Border Business
RGV Builders Association
Brownsville SpaceX
Brownsville Public Utilities Board
Brownsville Parks & Recreation Department
Brownsville Historical Association
Brownsville Museum of Fine Art
Gladys Porter Zoo
Brownsville Wellness Coalition
Brownsville Farmers Market
Historic Brownsville Museum
Holiday Village
Brownsville Living
Ride for Rotary
The Rotary Club of Historic Brownsville
Rio Grande Valley Partnership
Brownsville Careers & Technical Training
Keep Brownsville Beautiful
BTX Downtown First Friday
Grants and Community Development Department
Brownsville South Padre Island Airport
Visit Brownsville TX
Caracara Trail
West Rail Trail
Belden Trail
ROCA at Brownsville Performing Arts Academy/George Ramírez PAA
CycloBia Brownsville
Brownsville Society of Performing Arts
Youth Build
CDCB
Buho
Mr Amigo Association
Crossroads Festival
AIA Lower Rio Grande Architects
Brownsville Community Foundation
Expanding Frontiers
Dean Porter Park Renovation Inc
Hike & Bike Trails
Old City Cemetary Center
South Texas Ecotourism
The Challenge RGV
Revitalize Downtown Brownsville
Via Americas Front Door Reimagined
Zonta Club
Cameron County
Conoce Matamoros
Museo MACT
South Texas College
City of San Antonio
City of Austin
Business Development Fund of Texas
The Texas Bucket List
UTRGV Rusteburg Art Gallery
SPI Life
Valley Alliance of Mentors for Opp & Scholarship
VIDA Valley Initiative

Pillar 1: CBP/Border Ops should not be in Pillar 1 (or even at all)
Pillar 2 (Talent Pool): Include Trade Schools (Infra not great, but talent pool is big)
Pillar 4: Hidalgo County School Districts | Jubilee Schools | Alpha School | South Texas ISD |
Pillar 6: Remove 1909 Community | Valley Young Professionals → RGV Partnership | Fem City (https://femcity.com/brownsville-tx) (https://femcity.com/mcallen-tx) | Chamber of Commerce for Hidalgo County | RGV Tech Club | 1 Million Cups Brownsville | 1 Million Cups McAllen | 1 Million Cups Alton
Pillar 7: Remove 1909 | Add EBridge Business Academy | Add UTRGV Center for Innovation and Commercialization (CIC) | Pharr Global Business Hub |
Pillar 8: Add Texas Congressional Offices | Texas Venture Alliance / Texas Venture Fest | ]
Pillar 9: https://riosouthtexasregion.com/ , https://autocluster.riosouthtexasregion.com/public-dashboard , https://stma-tx.org/council-for-south-texas-economic-progress-costep/ (COSTEP)

Every actor's page needs a URL; possible thumbnail; ideally in future versions, every actor should have contact info (person name, phone number, email, address, etc.)

Home Button from any page
