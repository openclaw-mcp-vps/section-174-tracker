import Link from "next/link";
import { BarChart3, CircleDollarSign, ShieldAlert } from "lucide-react";
import { PricingCard } from "@/components/PricingCard";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="bg-grid absolute inset-0 opacity-35" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="inline-flex rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
            CFO tool for Section 174 survival
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-zinc-50 md:text-6xl md:leading-tight">
            Track Section 174 tax impact before it blindsides your cash runway.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-300">
            Since 2022, software R&D spend is no longer immediately deductible. Section 174 Tracker shows how much
            phantom income you will pay taxes on, year by year, so you can budget cash before the IRS bill lands.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#pricing"
              className="rounded-md bg-emerald-500 px-5 py-3 text-sm font-semibold text-black hover:bg-emerald-400"
            >
              Get Access - $19/mo
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 hover:bg-zinc-900"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-semibold text-zinc-100">Why companies are getting crushed</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-zinc-800 bg-[#111821] p-5">
            <ShieldAlert className="h-5 w-5 text-red-400" />
            <h3 className="mt-3 text-lg font-semibold text-zinc-100">Phantom-income taxes</h3>
            <p className="mt-2 text-sm text-zinc-400">
              You can report strong accounting profits while writing six-figure checks on income that never hit cash.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-[#111821] p-5">
            <CircleDollarSign className="h-5 w-5 text-amber-400" />
            <h3 className="mt-3 text-lg font-semibold text-zinc-100">Runway compression</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Teams that were planning to hire now need to preserve cash just to cover unexpected federal and state tax.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-[#111821] p-5">
            <BarChart3 className="h-5 w-5 text-emerald-400" />
            <h3 className="mt-3 text-lg font-semibold text-zinc-100">No forward model</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Most finance stacks show last month. Section 174 demands a multi-year view to keep planning grounded.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-[#0f1622]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-semibold text-zinc-100">What Section 174 Tracker gives you</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-[#111821] p-6">
              <h3 className="text-lg font-semibold text-zinc-100">5-year amortization engine</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Input annual R&D and profit assumptions, then see deductible R&D, taxable income, and tax owed under
                old rules versus Section 174.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-[#111821] p-6">
              <h3 className="text-lg font-semibold text-zinc-100">Cash-flow and runway impact</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Quantify the monthly runway loss from higher tax burden so you can adjust hiring plans, financing, and
                tax estimates early.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-16">
        <PricingCard />
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="text-3xl font-semibold text-zinc-100">FAQ</h2>
        <div className="mt-6 space-y-4">
          <article className="rounded-xl border border-zinc-800 bg-[#111821] p-5">
            <h3 className="text-base font-semibold text-zinc-100">Who should use this?</h3>
            <p className="mt-2 text-sm text-zinc-400">
              CFOs and founders at profitable software businesses with meaningful annual R&D spend, typically above
              $500K.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-[#111821] p-5">
            <h3 className="text-base font-semibold text-zinc-100">Does this replace tax advice?</h3>
            <p className="mt-2 text-sm text-zinc-400">
              No. It is a planning model to estimate exposure and cash impact. Use it with your CPA for final filings.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-[#111821] p-5">
            <h3 className="text-base font-semibold text-zinc-100">How does access work?</h3>
            <p className="mt-2 text-sm text-zinc-400">
              After checkout, webhook-confirmed orders can unlock access with a secure cookie and use the full
              calculator dashboard.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
