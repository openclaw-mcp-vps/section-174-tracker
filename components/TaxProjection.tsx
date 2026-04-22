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

import { formatCurrency } from "@/lib/tax-calculations";
import type { ProjectionResult, ProjectionYear } from "@/types/calculator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TooltipValue({ value }: { value?: number }) {
  return <span>{formatCurrency(value ?? 0)}</span>;
}

function chartData(years: ProjectionYear[]) {
  return years.map((yearData) => ({
    year: `Y${yearData.year}`,
    additionalTax: Math.round(yearData.additionalTaxFrom174),
    cumulativeTax: Math.round(yearData.cumulativeAdditionalTax),
    phantomIncome: Math.round(yearData.phantomIncome),
  }));
}

export function TaxProjection({ projection }: { projection: ProjectionResult }) {
  const data = chartData(projection.years);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[#0f141d] p-4">
          <h3 className="mb-2 text-lg font-semibold">Annual Additional Tax</h3>
          <p className="mb-4 text-sm text-[var(--muted-foreground)]">
            Extra tax due each year because R&D deduction is delayed under
            Section 174.
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#243042" />
                <XAxis dataKey="year" stroke="#9da7b3" />
                <YAxis stroke="#9da7b3" tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0d1117", borderColor: "#2b3240" }}
                  formatter={(value: number) => [<TooltipValue value={value} key="value" />, "Additional tax"]}
                />
                <Bar dataKey="additionalTax" fill="#f85149" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[#0f141d] p-4">
          <h3 className="mb-2 text-lg font-semibold">Cumulative Cash Impact</h3>
          <p className="mb-4 text-sm text-[var(--muted-foreground)]">
            Total additional tax paid over time from delayed amortization.
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#243042" />
                <XAxis dataKey="year" stroke="#9da7b3" />
                <YAxis stroke="#9da7b3" tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0d1117", borderColor: "#2b3240" }}
                  formatter={(value: number) => [<TooltipValue value={value} key="value" />, "Cumulative"]}
                />
                <Line
                  type="monotone"
                  dataKey="cumulativeTax"
                  stroke="#2f81f7"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#2f81f7" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[#0f141d] p-4">
        <h3 className="mb-3 text-lg font-semibold">Year-by-Year Tax Projection</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>R&D Spend</TableHead>
              <TableHead>174 Deduction</TableHead>
              <TableHead>Phantom Income</TableHead>
              <TableHead>Extra Tax</TableHead>
              <TableHead>Cumulative Tax</TableHead>
              <TableHead>Runway Lost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projection.years.map((yearData) => (
              <TableRow key={yearData.year}>
                <TableCell>{yearData.year}</TableCell>
                <TableCell>{formatCurrency(yearData.rdSpend)}</TableCell>
                <TableCell>{formatCurrency(yearData.rdDeductionUnder174)}</TableCell>
                <TableCell>{formatCurrency(yearData.phantomIncome)}</TableCell>
                <TableCell className="text-[#ff8d86]">
                  {formatCurrency(yearData.additionalTaxFrom174)}
                </TableCell>
                <TableCell>{formatCurrency(yearData.cumulativeAdditionalTax)}</TableCell>
                <TableCell>{yearData.runwayMonthsLost.toFixed(1)} months</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
