"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/search/SearchInput";

export function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const navigateToSearch = useCallback(
    (nextQuery: string) => {
      const trimmedQuery = nextQuery.trim();
      router.push(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : "/search");
      setIsMobileSearchOpen(false);
    },
    [router],
  );

  useEffect(() => {
    if (!isMobileSearchOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileSearchOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileSearchOpen]);

  return (
    <>
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border2 text-text-secondary transition-colors hover:bg-surface2 hover:text-text-primary md:hidden"
        aria-label="Open search"
        onClick={() => setIsMobileSearchOpen(true)}
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>

      <div className="hidden w-full md:block md:w-72">
        <SearchInput
          value={query}
          onChange={(nextQuery) => {
            setQuery(nextQuery);
            navigateToSearch(nextQuery);
          }}
          onSubmit={navigateToSearch}
          placeholder="Search"
          label="Search the ecosystem"
          compact
        />
      </div>

      {isMobileSearchOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-bg/70 md:hidden"
            aria-label="Close search"
            onClick={() => setIsMobileSearchOpen(false)}
          />
          <div className="fixed inset-x-0 top-0 z-50 border-b border-border-default bg-bg p-4 shadow-2xl md:hidden">
            <SearchInput
              value={query}
              onChange={setQuery}
              onSubmit={navigateToSearch}
              onDismiss={() => setIsMobileSearchOpen(false)}
              placeholder="Search the ecosystem"
              label="Search the ecosystem"
              autoFocus
            />
          </div>
        </>
      ) : null}
    </>
  );
}
