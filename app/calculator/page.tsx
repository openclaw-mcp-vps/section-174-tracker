import Link from "next/link";
import { cookies } from "next/headers";

import { Calculator } from "@/components/Calculator";
import { PricingCard } from "@/components/PricingCard";
import { UnlockAccessForm } from "@/components/UnlockAccessForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyAccessCookieValue, getAccessCookieName } from "@/lib/access";

export const metadata = {
  title: "Calculator",
  description: "Model Section 174 amortization and tax runway impact.",
};

export default async function CalculatorPage() {
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get(getAccessCookieName())?.value;
  const accessPayload = verifyAccessCookieValue(accessCookie);

  if (!accessPayload) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-[#8fb9ff]">Members Area</p>
          <h1 className="mt-2 text-4xl font-semibold">Unlock the Section 174 Calculator</h1>
          <p className="mt-3 max-w-2xl text-[#c6d0dc]">
            Purchase access, then verify with your checkout email to activate your
            private modeling workspace.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <PricingCard />
          <Card>
            <CardHeader>
              <CardTitle>Already Purchased?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-[var(--muted-foreground)]">
                Enter the same email you used in Stripe checkout. Once verified,
                access is granted instantly via secure cookie.
              </p>
              <UnlockAccessForm />
              <p className="text-sm text-[var(--muted-foreground)]">
                Need more context first? <Link href="/" className="text-[#8fb9ff] underline">Return to the overview</Link>.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[#8fb9ff]">Calculator</p>
          <h1 className="mt-2 text-4xl font-semibold">Section 174 Scenario Workspace</h1>
          <p className="mt-2 text-[#c6d0dc]">
            Signed in as <span className="font-semibold text-white">{accessPayload.email}</span>
          </p>
        </div>
        <Link href="/dashboard" className="text-sm text-[#8fb9ff] underline">
          View Saved Scenario Dashboard
        </Link>
      </div>
      <Calculator />
    </main>
  );
}
