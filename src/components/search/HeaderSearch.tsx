"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/search/SearchInput";

export function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const navigateToSearch = useCallback(
    (nextQuery: string) => {
      const trimmedQuery = nextQuery.trim();
      router.push(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : "/search");
    },
    [router],
  );

  return (
    <div className="w-full md:w-72">
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
  );
}
