import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/ui/PageHeader";
import { RoleSelector } from "@/components/journeys/RoleSelector";
import { getAllRoles } from "@/lib/queries/journeys";

export default function JourneysPage() {
  const roles = getAllRoles();

  return (
    <main className="flex-1 py-7">
      <Shell>
        <PageHeader
          title="Find your place in the ecosystem"
          subtitle="Select your role to see how you fit, what you need, and who you should connect with across the RGV."
        />
        <RoleSelector roles={roles} />
      </Shell>
    </main>
  );
}
