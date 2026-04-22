import Link from "next/link";
import { ArrowRight, CircleAlert, DollarSign, LineChart, ShieldCheck } from "lucide-react";

import { PricingCard } from "@/components/PricingCard";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Why does Section 174 create phantom income?",
    answer:
      "Your P&L still recognizes R&D as an operating expense, but the IRS now forces most software R&D to be amortized over multiple years. That makes taxable income higher than book income, so profitable teams can owe cash taxes on income that never existed in cash.",
  },
  {
    question: "Who is this built for?",
    answer:
      "Finance leads and founders at software companies spending at least $500k on annual R&D who need to understand ongoing tax drag and budget with fewer surprises.",
  },
  {
    question: "How do I unlock the calculator after payment?",
    answer:
      "Use the same email from Stripe checkout in the unlock form. Once your payment webhook is received, access is granted through a secure cookie.",
  },
  {
    question: "Does it replace tax advice?",
    answer:
      "No. It is a planning and forecasting model. Use it to prepare decisions and then review assumptions with your tax advisor.",
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(47,129,247,0.15),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(248,81,73,0.12),transparent_30%),radial-gradient(circle_at_40%_80%,rgba(46,160,67,0.12),transparent_40%)]" />

      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-4 inline-flex items-center rounded-full border border-[#2b3240] bg-[#111723]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#94a6bd]">
              Section 174 Survival Tool
            </p>
            <h1 className="max-w-2xl text-4xl leading-tight font-semibold md:text-6xl">
              Track Section 174 tax impact before it crushes your runway.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#c6d0dc]">
              Model your R&D spend, compare immediate deduction vs forced
              amortization, and quantify the tax bill created by phantom income.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/calculator">
                <Button size="lg">
                  Open Calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#pricing">
                <Button variant="outline" size="lg">
                  See Pricing
                </Button>
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-[var(--border)] bg-[#101722] p-4">
                <p className="text-2xl font-semibold text-[#ff8d86]">$120k+</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  common first-year tax shock at $1M R&D
                </p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[#101722] p-4">
                <p className="text-2xl font-semibold">5 years</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  mandatory amortization timeline to model
                </p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[#101722] p-4">
                <p className="text-2xl font-semibold">10 min</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  to produce a board-ready forecast
                </p>
              </div>
            </div>
          </div>

          <PricingCard />
        </div>
      </section>

      <section className="relative border-y border-[var(--border)] bg-[#0f151f]/70 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          <div className="rounded-xl border border-[var(--border)] bg-[#111925] p-6">
            <CircleAlert className="h-8 w-8 text-[#f85149]" />
            <h2 className="mt-4 text-2xl font-semibold">The Problem</h2>
            <p className="mt-2 text-sm text-[#c6d0dc]">
              Profitable software companies are getting surprised by large tax
              bills because R&D deductions are delayed.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[#111925] p-6">
            <LineChart className="h-8 w-8 text-[#2f81f7]" />
            <h2 className="mt-4 text-2xl font-semibold">The Model</h2>
            <p className="mt-2 text-sm text-[#c6d0dc]">
              Enter revenue, R&D spend, and growth assumptions to see annual tax
              shock and cumulative cash drag.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[#111925] p-6">
            <DollarSign className="h-8 w-8 text-[#2ea043]" />
            <h2 className="mt-4 text-2xl font-semibold">The Outcome</h2>
            <p className="mt-2 text-sm text-[#c6d0dc]">
              Defend runway, reset hiring plans earlier, and avoid getting
              blindsided in Q4 tax planning.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#8fb9ff]">
            Solution
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            One workflow to plan Section 174 tax impact with confidence
          </h2>
          <p className="mt-3 text-[#c6d0dc]">
            Built for CFOs and founders who need a fast way to quantify tax drag,
            explain it to leadership, and keep cash planning grounded in reality.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border border-[var(--border)] bg-[#111925] p-6">
            <ul className="space-y-4 text-sm text-[#d8e1ec]">
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-[#66a3ff]" />
                <span>
                  Calculate year-by-year additional tax caused by amortization lag.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-[#66a3ff]" />
                <span>
                  Visualize cumulative cash impact and runway months lost.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-[#66a3ff]" />
                <span>
                  Save and compare multiple growth and spend scenarios locally.
                </span>
              </li>
            </ul>
          </div>
          <PricingCard />
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[#0f151f]/60 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-semibold md:text-4xl">FAQ</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-xl border border-[var(--border)] bg-[#111925] p-5"
              >
                <summary className="cursor-pointer text-base font-semibold">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#cad4df]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
