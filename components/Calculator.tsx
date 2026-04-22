"use client";

import { useMemo, useState } from "react";

import { Calculator as CalculatorIcon, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculateSection174Projection,
  formatCurrency,
  formatPercent,
} from "@/lib/tax-calculations";
import type { CalculatorInput, SavedScenario } from "@/types/calculator";
import { TaxProjection } from "@/components/TaxProjection";

const STORAGE_KEY = "section174-scenarios";

const defaultInput: CalculatorInput = {
  annualRevenue: 7500000,
  annualRdSpend: 1500000,
  annualOtherExpenses: 4200000,
  rdGrowthRate: 8,
  revenueGrowthRate: 12,
  taxRate: 26,
  cashReserve: 3000000,
  monthlyBurn: 250000,
  projectionYears: 5,
};

function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)]">
            {prefix}
          </span>
        ) : null}
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          onChange={(event) => onChange(Number(event.target.value || 0))}
          className={prefix ? "pl-7" : ""}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)]">
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInput>(defaultInput);
  const [scenarioName, setScenarioName] = useState("Base Case");
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const projection = useMemo(() => calculateSection174Projection(inputs), [inputs]);

  function update<K extends keyof CalculatorInput>(field: K, value: CalculatorInput[K]) {
    setInputs((current) => ({ ...current, [field]: value }));
  }

  function saveScenario() {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing: SavedScenario[] = existingRaw ? JSON.parse(existingRaw) : [];

    const scenario: SavedScenario = {
      id: crypto.randomUUID(),
      name: scenarioName.trim() || "Untitled Scenario",
      createdAt: new Date().toISOString(),
      input: inputs,
      summary: projection.summary,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify([scenario, ...existing]));
    setSavedMessage(`Saved "${scenario.name}" to your dashboard.`);
    setTimeout(() => setSavedMessage(null), 3000);
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Section 174 Tax Impact Calculator</CardTitle>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Model how forced amortization changes your tax bill and runway.
            </p>
          </div>
          <CalculatorIcon className="h-6 w-6 text-[var(--accent)]" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <NumberField
              id="annual-revenue"
              label="Annual Revenue"
              value={inputs.annualRevenue}
              onChange={(value) => update("annualRevenue", value)}
              prefix="$"
            />
            <NumberField
              id="annual-rd-spend"
              label="Annual R&D Spend"
              value={inputs.annualRdSpend}
              onChange={(value) => update("annualRdSpend", value)}
              prefix="$"
            />
            <NumberField
              id="annual-other-expenses"
              label="Annual Other Expenses"
              value={inputs.annualOtherExpenses}
              onChange={(value) => update("annualOtherExpenses", value)}
              prefix="$"
            />
            <NumberField
              id="tax-rate"
              label="Effective Tax Rate"
              value={inputs.taxRate}
              onChange={(value) => update("taxRate", value)}
              suffix="%"
            />
            <NumberField
              id="rd-growth"
              label="R&D Spend Growth"
              value={inputs.rdGrowthRate}
              onChange={(value) => update("rdGrowthRate", value)}
              suffix="%"
            />
            <NumberField
              id="revenue-growth"
              label="Revenue Growth"
              value={inputs.revenueGrowthRate}
              onChange={(value) => update("revenueGrowthRate", value)}
              suffix="%"
            />
            <NumberField
              id="cash-reserve"
              label="Cash Reserve"
              value={inputs.cashReserve}
              onChange={(value) => update("cashReserve", value)}
              prefix="$"
            />
            <NumberField
              id="monthly-burn"
              label="Monthly Burn"
              value={inputs.monthlyBurn}
              onChange={(value) => update("monthlyBurn", value)}
              prefix="$"
            />
            <NumberField
              id="projection-years"
              label="Projection Years"
              value={inputs.projectionYears}
              onChange={(value) =>
                update("projectionYears", Math.max(1, Math.min(10, Math.round(value))))
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-[var(--border)] bg-[#0f141d] p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                First-Year Tax Shock
              </p>
              <p className="mt-2 text-2xl font-semibold text-[#ff8d86]">
                {formatCurrency(projection.summary.firstYearTaxShock)}
              </p>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[#0f141d] p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                Peak Annual Extra Tax
              </p>
              <p className="mt-2 text-2xl font-semibold text-[#ff8d86]">
                {formatCurrency(projection.summary.peakAnnualAdditionalTax)}
              </p>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[#0f141d] p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                5-Year Cash Impact
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(projection.summary.totalAdditionalTax)}
              </p>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[#0f141d] p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                Runway Lost by Year {inputs.projectionYears}
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {projection.summary.endingRunwayMonthsLost.toFixed(1)} months
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[#0f141d] p-4">
            <p className="text-sm text-[var(--muted-foreground)]">
              Baseline status: <span className="font-semibold text-white">{projection.status}</span>.
              Effective tax rate applied in model: {formatPercent(inputs.taxRate)}.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div className="w-full md:max-w-sm">
              <Label htmlFor="scenario-name">Scenario Name</Label>
              <Input
                id="scenario-name"
                value={scenarioName}
                onChange={(event) => setScenarioName(event.target.value)}
                placeholder="Conservative growth case"
              />
            </div>
            <Button type="button" onClick={saveScenario}>
              <Save className="mr-2 h-4 w-4" />
              Save Scenario
            </Button>
          </div>

          {savedMessage ? (
            <p className="text-sm text-[var(--success)]">{savedMessage}</p>
          ) : null}
        </CardContent>
      </Card>

      <TaxProjection projection={projection} />
    </div>
  );
}
