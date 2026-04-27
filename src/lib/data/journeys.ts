import { z } from "zod/v4";
import { JourneySchema } from "@/lib/types";
import type { Journey } from "@/lib/types";

const journeys: Journey[] = [
  {
    roleId: "startup",
    title: "Founder's Journey",
    steps: [
      {
        base: "1st Base",
        label: "Get educated & connected",
        pillars: [4, 6],
        strategy:
          "Find a program that fits where you are — FLI, eBridge, STC, or UTRGV. Join a peer community. Build your foundation before you pitch anyone anything. The community you find here is your safety net and your first feedback loop.",
      },
      {
        base: "2nd Base",
        label: "Build & get supported",
        pillars: [7, 5],
        strategy:
          "Enter an accelerator or incubator. Access legal, financial, and advisory support to sharpen your model. eBridge and FLI are Brownsville anchors; 1909 and STC serve McAllen. Stage-appropriate support matters — too much too soon creates dependency, too little leaves you stuck.",
      },
      {
        base: "3rd Base",
        label: "Raise capital & build your team",
        pillars: [3, 2],
        strategy:
          "Access EDA grants, SBA programs, and SBDC resources before you go anywhere near equity. Start recruiting from UTRGV, STC, and TSTC. Local angel networks are emerging — build relationships with potential investors long before you need a check.",
      },
      {
        base: "Home Plate",
        label: "Land customers & scale",
        pillars: [1, 8],
        strategy:
          "Land your first institutional customer — SpaceX, DHR Health, a city contract, a school district pilot. Then engage BEDC, MEDC, and your congressional office to unlock larger procurement and policy opportunities. One anchor customer changes everything.",
      },
    ],
  },
  {
    roleId: "student",
    title: "Builder's Entry Path",
    steps: [
      {
        base: "1st Base",
        label: "Learn & find your people",
        pillars: [4, 6],
        strategy:
          "UTRGV, STC, TSTC, and FLI are your starting points. Don't just take classes — join communities. FLI Ambassador Program and founder peer groups connect you to people who are building real things right now.",
      },
      {
        base: "2nd Base",
        label: "Build real things",
        pillars: [7, 2],
        strategy:
          "Join an accelerator or innovation program. Work alongside other builders. FLI and UTRGV's Innovation Hub both offer real project environments where you ship something before you graduate.",
      },
      {
        base: "3rd Base",
        label: "Professionalize & get funded",
        pillars: [5, 3],
        strategy:
          "Access SBDC advising and legal/financial support early. Apply for grants, competitions, and workforce programs. TX Workforce Commission and EDA have tracks that apply to emerging builders — you don't have to wait until you have a company.",
      },
      {
        base: "Home Plate",
        label: "Launch & lead from the front",
        pillars: [1, 10],
        strategy:
          "Find real customers. Land a pilot with an institution or local business. Then mentor someone coming up behind you — that's how ecosystems regenerate. Leadership in this ecosystem is about what you give back, not just what you build.",
      },
    ],
  },
  {
    roleId: "investor",
    title: "Capital Deployer's Path",
    steps: [
      {
        base: "1st Base",
        label: "Map the full system first",
        pillars: [9, 10],
        strategy:
          "Use the shared platform and understand governance structures before you deploy. Know who sets standards and who's accountable. The RGV lacks a formal investor coordination layer — your presence here helps create one. That's leverage.",
      },
      {
        base: "2nd Base",
        label: "Source the pipeline",
        pillars: [7, 4],
        strategy:
          "Connect with eBridge, FLI, UTRGV's Innovation Hub, and STC to find companies at the right stage. These programs are your deal flow infrastructure — treat them accordingly and invest in their health.",
      },
      {
        base: "3rd Base",
        label: "Evaluate talent depth & diligence",
        pillars: [2, 5],
        strategy:
          "Assess the talent pool behind each venture. Engage regional CPAs and legal firms with startup experience. The talent base is growing — verify depth, not just founder brilliance. Teams survive pivots; solo founders often don't.",
      },
      {
        base: "Home Plate",
        label: "Deploy & become a regional anchor",
        pillars: [1, 8],
        strategy:
          "Connect portfolio companies to innovation customers like SpaceX, DHR, and city governments. Engage BEDC, MEDC, and congressional offices to open procurement doors. Anchor investors in the RGV become ecosystem builders by default.",
      },
    ],
  },
  {
    roleId: "educator",
    title: "Educator's Alignment Path",
    steps: [
      {
        base: "1st Base",
        label: "See the whole system first",
        pillars: [9, 10],
        strategy:
          "Understand real ecosystem demand signals before designing curriculum. Know what SpaceX, DHR, the cities, and growing local ventures actually need from graduates — not just what credentialing bodies require.",
      },
      {
        base: "2nd Base",
        label: "Connect programs to market",
        pillars: [6, 7],
        strategy:
          "Partner with accelerators and embed faculty and students in real community and market contexts. FLI, eBridge, and 1909 are natural co-design partners. Curriculum that's co-designed with the ecosystem produces graduates the ecosystem actually hires.",
      },
      {
        base: "3rd Base",
        label: "Align outcomes to real demand",
        pillars: [1, 2],
        strategy:
          "Build curriculum toward customer needs and talent gaps. Create pathways that end in real jobs, contracts, and ventures — not just credentials. SpaceX, DHR, and growing ventures need specific skills that you can help develop.",
      },
      {
        base: "Home Plate",
        label: "Advocate & sustain your programs",
        pillars: [3, 8],
        strategy:
          "Leverage EDA, USDA, and TWC funding to sustain pipelines long-term. Be present and vocal at the BEDC, MEDC, and RGVEDA policy table. Your data on graduate outcomes is the ecosystem's most credible evidence for continued investment.",
      },
    ],
  },
  {
    roleId: "edo",
    title: "Ecosystem Builder's Path",
    steps: [
      {
        base: "1st Base",
        label: "Map it before you build it",
        pillars: [9, 10],
        strategy:
          "Build shared platforms and accountability structures before programming. Establish who's responsible for what across the region. You cannot steward what you cannot see — and the RGV's primary bottleneck is coordination, not energy or talent.",
      },
      {
        base: "2nd Base",
        label: "Enable pipelines & policy",
        pillars: [4, 8],
        strategy:
          "Align UTRGV, STC, and TSTC to real demand. Create enabling conditions at the BEDC, MEDC, and county level. Education and policy alignment are your highest-leverage moves — everything else builds on them.",
      },
      {
        base: "3rd Base",
        label: "Activate programs & community",
        pillars: [7, 6],
        strategy:
          "Fund and support eBridge, FLI, and 1909. Cultivate trust networks between actors across the ecosystem. The chambers, young professionals, and peer groups are your connective tissue — invest in them.",
      },
      {
        base: "Home Plate",
        label: "Drive demand & attract capital",
        pillars: [1, 3],
        strategy:
          "Actively recruit innovation customers to the RGV. Build relationships with EDA, angel networks, and venture funds who can see the region's potential. Make outcomes visible publicly — that's your best tool for attracting more of the same.",
      },
    ],
  },
  {
    roleId: "corporate",
    title: "Innovation Buyer's Path",
    steps: [
      {
        base: "1st Base",
        label: "Map who builds what",
        pillars: [9, 10],
        strategy:
          "Understand the ecosystem before you reach out to anyone. Know the governance structures, credentialing systems, and which programs produce the talent and ventures you need. Approaching the RGV without this map creates friction on both sides.",
      },
      {
        base: "2nd Base",
        label: "Source talent & venture partners",
        pillars: [7, 2],
        strategy:
          "Connect with eBridge, FLI, UTRGV, and STC to find venture partners and talent pipelines. These programs know who's ready and can do the first filter for you. Treat them as partners, not vendors.",
      },
      {
        base: "3rd Base",
        label: "Navigate policy & contracting",
        pillars: [8, 5],
        strategy:
          "Understand incentive programs from BEDC, MEDC, and county offices. Know compliance requirements and contracting pathways specific to the RGV. Use regional legal and accounting firms who know the terrain — they'll save you months.",
      },
      {
        base: "Home Plate",
        label: "Pilot, adopt & anchor the region",
        pillars: [1, 3],
        strategy:
          "Pilot solutions from local ventures. Then become a capital anchor — invest in the ecosystem that feeds your pipeline. SpaceX's presence in Boca Chica already demonstrated what one anchor customer can do for an entire regional ecosystem.",
      },
    ],
  },
  {
    roleId: "service",
    title: "Service Provider's Path",
    steps: [
      {
        base: "1st Base",
        label: "Show up before you pitch",
        pillars: [6, 9],
        strategy:
          "Join the chambers, FLI's community, and founder peer groups. Get listed on the ecosystem map. Earn trust by being present and useful long before you ask for business. The RGV ecosystem rewards consistent, visible contribution.",
      },
      {
        base: "2nd Base",
        label: "Embed in programs",
        pillars: [7, 4],
        strategy:
          "Become a trusted resource inside FLI, eBridge, and UTRGV's programs. Be useful without being extractive — stage-appropriate service is the whole game. Over-servicing early-stage founders creates dependency, not growth.",
      },
      {
        base: "3rd Base",
        label: "Serve founders & enterprises",
        pillars: [2, 1],
        strategy:
          "Support founders at the right stage. Build relationships with the enterprise clients — SpaceX, DHR, the city governments — who need your expertise at scale. The two sides of the market require very different engagement approaches.",
      },
      {
        base: "Home Plate",
        label: "Sustain & grow with the ecosystem",
        pillars: [10, 3],
        strategy:
          "Meet governance and ethical standards set by RGVEDA and BEDC/MEDC. Build capital relationships that help your practice grow alongside the region. Your long-term success is structurally tied to the ecosystem's health.",
      },
    ],
  },
  {
    roleId: "policy",
    title: "Policy Leader's Path",
    steps: [
      {
        base: "1st Base",
        label: "Diagnose the system honestly",
        pillars: [9, 10],
        strategy:
          "Understand what's working and what structural barriers exist before you write policy. Map the gaps — especially in capital, platform infrastructure, and coordination. Evidence-based diagnosis is what separates ecosystem policy from political signaling.",
      },
      {
        base: "2nd Base",
        label: "Enable pipelines & remove barriers",
        pillars: [8, 4],
        strategy:
          "Create policy incentives for talent development and education. Work with UTRGV, STC, TSTC, and FLI to remove friction between learning and earning. Workforce development policy that doesn't connect to real ecosystem demand is wasted.",
      },
      {
        base: "3rd Base",
        label: "Catalyze capital & programs",
        pillars: [7, 3],
        strategy:
          "Fund incubators and accelerators. Use EDA, USDA, and TWC programs to attract patient capital. Remove the structural friction points that keep money from reaching founders — especially first-generation entrepreneurs from underrepresented communities.",
      },
      {
        base: "Home Plate",
        label: "Connect demand & celebrate impact",
        pillars: [1, 6],
        strategy:
          "Connect innovation customers to local ventures through active brokerage — not passive waiting. Then celebrate outcomes publicly with the chambers and community. What gets celebrated publicly gets replicated. That's the ecosystem flywheel in action.",
      },
    ],
  },
];

z.array(JourneySchema).parse(journeys);

export const ALL_JOURNEYS: readonly Journey[] = journeys;
