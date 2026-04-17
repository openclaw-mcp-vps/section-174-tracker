"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ProjectionRow } from "@/types/calculator";
import { Card } from "@/components/ui/card";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

type ResultsChartProps = {
  rows: ProjectionRow[];
};

export function ResultsChart({ rows }: ResultsChartProps) {
  const chartRows = rows.map((row) => ({
    year: `Y${row.year}`,
    extraTax: Math.round(row.phantomIncomeTax),
    cashOld: Math.round(row.cashBalanceOld),
    cashNew: Math.round(row.cashBalanceNew),
  }));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-zinc-100">Extra Tax From Section 174</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartRows}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="year" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={formatCurrency} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: "#111821", border: "1px solid #30363d" }}
              />
              <Bar dataKey="extraTax" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-zinc-100">Cash Balance: Old vs New Rules</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartRows}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="year" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={formatCurrency} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: "#111821", border: "1px solid #30363d" }}
              />
              <Line dataKey="cashOld" stroke="#22c55e" strokeWidth={3} dot={false} />
              <Line dataKey="cashNew" stroke="#ef4444" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
