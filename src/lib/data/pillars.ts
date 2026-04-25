import { z } from "zod/v4";
import { PillarSchema } from "@/lib/types";
import type { Pillar } from "@/lib/types";

const pillars: Pillar[] = [
  {
    id: 1,
    name: "Innovation Customers",
    slug: "innovation-customers",
    capacity: "Demand & Adoption",
    group: "demand",
    description:
      "Institutions and enterprises that buy, adopt, or pilot innovation from the ecosystem. Anchor customers like SpaceX, DHR Health, and city governments create the demand signal that makes the whole system viable.",
    status: "Active — anchor presence (SpaceX, DHR Health, city governments)",
  },
  {
    id: 2,
    name: "Talent Pool",
    slug: "talent-pool",
    capacity: "Build & Execute",
    group: "supply",
    description:
      "The people who build, operate, and scale ventures. Graduates from UTRGV, STC, and TSTC form the core pipeline. Diaspora talent and binational engineers represent untapped potential.",
    status: "Active — formalization gap in diaspora and binational talent",
  },
  {
    id: 3,
    name: "Capital Providers",
    slug: "capital-providers",
    capacity: "Risk & Growth Capital",
    group: "demand",
    description:
      "Sources of funding for ventures at all stages — grants, debt, angel investment, and institutional capital. The RGV has grant infrastructure but a critical gap in formal angel and venture capital.",
    status: "Partial — critical gap in angel/venture capital",
  },
  {
    id: 4,
    name: "Education & Pipelines",
    slug: "education-pipelines",
    capacity: "Talent Development",
    group: "supply",
    description:
      "Institutions that develop human capital — from K-12 CTE programs through R1 university research. UTRGV, STC, TSTC, IDEA, and FLI form the region's strongest pillar.",
    status: "Strong — deep institutional base across all levels",
  },
  {
    id: 5,
    name: "Professional Services",
    slug: "professional-services",
    capacity: "Friction Removal",
    group: "engine",
    description:
      "Legal, financial, HR, and advisory services that help ventures navigate complexity. The RGV has general professional services but limited startup-savvy providers.",
    status: "Thin — limited startup-experienced service providers",
  },
  {
    id: 6,
    name: "Communities & Peer Groups",
    slug: "communities-peer-groups",
    capacity: "Trust & Reputation",
    group: "supply",
    description:
      "Networks and organizations that build trust, share knowledge, and create belonging. Chambers, professional associations, and programs like the FLI Ambassador Program form the social infrastructure.",
    status: "Active — strong chamber and community presence",
  },
  {
    id: 7,
    name: "Incubators & Accelerators",
    slug: "incubators-accelerators",
    capacity: "Company Formation",
    group: "engine",
    description:
      "Programs that help founders move from idea to viable company. eBridge, FLI, UTRGV Innovation Hub, and 1909 provide structured support at different stages.",
    status: "Active — growing program density",
  },
  {
    id: 8,
    name: "Advocacy & Policy",
    slug: "advocacy-policy",
    capacity: "Permission & Unblocking",
    group: "infra",
    description:
      "Economic development organizations, elected officials, and advocacy bodies that create enabling conditions for innovation through policy, incentives, and public investment.",
    status: "Active — strong EDC and government engagement",
  },
  {
    id: 9,
    name: "Shared Operating Platform",
    slug: "shared-operating-platform",
    capacity: "Memory & Coordination",
    group: "infra",
    description:
      "The coordination layer that helps ecosystem actors find each other, share data, and avoid duplication. This platform is the first attempt to fill a critical gap.",
    status: "Critical gap — no shared coordination infrastructure exists",
  },
  {
    id: 10,
    name: "Governance & Accountability",
    slug: "governance-accountability",
    capacity: "Standards & Outcomes",
    group: "infra",
    description:
      "Structures that set standards, measure outcomes, and hold the ecosystem accountable to its stated values. Currently fragmented across multiple institutions with no unified framework.",
    status: "Fragmented — no unified governance framework",
  },
];

// Validate at module load
z.array(PillarSchema).parse(pillars);

export const ALL_PILLARS: readonly Pillar[] = pillars;
