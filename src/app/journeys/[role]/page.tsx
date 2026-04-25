import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { JourneyView } from "@/components/journeys/JourneyView";
import {
  getAllRoles,
  getRoleById,
  getJourneyByRole,
} from "@/lib/queries/journeys";
import { getAllPillars } from "@/lib/queries/pillars";
import type { Pillar } from "@/lib/types";

interface JourneyPageProps {
  params: Promise<{ role: string }>;
}

export async function generateStaticParams() {
  return getAllRoles().map((r) => ({ role: r.id }));
}

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { role: roleId } = await params;
  const role = getRoleById(roleId);
  const journey = getJourneyByRole(roleId);

  if (!role || !journey) {
    notFound();
  }

  // Build pillar lookup map for client component
  const pillarMap: Record<number, Pillar> = {};
  for (const p of getAllPillars()) {
    pillarMap[p.id] = p;
  }

  return (
    <main className="flex-1 py-7">
      <Shell>
        <JourneyView journey={journey} role={role} pillarMap={pillarMap} />
      </Shell>
    </main>
  );
}
