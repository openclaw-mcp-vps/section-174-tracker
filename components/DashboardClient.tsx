"use client";

import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/tax-calculations";
import type { SavedScenario } from "@/types/calculator";

const STORAGE_KEY = "section174-scenarios";

export function DashboardClient() {
  const [scenarios, setScenarios] = useState<SavedScenario[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    setScenarios(raw ? (JSON.parse(raw) as SavedScenario[]) : []);
  }, []);

  function removeScenario(id: string) {
    setScenarios((current) => {
      const next = current.filter((scenario) => scenario.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  const totals = useMemo(() => {
    return scenarios.reduce(
      (acc, scenario) => {
        acc.count += 1;
        acc.taxImpact += scenario.summary.totalAdditionalTax;
        return acc;
      },
      { count: 0, taxImpact: 0 },
    );
  }, [scenarios]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Saved Scenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totals.count}</p>
            <p className="text-sm text-[var(--muted-foreground)]">
              scenarios in your local browser storage
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Combined 5-Year Tax Exposure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-[#ff8d86]">
              {formatCurrency(totals.taxImpact)}
            </p>
            <p className="text-sm text-[var(--muted-foreground)]">
              summed across all saved what-if cases
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scenario Library</CardTitle>
        </CardHeader>
        <CardContent>
          {scenarios.length === 0 ? (
            <p className="text-sm text-[var(--muted-foreground)]">
              No saved scenarios yet. Run the calculator and save at least one case.
            </p>
          ) : (
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[#0f141d] p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-base font-semibold">{scenario.name}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      saved {formatDistanceToNow(new Date(scenario.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm">
                      5-year impact:{" "}
                      <span className="font-semibold text-[#ff8d86]">
                        {formatCurrency(scenario.summary.totalAdditionalTax)}
                      </span>
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeScenario(scenario.id)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
