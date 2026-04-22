import Link from "next/link";
import { cookies } from "next/headers";

import { DashboardClient } from "@/components/DashboardClient";
import { getAccessCookieName, verifyAccessCookieValue } from "@/lib/access";

export const metadata = {
  title: "Dashboard",
  description: "Review saved Section 174 tax impact scenarios.",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get(getAccessCookieName())?.value;
  const accessPayload = verifyAccessCookieValue(accessCookie);

  if (!accessPayload) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold">Dashboard Access Required</h1>
        <p className="mt-3 text-[#c6d0dc]">
          Unlock the tool first to access saved scenario history.
        </p>
        <Link href="/calculator" className="mt-6 inline-block text-[#8fb9ff] underline">
          Go to Calculator Unlock
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-[#8fb9ff]">Dashboard</p>
        <h1 className="mt-2 text-4xl font-semibold">Saved What-If Scenarios</h1>
        <p className="mt-2 text-[#c6d0dc]">Signed in as {accessPayload.email}</p>
      </div>
      <DashboardClient />
    </main>
  );
}
