import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Shell } from "@/components/layout/Shell";

export default async function AdminLoginPage() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/admin");
  }

  return (
    <main className="flex-1 py-7">
      <Shell className="flex justify-center">
        <SignIn fallbackRedirectUrl="/admin" />
      </Shell>
    </main>
  );
}
