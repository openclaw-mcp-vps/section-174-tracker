import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "@/components/Calculator";

export const metadata: Metadata = {
  title: "Calculator | Section 174 Tracker",
  description: "Estimate Section 174 tax drag and runway impact over five years.",
};

export default function CalculatorPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-100">Section 174 Calculator</h1>
        <Link
          href="/dashboard"
          className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
        >
          Back to Dashboard
        </Link>
      </div>
      <Calculator />
    </main>
  );
}
