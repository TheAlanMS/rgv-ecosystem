import { Shell } from "./Shell";
import { NavLink } from "./NavLink";
import { HeaderSearch } from "@/components/search/HeaderSearch";

export function SiteHeader() {
  return (
    <header className="border-b border-border-default pt-6">
      <Shell>
        <div className="flex justify-between items-end pb-4">
          <div>
            <div className="font-heading text-[22px] font-bold text-gold tracking-tight">
              RGV Innovation Ecosystem
            </div>
            <div className="text-xs text-text-muted mt-0.5 tracking-wide">
              Cardinal Map — Rio Grande City &rarr; Brownsville &middot; I2E
              Framework
            </div>
          </div>
          <div className="text-[10px] font-medium bg-surface2 border border-border2 text-text-muted px-2.5 py-1 rounded-full tracking-widest uppercase">
            Open Source &middot; 2026
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-0.5">
            <NavLink href="/map">Cardinal Map</NavLink>
            <NavLink href="/search">Search</NavLink>
            <NavLink href="/pillars">Pillars</NavLink>
            <NavLink href="/journeys">My Journey</NavLink>
            <NavLink href="/ecosystem-health">Health</NavLink>
            <NavLink href="/governance">Governance</NavLink>
          </nav>
          <HeaderSearch />
        </div>
      </Shell>
    </header>
  );
}
