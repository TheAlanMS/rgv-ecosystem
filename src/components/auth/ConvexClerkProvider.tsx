"use client";

import { useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useMemo } from "react";

interface ConvexClerkProviderProps {
  children: React.ReactNode;
}

export function ConvexClerkProvider({ children }: ConvexClerkProviderProps) {
  const convex = useMemo(() => {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

    if (!convexUrl) {
      return null;
    }

    return new ConvexReactClient(convexUrl);
  }, []);

  if (!convex) {
    return children;
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
