import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";

const actorValidator = v.any();
const pillarValidator = v.any();
const gapValidator = v.any();
const roleValidator = v.any();
const journeyValidator = v.any();

async function replaceByNaturalKey(
  ctx: MutationCtx,
  tableName: "actors" | "pillars" | "gaps" | "roles",
  value: string | number,
  document: Record<string, unknown>,
) {
  const existing =
    tableName === "actors"
      ? await ctx.db
          .query("actors")
          .withIndex("by_actor_id", (q) => q.eq("id", value as string))
          .unique()
      : tableName === "pillars"
        ? await ctx.db
            .query("pillars")
            .withIndex("by_pillar_id", (q) => q.eq("id", value as number))
            .unique()
        : tableName === "gaps"
          ? await ctx.db
              .query("gaps")
              .withIndex("by_gap_id", (q) => q.eq("id", value as string))
              .unique()
          : await ctx.db
              .query("roles")
              .withIndex("by_role_id", (q) => q.eq("id", value as string))
              .unique();
  if (existing) {
    const { createdAt, ...patch } = document;
    void createdAt;
    await ctx.db.patch(existing._id, patch);
    return;
  }
  await ctx.db.insert(tableName, document as never);
}

export const upsertSeedData = internalMutation({
  args: {
    actors: v.array(actorValidator),
    pillars: v.array(pillarValidator),
    gaps: v.array(gapValidator),
    roles: v.array(roleValidator),
    journeys: v.array(journeyValidator),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    for (const [sortOrder, pillar] of args.pillars.entries()) {
      await replaceByNaturalKey(ctx, "pillars", pillar.id, {
        ...pillar,
        sortOrder,
        updatedAt: now,
        createdAt: now,
      });
    }

    for (const [sortOrder, actor] of args.actors.entries()) {
      await replaceByNaturalKey(ctx, "actors", actor.id, {
        ...actor,
        sortOrder,
        updatedAt: now,
        createdAt: now,
      });
    }

    for (const [sortOrder, gap] of args.gaps.entries()) {
      await replaceByNaturalKey(ctx, "gaps", gap.id, {
        ...gap,
        sortOrder,
        updatedAt: now,
        createdAt: now,
      });
    }

    for (const [sortOrder, role] of args.roles.entries()) {
      await replaceByNaturalKey(ctx, "roles", role.id, {
        ...role,
        sortOrder,
        updatedAt: now,
        createdAt: now,
      });
    }

    for (const [sortOrder, journey] of args.journeys.entries()) {
      const existing = await ctx.db
        .query("journeys")
        .withIndex("by_role", (q) => q.eq("roleId", journey.roleId))
        .unique();
      const document = { ...journey, sortOrder, updatedAt: now, createdAt: now };
      if (existing) {
        await ctx.db.patch(existing._id, document);
      } else {
        await ctx.db.insert("journeys", document);
      }
    }

    return {
      actors: args.actors.length,
      pillars: args.pillars.length,
      gaps: args.gaps.length,
      roles: args.roles.length,
      journeys: args.journeys.length,
    };
  },
});

const ACTOR_URL_MAP: { name: string; url: string }[] = [
  { name: "eBridge Center for Business & Commercialization", url: "https://ebridgecenter.com/" },
  { name: "Brownsville Community Improvement Corporation", url: "https://brownsvillecic.com/" },
  { name: "Greater Brownsville Incentives Corporation", url: "https://greaterbrownsville.com/" },
  { name: "UTRGV Center for Innovation & Commercialization", url: "https://www.utrgv.edu/rcvcobe/center-for-innovation-and-commercialization/" },
  { name: "Brownsville Chamber", url: "https://brownsvillechamber.com/" },
  { name: "COSTEP", url: "https://riosouthtexasregion.com/" },
  { name: "1 Million Cups Brownsville", url: "https://www.1millioncups.com/s/account/0014W00002mtNjNQAU/brownsville-tx" },
  { name: "Leadership Brownsville", url: "https://brownsvillechamber.com/leadership-brownsville/" },
  { name: "RGV Startup Week", url: "https://www.rgvstartup.com/" },
  { name: "StartUp Texas", url: "https://www.rgvstartup.com/" },
  { name: "City of Brownsville, TX - Municipal Government", url: "https://www.brownsvilletx.gov/" },
  { name: "Port of Brownsville, TX", url: "https://www.portofbrownsville.com/" },
  { name: "Mitte Cultural District", url: "https://mitteculturaldistrict.org/" },
  { name: "RGV LEAD - Rio Grande Valley Linking Economic and Academic Development", url: "https://www.rgvlead.org/" },
  { name: "RGV FOCUS", url: "https://edtx.org/program/rgv-focus/" },
  { name: "South Texas Manufacturing Association", url: "https://stma-tx.org/" },
  { name: "Region One Education Service Center", url: "https://www.esc1.net/" },
  { name: "Region One Gear Up", url: "https://www.esc1.net/services/family/gear-up" },
  { name: "BISD", url: "https://www.bisd.us/" },
  { name: "Rio Grande Guardian", url: "https://riograndeguardian.com/" },
  { name: "TSC", url: "https://www.tsc.edu/" },
  { name: "TSC Performing Arts Center", url: "https://www.tsc.edu/institutional-divisions/institutional-advancement/facility-rentals/texas-southmost-college-performing-arts-center/" },
  { name: "Cameron County Education Initiative CCEI", url: "https://www.myccei.org/" },
  { name: "ITEC", url: "https://www.tsc.edu/institutional-divisions/institutional-advancement/facility-rentals/itec-center/" },
  { name: "CEO Brownsville", url: "https://www.facebook.com/CEOBrownsville/" },
  { name: "Cameron County Regional Mobility", url: "https://ccrma.org/" },
  { name: "Index Reynosa", url: "https://indexreynosa.org.mx/" },
  { name: "Index Matamoros", url: "https://www.indexmatamoros.org.mx/" },
  { name: "Index Nuevo Laredo", url: "https://www.indexnld.org.mx/" },
  { name: "Index Nuevo Leon", url: "https://indexnuevoleon.org.mx/en/" },
  { name: "ProMexico Industry", url: "https://www.promexicoindustry.com/" },
  { name: "Asociacion de Maquiladoras de Matamoros", url: "https://www.indexmatamoros.org.mx/" },
  { name: "South Texas Manufacturers Association", url: "https://stma-tx.org/" },
  { name: "Rio Grande Valley Partnership", url: "https://rgvpartnership.com/" },
  { name: "Rio South Texas Economic Council", url: "https://riosouthtexasregion.com/" },
  { name: "Rio-South Texas Education & Community Develop", url: "https://rstef.org/" },
  { name: "Collaborative Action Board", url: "https://sph.uth.edu/research/centers/hispanic-health/tu-salud-si-cuenta/our-initiatives/collaborative-action-board" },
  { name: "TSTC Harlingen", url: "https://www.tstc.edu/campuses/harlingen/" },
  { name: "Business Development Fund", url: "https://www.bdfoftexas.com/" },
  { name: "Texas Border Business", url: "https://texasborderbusiness.com/" },
  { name: "RGV Builders Association", url: "https://rgvba.org/" },
  { name: "Brownsville SpaceX", url: "https://www.spacex.com/vehicles/starship" },
  { name: "Brownsville Public Utilities Board", url: "https://www.brownsville-pub.com/" },
  { name: "Brownsville Parks & Recreation Department", url: "https://www.brownsvilletx.gov/308/Parks-Recreation" },
  { name: "Brownsville Historical Association", url: "https://www.brownsvillehistory.org/" },
  { name: "Brownsville Museum of Fine Art", url: "https://bmfa.us/" },
  { name: "Gladys Porter Zoo", url: "https://gpz.org/" },
  { name: "Brownsville Wellness Coalition", url: "https://www.brownsvillewellnesscoalition.com/" },
  { name: "Brownsville Farmers Market", url: "https://www.brownsvillewellnesscoalition.com/" },
  { name: "Historic Brownsville Museum", url: "https://www.brownsvillehistory.org/historic-brownsville-museum.html" },
  { name: "Holiday Village", url: "https://holidayvillagebrownsville.com/" },
  { name: "Brownsville Living", url: "https://www.brownsvillelife.com/" },
  { name: "Ride for Rotary", url: "https://rotarybrownsvillehistoric.org/event/ride-for-rotary" },
  { name: "The Rotary Club of Historic Brownsville", url: "https://rotarybrownsvillehistoric.org/" },
  { name: "Brownsville Careers & Technical Training", url: "https://www.bisd.us/page/career-technical-education" },
  { name: "Keep Brownsville Beautiful", url: "https://www.facebook.com/KBB.BTX/" },
  { name: "BTX Downtown First Friday", url: "https://www.facebook.com/FirstFridayDTBrownsville/" },
  { name: "Grants and Community Development Department", url: "https://www.brownsvilletx.gov/375/Grants-and-Community-Development" },
  { name: "Brownsville South Padre Island Airport", url: "https://flybrownsville.com/" },
  { name: "Visit Brownsville TX", url: "https://visitbtx.com/" },
  { name: "Caracara Trail", url: "https://caracaratrails.org/" },
  { name: "West Rail Trail", url: "https://caracaratrails.org/trails/west-rail-trail-2/" },
  { name: "Belden Trail", url: "https://www.brownsvilletx.gov/308/Parks-Recreation" },
  { name: "ROCA at Brownsville Performing Arts Academy/George Ramírez PAA", url: "https://revivalofculturalarts.org/" },
  { name: "CycloBia Brownsville", url: "https://www.brownsvilletx.gov/308/Parks-Recreation" },
  { name: "Brownsville Society of Performing Arts", url: "https://brosoperformingarts.org/" },
  { name: "Youth Build", url: "https://cdcb.org/youthbuild/" },
  { name: "CDCB", url: "https://cdcb.org/" },
  { name: "Buho", url: "https://www.buhobtx.com/" },
  { name: "Mr Amigo Association", url: "https://www.mramigo.net/" },
  { name: "AIA Lower Rio Grande Architects", url: "https://lrgvaia.org/" },
  { name: "Brownsville Community Foundation", url: "https://www.rbvfoundation.org/" },
  { name: "Hike & Bike Trails", url: "https://caracaratrails.org/trails/" },
  { name: "Old City Cemetary Center", url: "https://www.brownsvillehistory.org/old-city-cemetery-center.html" },
  { name: "South Texas Ecotourism", url: "https://www.cameroncountytx.gov/south-texas-ecotourism-center/" },
  { name: "The Challenge RGV", url: "https://sph.uth.edu/research/centers/hispanic-health/tu-salud-si-cuenta/our-initiatives/the-challenge-rgv/" },
  { name: "Revitalize Downtown Brownsville", url: "https://brownsvillecic.com/community-projects/big-program/" },
  { name: "Zonta Club", url: "https://www.facebook.com/p/Zonta-Club-of-Brownsville-61568325620539/" },
  { name: "Cameron County", url: "https://www.cameroncountytx.gov/" },
  { name: "Conoce Matamoros", url: "https://www.conocematamoros.com.mx/" },
  { name: "South Texas College", url: "https://www.southtexascollege.edu/" },
  { name: "City of San Antonio", url: "https://www.sa.gov/" },
  { name: "City of Austin", url: "https://www.austintexas.gov/" },
  { name: "Business Development Fund of Texas", url: "https://www.bdfoftexas.com/" },
  { name: "The Texas Bucket List", url: "https://thetexasbucketlist.com/" },
  { name: "UTRGV Rusteburg Art Gallery", url: "https://www.utrgv.edu/cofa/schools-and-departments/school-of-art-and-design/galleries/index.htm" },
  { name: "SPI Life", url: "https://spilife.com/" },
  { name: "Valley Alliance of Mentors for Opp & Scholarship", url: "https://www.vamosscholars.org/" },
  { name: "VIDA Valley Initiative", url: "https://vidacareers.org/" },
];

export const patchActorWebsiteUrls = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const results: { patched: number; skipped: number; unmatched: string[] } = {
      patched: 0,
      skipped: 0,
      unmatched: [],
    };

    const allActors = await ctx.db.query("actors").take(500);
    const actorsByName = new Map(
      allActors.map((a) => [a.name.toLowerCase(), a]),
    );

    for (const { name, url } of ACTOR_URL_MAP) {
      const actor = actorsByName.get(name.toLowerCase());

      if (!actor) {
        results.unmatched.push(name);
        continue;
      }

      const currentUrl = actor.websiteUrl;
      if (currentUrl && !currentUrl.startsWith("[FILL:")) {
        results.skipped++;
        continue;
      }

      await ctx.db.patch(actor._id, { websiteUrl: url, updatedAt: now });
      results.patched++;
    }

    return results;
  },
});
