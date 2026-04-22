import { z } from "zod";

import type {
  CalculatorInput,
  ProjectionResult,
  ProjectionSummary,
  ProjectionYear,
  TaxFilingStatus,
} from "@/types/calculator";

const AMORTIZATION_SCHEDULE = [0.1, 0.2, 0.2, 0.2, 0.2, 0.1];

export const calculatorInputSchema = z.object({
  annualRevenue: z.number().nonnegative(),
  annualRdSpend: z.number().nonnegative(),
  annualOtherExpenses: z.number().nonnegative(),
  rdGrowthRate: z.number().min(-100).max(500),
  revenueGrowthRate: z.number().min(-100).max(500),
  taxRate: z.number().min(0).max(100),
  cashReserve: z.number().nonnegative(),
  monthlyBurn: z.number().nonnegative(),
  projectionYears: z.number().int().min(1).max(10),
});

function grow(value: number, growthRatePercent: number, year: number): number {
  const rate = growthRatePercent / 100;
  return value * (1 + rate) ** (year - 1);
}

function getStatus(baseTaxableIncome: number): TaxFilingStatus {
  if (baseTaxableIncome > 0) {
    return "profitable";
  }
  if (baseTaxableIncome < 0) {
    return "loss-making";
  }
  return "break-even";
}

export function calculateSection174Projection(rawInput: CalculatorInput): ProjectionResult {
  const input = calculatorInputSchema.parse(rawInput);
  const years: ProjectionYear[] = [];
  const rdCohorts: number[] = [];
  const taxRate = input.taxRate / 100;

  let cumulativeAdditionalTax = 0;

  for (let year = 1; year <= input.projectionYears; year += 1) {
    const revenue = grow(input.annualRevenue, input.revenueGrowthRate, year);
    const rdSpend = grow(input.annualRdSpend, input.rdGrowthRate, year);
    const otherExpenses = grow(
      input.annualOtherExpenses,
      input.revenueGrowthRate,
      year,
    );

    rdCohorts.push(rdSpend);

    const rdDeductionUnder174 = rdCohorts.reduce((sum, cohort, cohortIndex) => {
      const age = year - (cohortIndex + 1);
      if (age < 0 || age >= AMORTIZATION_SCHEDULE.length) {
        return sum;
      }
      return sum + cohort * AMORTIZATION_SCHEDULE[age];
    }, 0);

    const rdDeductionIfImmediate = rdSpend;

    const taxableIncomeIfImmediate =
      revenue - otherExpenses - rdDeductionIfImmediate;
    const taxableIncomeUnder174 = revenue - otherExpenses - rdDeductionUnder174;

    const taxIfImmediate = Math.max(0, taxableIncomeIfImmediate) * taxRate;
    const taxUnder174 = Math.max(0, taxableIncomeUnder174) * taxRate;

    const additionalTaxFrom174 = taxUnder174 - taxIfImmediate;
    cumulativeAdditionalTax += additionalTaxFrom174;

    const runwayMonthsLost =
      input.monthlyBurn > 0 ? cumulativeAdditionalTax / input.monthlyBurn : 0;

    years.push({
      year,
      revenue,
      rdSpend,
      rdDeductionIfImmediate,
      rdDeductionUnder174,
      taxableIncomeIfImmediate,
      taxableIncomeUnder174,
      taxIfImmediate,
      taxUnder174,
      additionalTaxFrom174,
      cumulativeAdditionalTax,
      runwayMonthsLost,
      phantomIncome: taxableIncomeUnder174 - taxableIncomeIfImmediate,
    });
  }

  const summary: ProjectionSummary = {
    totalAdditionalTax: years.reduce(
      (sum, item) => sum + item.additionalTaxFrom174,
      0,
    ),
    peakAnnualAdditionalTax: Math.max(
      0,
      ...years.map((item) => item.additionalTaxFrom174),
    ),
    firstYearTaxShock: years[0]?.additionalTaxFrom174 ?? 0,
    endingRunwayMonthsLost: years[years.length - 1]?.runwayMonthsLost ?? 0,
  };

  const baseIncome =
    input.annualRevenue - input.annualOtherExpenses - input.annualRdSpend;

  return {
    years,
    summary,
    status: getStatus(baseIncome),
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
