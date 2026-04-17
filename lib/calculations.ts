import { z } from "zod";
import type { CalculatorInput, CalculatorResult, ProjectionRow } from "@/types/calculator";

export const calculatorInputSchema = z.object({
  annualRD: z.number().min(1, "Annual R&D spend must be greater than 0."),
  grossProfit: z.number().min(1, "Annual gross profit must be greater than 0."),
  taxRate: z.number().min(0.01).max(0.6),
  openingCash: z.number().min(0),
  monthlyBurn: z.number().min(1),
});

function clampTaxableIncome(value: number) {
  return Math.max(0, value);
}

function runwayMonths(cashBalance: number, monthlyBurn: number) {
  if (cashBalance <= 0) return 0;
  return cashBalance / monthlyBurn;
}

function buildDeductionFromCohorts(annualRD: number, year: number) {
  // Simplified 5-year straight-line amortization for domestic Section 174 modeling.
  const activeCohorts = Math.min(year, 5);
  return (annualRD / 5) * activeCohorts;
}

export function calculateSection174Impact(input: CalculatorInput): CalculatorResult {
  const parsed = calculatorInputSchema.parse(input);

  const projection: ProjectionRow[] = [];

  let cashBalanceOld = parsed.openingCash;
  let cashBalanceNew = parsed.openingCash;

  let additionalTaxes5y = 0;
  let worstYearCashHit = 0;

  for (let year = 1; year <= 5; year += 1) {
    const rdDeductionOld = parsed.annualRD;
    const rdDeductionNew = buildDeductionFromCohorts(parsed.annualRD, year);

    const taxableIncomeOld = clampTaxableIncome(parsed.grossProfit - rdDeductionOld);
    const taxableIncomeNew = clampTaxableIncome(parsed.grossProfit - rdDeductionNew);

    const taxesOld = taxableIncomeOld * parsed.taxRate;
    const taxesNew = taxableIncomeNew * parsed.taxRate;

    const phantomIncomeTax = taxesNew - taxesOld;

    const annualRunCost = parsed.monthlyBurn * 12;

    const cashFlowOld = parsed.grossProfit - rdDeductionOld - taxesOld - annualRunCost;
    const cashFlowNew = parsed.grossProfit - rdDeductionNew - taxesNew - annualRunCost;

    cashBalanceOld += cashFlowOld;
    cashBalanceNew += cashFlowNew;

    const runwayMonthsOld = runwayMonths(cashBalanceOld, parsed.monthlyBurn);
    const runwayMonthsNew = runwayMonths(cashBalanceNew, parsed.monthlyBurn);

    projection.push({
      year,
      rdDeductionOld,
      rdDeductionNew,
      taxableIncomeOld,
      taxableIncomeNew,
      taxesOld,
      taxesNew,
      phantomIncomeTax,
      cashFlowOld,
      cashFlowNew,
      cashBalanceOld,
      cashBalanceNew,
      runwayMonthsOld,
      runwayMonthsNew,
    });

    additionalTaxes5y += phantomIncomeTax;
    worstYearCashHit = Math.max(worstYearCashHit, phantomIncomeTax);
  }

  const runwayLossMonthsAtYear5 =
    projection[4].runwayMonthsOld - projection[4].runwayMonthsNew;

  return {
    totals: {
      additionalTaxes5y,
      averageAnnualCashHit: additionalTaxes5y / 5,
      worstYearCashHit,
      runwayLossMonthsAtYear5,
    },
    projection,
  };
}
