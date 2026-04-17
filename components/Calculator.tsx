"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, DollarSign, TrendingDown } from "lucide-react";
import { calculateSection174Impact } from "@/lib/calculations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResultsChart } from "@/components/ResultsChart";
import type { CalculatorInput } from "@/types/calculator";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMonths(value: number) {
  return `${Math.max(0, value).toFixed(1)} mo`;
}

const defaultInput: CalculatorInput = {
  annualRD: 1500000,
  grossProfit: 4200000,
  taxRate: 0.21,
  openingCash: 2800000,
  monthlyBurn: 260000,
};

export function Calculator() {
  const [form, setForm] = useState<CalculatorInput>(defaultInput);
  const [submitted, setSubmitted] = useState<CalculatorInput>(defaultInput);

  const result = useMemo(() => calculateSection174Impact(submitted), [submitted]);

  const update = (key: keyof CalculatorInput, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="text-xl font-semibold text-zinc-100">Section 174 Cash Flow Calculator</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Model how mandatory R&D capitalization changes your tax bill and compresses runway.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="annualRD">Annual R&D Spend</Label>
            <Input
              id="annualRD"
              type="number"
              min={0}
              value={form.annualRD}
              onChange={(event) => update("annualRD", event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="grossProfit">Annual Gross Profit</Label>
            <Input
              id="grossProfit"
              type="number"
              min={0}
              value={form.grossProfit}
              onChange={(event) => update("grossProfit", event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="taxRate">Effective Tax Rate (decimal)</Label>
            <Input
              id="taxRate"
              type="number"
              step="0.01"
              min={0}
              max={1}
              value={form.taxRate}
              onChange={(event) => update("taxRate", event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="openingCash">Opening Cash Balance</Label>
            <Input
              id="openingCash"
              type="number"
              min={0}
              value={form.openingCash}
              onChange={(event) => update("openingCash", event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="monthlyBurn">Monthly Operating Burn</Label>
            <Input
              id="monthlyBurn"
              type="number"
              min={1}
              value={form.monthlyBurn}
              onChange={(event) => update("monthlyBurn", event.target.value)}
            />
          </div>
        </div>

        <Button className="mt-6" onClick={() => setSubmitted(form)}>
          Recalculate Impact
        </Button>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <div className="flex items-start gap-3">
            <DollarSign className="mt-0.5 h-5 w-5 text-amber-400" />
            <div>
              <p className="text-sm text-zinc-400">Additional Tax Over 5 Years</p>
              <p className="mt-1 text-xl font-semibold text-zinc-100">
                {formatCurrency(result.totals.additionalTaxes5y)}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <TrendingDown className="mt-0.5 h-5 w-5 text-red-400" />
            <div>
              <p className="text-sm text-zinc-400">Average Annual Cash Hit</p>
              <p className="mt-1 text-xl font-semibold text-zinc-100">
                {formatCurrency(result.totals.averageAnnualCashHit)}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-400" />
            <div>
              <p className="text-sm text-zinc-400">Runway Lost by Year 5</p>
              <p className="mt-1 text-xl font-semibold text-zinc-100">
                {formatMonths(result.totals.runwayLossMonthsAtYear5)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <ResultsChart rows={result.projection} />

      <Card>
        <h3 className="text-lg font-semibold text-zinc-100">Year-by-Year Projection</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="py-2">Year</th>
                <th className="py-2">Taxes (Old)</th>
                <th className="py-2">Taxes (New)</th>
                <th className="py-2">Phantom Tax</th>
                <th className="py-2">Cash (Old)</th>
                <th className="py-2">Cash (New)</th>
                <th className="py-2">Runway (New)</th>
              </tr>
            </thead>
            <tbody>
              {result.projection.map((row) => (
                <tr key={row.year} className="border-b border-zinc-900 text-zinc-200">
                  <td className="py-2">{row.year}</td>
                  <td className="py-2">{formatCurrency(row.taxesOld)}</td>
                  <td className="py-2">{formatCurrency(row.taxesNew)}</td>
                  <td className="py-2 text-amber-300">{formatCurrency(row.phantomIncomeTax)}</td>
                  <td className="py-2">{formatCurrency(row.cashBalanceOld)}</td>
                  <td className="py-2 text-red-300">{formatCurrency(row.cashBalanceNew)}</td>
                  <td className="py-2">{formatMonths(row.runwayMonthsNew)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
