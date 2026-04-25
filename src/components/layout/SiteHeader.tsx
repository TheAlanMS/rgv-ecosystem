"use client";

import { useEffect, useState } from "react";
import { HeaderSearch } from "@/components/search/HeaderSearch";
import { NavLink } from "./NavLink";
import { Shell } from "./Shell";

const NAV_LINKS = [
  { href: "/map", label: "Cardinal Map" },
  { href: "/search", label: "Search" },
  { href: "/pillars", label: "Pillars" },
  { href: "/journeys", label: "My Journey" },
  { href: "/ecosystem-health", label: "Health" },
  { href: "/governance", label: "Governance" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  return (
    <header className="relative border-b border-border-default pt-4 sm:pt-6">
      <Shell>
        <div className="flex items-end justify-between gap-3 pb-4">
          <div className="min-w-0">
            <div className="font-heading text-[20px] font-bold tracking-tight text-gold sm:text-[22px]">
              RGV Innovation Ecosystem
            </div>
            <div className="mt-0.5 text-xs leading-snug tracking-wide text-text-muted">
              Cardinal Map - Rio Grande City to Brownsville · I2E Framework
            </div>
          </div>
          <div className="hidden shrink-0 rounded-full border border-border2 bg-surface2 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-text-muted sm:block">
            Open Source · 2026
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border2 text-text-secondary transition-colors hover:bg-surface2 hover:text-text-primary md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span aria-hidden="true" className="text-xl leading-none">
              {isMenuOpen ? "x" : "="}
            </span>
          </button>

          <nav className="hidden flex-wrap gap-0.5 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <HeaderSearch />
        </div>

        {isMenuOpen ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-30 cursor-default bg-bg/70 md:hidden"
              aria-label="Close navigation"
              onClick={() => setIsMenuOpen(false)}
            />
            <div
              id="mobile-navigation"
              className="absolute left-5 right-5 z-40 mt-2 rounded-xl border border-border-default bg-surface p-2 shadow-2xl md:hidden"
            >
              <nav className="grid gap-1" aria-label="Mobile primary">
                {NAV_LINKS.map((link) => (
                  <div key={link.href} onClick={() => setIsMenuOpen(false)}>
                    <NavLink href={link.href}>{link.label}</NavLink>
                  </div>
                ))}
              </nav>
            </div>
          </>
        ) : null}
      </Shell>
    </header>
  );
}
