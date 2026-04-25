import { z } from "zod/v4";
import { GapSchema } from "@/lib/types";
import type { Gap } from "@/lib/types";

const gaps: Gap[] = [
  {
    id: "gap-diaspora-returning-talent",
    pillar: 2,
    county: "Cameron",
    description:
      "No formal mechanism exists to identify, track, or recruit RGV diaspora talent back to the region. Returning professionals are an untapped pipeline.",
    flaggedBy: "system",
    dateFlagged: "2026-04-22",
    status: "Open",
  },
  {
    id: "gap-binational-engineers",
    pillar: 2,
    county: "Cameron",
    description:
      "Binational engineers working across RGV and Matamoros lack formal integration into the ecosystem. No structured pathway connects their skills to local ventures.",
    flaggedBy: "system",
    dateFlagged: "2026-04-22",
    status: "Open",
  },
  {
    id: "gap-local-angel-networks",
    pillar: 3,
    county: "Hidalgo",
    description:
      "No organized angel investor network exists in the RGV. Early-stage equity capital is the most critical gap in the region's capital infrastructure.",
    flaggedBy: "system",
    dateFlagged: "2026-04-22",
    status: "Open",
  },
  {
    id: "gap-shared-crm-intake",
    pillar: 9,
    county: "Hidalgo",
    description:
      "Ecosystem organizations lack a shared CRM or intake system for coordinating client referrals and tracking entrepreneur journeys across programs.",
    flaggedBy: "system",
    dateFlagged: "2026-04-22",
    status: "Open",
  },
  {
    id: "gap-cross-org-outcome-tracking",
    pillar: 9,
    county: "Hidalgo",
    description:
      "No cross-organizational outcome tracking system exists to measure collective impact — jobs created, ventures launched, capital deployed.",
    flaggedBy: "system",
    dateFlagged: "2026-04-22",
    status: "Open",
  },
  {
    id: "gap-startup-savvy-psp",
    pillar: 5,
    county: "Cameron",
    description:
      "Limited startup-experienced professional service providers (legal, accounting, HR) who understand venture-stage needs and can provide stage-appropriate support.",
    flaggedBy: "system",
    dateFlagged: "2026-04-22",
    status: "Open",
  },
  {
    id: "gap-starr-county-actor-coverage",
    pillar: 9,
    county: "Starr",
    description:
      "No active Starr County ecosystem actors are currently represented in the directory. Coverage should be treated as an explicit data and outreach gap, not as absence of need.",
    flaggedBy: "system",
    dateFlagged: "2026-04-25",
    status: "Open",
  },
  {
    id: "gap-willacy-county-actor-coverage",
    pillar: 9,
    county: "Willacy",
    description:
      "No active Willacy County ecosystem actors are currently represented in the directory. Coverage should remain visible in filters, map contexts, and health reporting.",
    flaggedBy: "system",
    dateFlagged: "2026-04-25",
    status: "Open",
  },
];

z.array(GapSchema).parse(gaps);

export const ALL_GAPS: readonly Gap[] = gaps;
