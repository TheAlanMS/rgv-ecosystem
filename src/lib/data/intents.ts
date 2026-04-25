import { z } from "zod/v4";

export const RoleIdSchema = z.enum([
  "startup",
  "student",
  "investor",
  "educator",
  "edo",
  "corporate",
  "service",
  "policy",
]);

export const IntentIdSchema = z.enum([
  "explore-ecosystem",
  "find-resources",
  "connect-with-others",
  "understand-gaps",
  "get-started",
]);

export const IntentSchema = z.object({
  id: IntentIdSchema,
  label: z.string().min(1),
  prompt: z.string().min(1),
  description: z.string().min(1),
});

export const RoleIntentRouteSchema = z.object({
  roleId: RoleIdSchema,
  intentId: IntentIdSchema,
  href: z.string().min(1).startsWith("/"),
  rationale: z.string().min(1),
});

export type IntentId = z.infer<typeof IntentIdSchema>;
export type Intent = z.infer<typeof IntentSchema>;
export type RoleId = z.infer<typeof RoleIdSchema>;
export type RoleIntentRoute = z.infer<typeof RoleIntentRouteSchema>;

export const ALL_INTENTS: readonly Intent[] = [
  {
    id: "explore-ecosystem",
    label: "Explore the ecosystem",
    prompt: "Explore",
    description: "See the actors, pillars, and regional infrastructure around your role.",
  },
  {
    id: "find-resources",
    label: "Find resources",
    prompt: "Find",
    description: "Jump to programs, providers, capital, or support relevant to your next step.",
  },
  {
    id: "connect-with-others",
    label: "Connect with others",
    prompt: "Connect",
    description: "Find communities, peers, partners, or institutions that can help you move.",
  },
  {
    id: "understand-gaps",
    label: "Understand gaps",
    prompt: "Diagnose",
    description: "Review visible ecosystem gaps, data quality, and coordination needs.",
  },
  {
    id: "get-started",
    label: "Get started",
    prompt: "Start",
    description: "Follow the role-specific path through the ecosystem.",
  },
];

export const ROLE_INTENT_ROUTES = {
  startup: {
    "get-started": {
      href: "/journeys/startup",
      rationale: "Founders need the PRD journey path before selecting actors.",
    },
    "find-resources": {
      href: "/map?pillar=3,4,5,7&stage=Idea,PreSeed,Seed",
      rationale: "Founder support spans education, capital, services, and accelerators.",
    },
    "connect-with-others": {
      href: "/map?pillar=6,7&stage=Idea,PreSeed,Seed",
      rationale: "Peer groups and programs are the founder's first feedback loop.",
    },
  },
  student: {
    "get-started": {
      href: "/journeys/student",
      rationale: "Students need the builder entry path and sequence.",
    },
    "find-resources": {
      href: "/map?pillar=2,4,6,7&stage=Idea",
      rationale: "Student builders start with talent, education, community, and programs.",
    },
    "connect-with-others": {
      href: "/map?pillar=6,7&stage=Idea",
      rationale: "Community and innovation programs help students find builders.",
    },
  },
  investor: {
    "explore-ecosystem": {
      href: "/map?pillar=1,3,7,9,10",
      rationale: "Investors need deal flow, platform, governance, and customer context.",
    },
    "find-resources": {
      href: "/map?pillar=3,7&orgType=Funder,Accelerator",
      rationale: "Capital deployers source pipeline through funds and accelerators.",
    },
    "understand-gaps": {
      href: "/ecosystem-health",
      rationale: "Capital gaps and coordination needs are ecosystem-health questions.",
    },
  },
  educator: {
    "get-started": {
      href: "/journeys/educator",
      rationale: "Educators need the alignment path from demand to sustained programs.",
    },
    "connect-with-others": {
      href: "/map?pillar=1,2,4,6,7",
      rationale: "Education work depends on market demand, talent, and program partners.",
    },
    "find-resources": {
      href: "/map?pillar=3,4,8&orgType=University,Government,Funder",
      rationale: "Program sustainability depends on education, funding, and policy partners.",
    },
  },
  edo: {
    "explore-ecosystem": {
      href: "/map?pillar=1,3,4,6,7,8,9,10",
      rationale: "Ecosystem builders need the broadest operating map.",
    },
    "understand-gaps": {
      href: "/ecosystem-health",
      rationale: "EDO gap diagnosis belongs in the health and data-quality context.",
    },
    "connect-with-others": {
      href: "/map?pillar=6,8,9,10",
      rationale: "Coordination work centers on community, policy, platform, and governance.",
    },
  },
  corporate: {
    "explore-ecosystem": {
      href: "/map?pillar=1,2,5,7,9",
      rationale: "Corporate buyers need customer, talent, services, program, and platform context.",
    },
    "find-resources": {
      href: "/map?pillar=1,2,5,7&stage=Growth,Scale",
      rationale: "Buyers need venture partners, talent pipelines, and service support.",
    },
    "connect-with-others": {
      href: "/map?pillar=1,7,8&orgType=Corporate,Accelerator,Government",
      rationale: "Corporate pilots require program and policy partner connections.",
    },
  },
  service: {
    "get-started": {
      href: "/journeys/service",
      rationale: "Service providers need guidance on trust-building before selling.",
    },
    "connect-with-others": {
      href: "/map?pillar=4,6,7,9",
      rationale: "Trusted service work starts in communities, programs, and shared platforms.",
    },
    "find-resources": {
      href: "/map?pillar=1,2,5,7&stage=PreSeed,Seed,Growth",
      rationale: "Providers need founders, enterprise demand, and adjacent services.",
    },
  },
  policy: {
    "get-started": {
      href: "/journeys/policy",
      rationale: "Policy leaders need the diagnosis-to-enablement path.",
    },
    "understand-gaps": {
      href: "/ecosystem-health",
      rationale: "Policy gap diagnosis belongs in the health and gap context.",
    },
    "connect-with-others": {
      href: "/map?pillar=3,4,7,8,10&orgType=Government,University,Funder,Accelerator",
      rationale: "Policy work convenes funding, education, programs, and governance.",
    },
  },
} as const satisfies Record<
  RoleId,
  Partial<Record<IntentId, { href: string; rationale: string }>>
>;

export function getIntentsForRole(roleId: RoleId): Intent[] {
  const routes = ROLE_INTENT_ROUTES[roleId] as Partial<
    Record<IntentId, { href: string; rationale: string }>
  >;
  return ALL_INTENTS.filter((intent) => intent.id in routes);
}

export function getIntentRoute(
  roleId: RoleId,
  intentId: IntentId,
): RoleIntentRoute | undefined {
  const routes = ROLE_INTENT_ROUTES[roleId] as Partial<
    Record<IntentId, { href: string; rationale: string }>
  >;
  const route = routes[intentId];

  if (!route) {
    return undefined;
  }

  return {
    roleId,
    intentId,
    href: route.href,
    rationale: route.rationale,
  };
}

const routes = Object.entries(ROLE_INTENT_ROUTES).flatMap(([roleId, intents]) =>
  Object.entries(intents).map(([intentId, route]) => ({
    roleId,
    intentId,
    ...route,
  })),
);

z.array(IntentSchema).parse(ALL_INTENTS);
z.array(RoleIntentRouteSchema).parse(routes);
