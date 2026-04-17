import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard | Section 174 Tracker",
  description: "Access your Section 174 planning dashboard.",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get("s174_access");
  const hasAccess = accessCookie?.value === "active";

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-zinc-100">Finance Dashboard</h1>
      <p className="mt-2 text-zinc-400">
        Review your modeled Section 174 exposure and jump into the calculator.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-zinc-100">Access Status</h2>
          <p className="mt-2 text-sm text-zinc-400">
            {hasAccess
              ? "Pro access is active on this browser."
              : "No active paid session found. Complete checkout and unlock your purchase from the landing page."}
          </p>
          <Link
            href={hasAccess ? "/calculator" : "/#pricing"}
            className="mt-5 inline-block rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            {hasAccess ? "Open Calculator" : "Go to Pricing"}
          </Link>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-zinc-100">How to Use the Model</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>Enter realistic annual R&D spend and current gross profit.</li>
            <li>Use your blended federal and state effective tax rate.</li>
            <li>Compare projected cash balance under old vs Section 174 rules.</li>
            <li>Use runway difference to plan hiring pace and capital strategy.</li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
