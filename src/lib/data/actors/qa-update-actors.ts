import type { Actor } from "@/lib/types";
import { withActorCoordinates } from "./coordinates";

const FILL_URL = "[FILL: actor URL]";
const FILL_THUMBNAIL = "[FILL: thumbnail source]";
const FILL_PILLAR = "[FILL: target pillar]";
const FILL_NOTES = "[FILL: verification notes]";
const QA_DATE = "2026-04-26";

type QaActorInput = {
  name: string;
  pillars?: number[];
  websiteUrl?: string;
  thumbnailUrl?: string;
  qaStatus?: Actor["qaStatus"];
  internalNotes?: string;
  orgType?: Actor["orgType"];
  stagesServed?: Actor["stagesServed"];
  city?: string;
  county?: Actor["county"];
  publicVisibility?: Actor["publicVisibility"];
};

const duplicateReviewNames = new Set([
  "Rio Grande Valley Partnership",
  "South Texas Manufacturing Association",
  "South Texas Manufacturers Association",
  "Business Development Fund",
  "Business Development Fund of Texas",
]);

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferCounty(name: string): Actor["county"] {
  const normalized = name.toLowerCase();
  if (
    normalized.includes("brownsville") ||
    normalized.includes("cameron") ||
    normalized.includes("harlingen")
  ) {
    return "Cameron";
  }
  if (
    normalized.includes("mcallen") ||
    normalized.includes("hidalgo") ||
    normalized.includes("alton") ||
    normalized.includes("pharr")
  ) {
    return "Hidalgo";
  }
  if (
    normalized.includes("austin") ||
    normalized.includes("san antonio") ||
    normalized.includes("texas congressional") ||
    normalized.includes("texas venture")
  ) {
    return "OutsideRGV";
  }
  return "OutsideRGV";
}

function inferCity(name: string): string {
  const normalized = name.toLowerCase();
  if (normalized.includes("brownsville")) return "Brownsville";
  if (normalized.includes("mcallen")) return "McAllen";
  if (normalized.includes("hidalgo")) return "Edinburg";
  if (normalized.includes("cameron")) return "Brownsville";
  if (normalized.includes("alton")) return "Alton";
  if (normalized.includes("pharr")) return "Pharr";
  if (normalized.includes("harlingen")) return "Harlingen";
  if (normalized.includes("san antonio")) return "San Antonio";
  if (normalized.includes("austin")) return "Austin";
  return "[FILL: verification notes]";
}

function makeQaActor(input: QaActorInput, index: number): Actor {
  const slug = slugify(input.name);
  const pillars = input.pillars ?? [];
  const duplicateNote = duplicateReviewNames.has(input.name)
    ? " Potential duplicate or naming variant. Verify before deduplication."
    : "";
  const notes =
    input.internalNotes ??
    `Added from QA notes. Cross-reference website to confirm pillar placement.${duplicateNote}`;

  return {
    id: `actor-qa-${String(index + 1).padStart(3, "0")}-${slug}`,
    name: input.name,
    slug: `qa-${String(index + 1).padStart(3, "0")}-${slug}`,
    orgType: input.orgType ?? "Community",
    pillars,
    pillarAssignments:
      pillars.length > 0 ? pillars.map((pillar) => `Pillar ${pillar}`) : [FILL_PILLAR],
    city: input.city ?? inferCity(input.name),
    county: input.county ?? inferCounty(input.name),
    description: notes,
    whatTheyOffer: [FILL_NOTES],
    whoTheyServe: [FILL_NOTES],
    status: "Emerging",
    stagesServed: input.stagesServed,
    qaStatus:
      input.qaStatus ??
      (pillars.length === 0
        ? "needs_pillar_review"
        : input.websiteUrl
          ? "needs_thumbnail"
          : "needs_url"),
    websiteUrl: input.websiteUrl ?? FILL_URL,
    thumbnailUrl: input.thumbnailUrl ?? FILL_THUMBNAIL,
    internalNotes: notes,
    publicVisibility:
      input.publicVisibility ??
      (pillars.length > 0 && input.websiteUrl ? "public" : "internal"),
    verificationStatus: input.qaStatus ?? "needs_pillar_review",
    dateAdded: QA_DATE,
    lastVerified: QA_DATE,
    verifiedBy: "qa-update-prd",
    communitySubmitted: false,
  };
}

const qaActorInputs: QaActorInput[] = [
  { name: "eBridge Center for Business & Commercialization", websiteUrl: "https://ebridgecenter.com/" },
  { name: "Brownsville Community Improvement Corporation", websiteUrl: "https://brownsvillecic.com/" },
  { name: "Greater Brownsville Incentives Corporation", websiteUrl: "https://greaterbrownsville.com/" },
  { name: "UTRGV Center for Innovation & Commercialization", websiteUrl: "https://www.utrgv.edu/rcvcobe/center-for-innovation-and-commercialization/" },
  { name: "Brownsville Chamber", websiteUrl: "https://brownsvillechamber.com/" },
  { name: "Leadership Brownsville", websiteUrl: "https://brownsvillechamber.com/leadership-brownsville/" },
  { name: "RGV Startup Week", websiteUrl: "https://www.rgvstartup.com/" },
  { name: "StartUp Texas", websiteUrl: "https://www.rgvstartup.com/" },
  { name: "City of Brownsville, TX - Municipal Government", websiteUrl: "https://www.brownsvilletx.gov/" },
  { name: "Port of Brownsville, TX", websiteUrl: "https://www.portofbrownsville.com/" },
  { name: "Mitte Cultural District", websiteUrl: "https://mitteculturaldistrict.org/" },
  { name: "RGV LEAD - Rio Grande Valley Linking Economic and Academic Development", websiteUrl: "https://www.rgvlead.org/" },
  { name: "RGV FOCUS", websiteUrl: "https://edtx.org/program/rgv-focus/" },
  { name: "South Texas Manufacturing Association", websiteUrl: "https://stma-tx.org/" },
  { name: "Region One Education Service Center", websiteUrl: "https://www.esc1.net/" },
  { name: "Region One Gear Up", websiteUrl: "https://www.esc1.net/services/family/gear-up" },
  { name: "BISD", websiteUrl: "https://www.bisd.us/" },
  { name: "Rio Grande Guardian", websiteUrl: "https://riograndeguardian.com/" },
  { name: "TSC", websiteUrl: "https://www.tsc.edu/" },
  { name: "TSC Performing Arts Center", websiteUrl: "https://www.tsc.edu/institutional-divisions/institutional-advancement/facility-rentals/texas-southmost-college-performing-arts-center/" },
  { name: "Cameron County Education Initiative CCEI", websiteUrl: "https://www.myccei.org/" },
  { name: "ITEC", websiteUrl: "https://www.tsc.edu/institutional-divisions/institutional-advancement/facility-rentals/itec-center/" },
  { name: "CEO Brownsville", websiteUrl: "https://www.facebook.com/CEOBrownsville/" },
  { name: "Cameron County Regional Mobility", websiteUrl: "https://ccrma.org/" },
  { name: "Index Reynosa", websiteUrl: "https://indexreynosa.org.mx/" },
  { name: "Index Matamoros", websiteUrl: "https://www.indexmatamoros.org.mx/" },
  { name: "Index Nuevo Laredo", websiteUrl: "https://www.indexnld.org.mx/" },
  { name: "Index Nuevo Leon", websiteUrl: "https://indexnuevoleon.org.mx/en/" },
  { name: "ProMexico Industry", websiteUrl: "https://www.promexicoindustry.com/" },
  { name: "Asociacion de Maquiladoras de Matamoros", websiteUrl: "https://www.indexmatamoros.org.mx/" },
  { name: "CODEMatamoros" },
  { name: "South Texas Manufacturers Association", websiteUrl: "https://stma-tx.org/" },
  { name: "Cobifer" },
  { name: "Rio-South Texas Education & Community Develop", websiteUrl: "https://rstef.org/" },
  { name: "Collaborative Action Board", websiteUrl: "https://sph.uth.edu/research/centers/hispanic-health/tu-salud-si-cuenta/our-initiatives/collaborative-action-board" },
  { name: "TSTC Harlingen", websiteUrl: "https://www.tstc.edu/campuses/harlingen/" },
  { name: "Texas Border Business", websiteUrl: "https://texasborderbusiness.com/" },
  { name: "RGV Builders Association", websiteUrl: "https://rgvba.org/" },
  { name: "Brownsville SpaceX", websiteUrl: "https://www.spacex.com/vehicles/starship" },
  { name: "Brownsville Public Utilities Board", websiteUrl: "https://www.brownsville-pub.com/" },
  { name: "Brownsville Parks & Recreation Department", websiteUrl: "https://www.brownsvilletx.gov/308/Parks-Recreation" },
  { name: "Brownsville Historical Association", websiteUrl: "https://www.brownsvillehistory.org/" },
  { name: "Brownsville Museum of Fine Art", websiteUrl: "https://bmfa.us/" },
  { name: "Gladys Porter Zoo", websiteUrl: "https://gpz.org/" },
  { name: "Brownsville Wellness Coalition", websiteUrl: "https://www.brownsvillewellnesscoalition.com/" },
  { name: "Brownsville Farmers Market", websiteUrl: "https://www.brownsvillewellnesscoalition.com/" },
  { name: "Historic Brownsville Museum", websiteUrl: "https://www.brownsvillehistory.org/historic-brownsville-museum.html" },
  { name: "Holiday Village", websiteUrl: "https://holidayvillagebrownsville.com/" },
  { name: "Brownsville Living", websiteUrl: "https://www.brownsvillelife.com/" },
  { name: "Ride for Rotary", websiteUrl: "https://rotarybrownsvillehistoric.org/event/ride-for-rotary" },
  { name: "The Rotary Club of Historic Brownsville", websiteUrl: "https://rotarybrownsvillehistoric.org/" },
  { name: "Brownsville Careers & Technical Training", websiteUrl: "https://www.bisd.us/page/career-technical-education" },
  { name: "Keep Brownsville Beautiful", websiteUrl: "https://www.facebook.com/KBB.BTX/" },
  { name: "BTX Downtown First Friday", websiteUrl: "https://www.facebook.com/FirstFridayDTBrownsville/" },
  { name: "Grants and Community Development Department", websiteUrl: "https://www.brownsvilletx.gov/375/Grants-and-Community-Development" },
  { name: "Brownsville South Padre Island Airport", websiteUrl: "https://flybrownsville.com/" },
  { name: "Visit Brownsville TX", websiteUrl: "https://visitbtx.com/" },
  { name: "Caracara Trail", websiteUrl: "https://caracaratrails.org/" },
  { name: "West Rail Trail", websiteUrl: "https://caracaratrails.org/trails/west-rail-trail-2/" },
  { name: "Belden Trail", websiteUrl: "https://www.brownsvilletx.gov/308/Parks-Recreation" },
  { name: "ROCA at Brownsville Performing Arts Academy/George RamÃ­rez PAA" },
  { name: "CycloBia Brownsville", websiteUrl: "https://www.brownsvilletx.gov/308/Parks-Recreation" },
  { name: "Brownsville Society of Performing Arts", websiteUrl: "https://brosoperformingarts.org/" },
  { name: "Youth Build", websiteUrl: "https://cdcb.org/youthbuild/" },
  { name: "CDCB", websiteUrl: "https://cdcb.org/" },
  { name: "Buho", websiteUrl: "https://www.buhobtx.com/" },
  { name: "Mr Amigo Association", websiteUrl: "https://www.mramigo.net/" },
  { name: "Crossroads Festival" },
  { name: "AIA Lower Rio Grande Architects", websiteUrl: "https://lrgvaia.org/" },
  { name: "Brownsville Community Foundation", websiteUrl: "https://www.rbvfoundation.org/" },
  { name: "Expanding Frontiers" },
  { name: "Dean Porter Park Renovation Inc" },
  { name: "Hike & Bike Trails", websiteUrl: "https://caracaratrails.org/trails/" },
  { name: "Old City Cemetary Center", websiteUrl: "https://www.brownsvillehistory.org/old-city-cemetery-center.html" },
  { name: "South Texas Ecotourism", websiteUrl: "https://www.cameroncountytx.gov/south-texas-ecotourism-center/" },
  { name: "The Challenge RGV", websiteUrl: "https://sph.uth.edu/research/centers/hispanic-health/tu-salud-si-cuenta/our-initiatives/the-challenge-rgv/" },
  { name: "Revitalize Downtown Brownsville", websiteUrl: "https://brownsvillecic.com/community-projects/big-program/" },
  { name: "Via Americas Front Door Reimagined" },
  { name: "Zonta Club", websiteUrl: "https://www.facebook.com/p/Zonta-Club-of-Brownsville-61568325620539/" },
  { name: "Conoce Matamoros", websiteUrl: "https://www.conocematamoros.com.mx/" },
  { name: "Museo MACT" },
  { name: "City of San Antonio", websiteUrl: "https://www.sa.gov/" },
  { name: "City of Austin", websiteUrl: "https://www.austintexas.gov/" },
  { name: "Business Development Fund of Texas", websiteUrl: "https://www.bdfoftexas.com/" },
  { name: "The Texas Bucket List", websiteUrl: "https://thetexasbucketlist.com/" },
  { name: "UTRGV Rusteburg Art Gallery", websiteUrl: "https://www.utrgv.edu/cofa/schools-and-departments/school-of-art-and-design/galleries/index.htm" },
  { name: "SPI Life", websiteUrl: "https://spilife.com/" },
  { name: "Valley Alliance of Mentors for Opp & Scholarship", websiteUrl: "https://www.vamosscholars.org/" },
  { name: "VIDA Valley Initiative", websiteUrl: "https://vidacareers.org/" },
  {
    name: "Trade Schools",
    pillars: [2],
    internalNotes:
      "QA notes specify inclusion in Pillar 2 because the talent pool is large.",
  },
  {
    name: "Hidalgo County School Districts",
    pillars: [4],
    qaStatus: "needs_url",
    internalNotes: "Added to Pillar 4 from QA notes.",
  },
  {
    name: "Jubilee Schools",
    pillars: [4],
    qaStatus: "needs_url",
    internalNotes: "Added to Pillar 4 from QA notes.",
  },
  {
    name: "Alpha School",
    pillars: [4],
    qaStatus: "needs_url",
    internalNotes: "Added to Pillar 4 from QA notes.",
  },
  {
    name: "South Texas ISD",
    pillars: [4],
    qaStatus: "needs_url",
    internalNotes: "Added to Pillar 4 from QA notes.",
  },
  {
    name: "RGV Partnership",
    pillars: [6],
    websiteUrl: "https://rgvpartnership.com/",
    internalNotes:
      "Canonical actor retained per user direction. Merged from Rio Grande Valley Partnership naming variant.",
  },
  {
    name: "Fem City",
    pillars: [6],
    websiteUrl: "https://femcity.com/brownsville-tx",
    publicVisibility: "public",
    internalNotes:
      "QA notes reference both Brownsville and McAllen pages. Additional URL: https://femcity.com/mcallen-tx",
  },
  { name: "Chamber of Commerce for Hidalgo County", pillars: [6] },
  { name: "RGV Tech Club", pillars: [6] },
  { name: "1 Million Cups Brownsville", websiteUrl: "https://www.1millioncups.com/s/account/0014W00002mtNjNQAU/brownsville-tx", pillars: [6] },
  { name: "1 Million Cups McAllen", pillars: [6] },
  { name: "1 Million Cups Alton", pillars: [6] },
  {
    name: "EBridge Business Academy",
    pillars: [7],
    websiteUrl: "https://www.ebridgebusinessacademy.com/",
    orgType: "Accelerator",
    stagesServed: ["Idea", "PreSeed", "Seed"],
    publicVisibility: "public",
    internalNotes:
      "User-confirmed Pillar 7 accelerator. Official website provided by user.",
  },
  {
    name: "UTRGV Center for Innovation and Commercialization (CIC)",
    pillars: [7],
    internalNotes:
      "QA notes also reference UTRGV Center for Innovation & Commercialization. Verify canonical naming before deduplication.",
  },
  { name: "Pharr Global Business Hub", pillars: [7] },
  { name: "Texas Congressional Offices", pillars: [8] },
  {
    name: "Texas Venture Alliance / Texas Venture Fest",
    pillars: [8],
    internalNotes:
      "Verify whether this should be one combined actor or two separate actors.",
  },
  {
    name: "Rio South Texas Economic Council",
    pillars: [9],
    websiteUrl: "https://riosouthtexasregion.com/",
    publicVisibility: "public",
    internalNotes: "Added from Pillar 9 QA notes.",
  },
  {
    name: "Auto Cluster Rio South Texas",
    pillars: [9],
    websiteUrl: "https://autocluster.riosouthtexasregion.com/public-dashboard",
    publicVisibility: "public",
    internalNotes: "Added from Pillar 9 QA notes. Verify canonical actor name.",
  },
  {
    name: "COSTEP",
    pillars: [9],
    websiteUrl: "https://riosouthtexasregion.com/",
    publicVisibility: "public",
    internalNotes: "Added from Pillar 9 QA notes.",
  },
];

export const QA_UPDATE_ACTORS: Actor[] = withActorCoordinates(
  qaActorInputs.map(makeQaActor),
);
