export type TaxFilingStatus = "profitable" | "break-even" | "loss-making";

export interface CalculatorInput {
  annualRevenue: number;
  annualRdSpend: number;
  annualOtherExpenses: number;
  rdGrowthRate: number;
  revenueGrowthRate: number;
  taxRate: number;
  cashReserve: number;
  monthlyBurn: number;
  projectionYears: number;
}

export interface ProjectionYear {
  year: number;
  revenue: number;
  rdSpend: number;
  rdDeductionIfImmediate: number;
  rdDeductionUnder174: number;
  taxableIncomeIfImmediate: number;
  taxableIncomeUnder174: number;
  taxIfImmediate: number;
  taxUnder174: number;
  additionalTaxFrom174: number;
  cumulativeAdditionalTax: number;
  runwayMonthsLost: number;
  phantomIncome: number;
}

export interface ProjectionSummary {
  totalAdditionalTax: number;
  peakAnnualAdditionalTax: number;
  firstYearTaxShock: number;
  endingRunwayMonthsLost: number;
}

export interface ProjectionResult {
  years: ProjectionYear[];
  summary: ProjectionSummary;
  status: TaxFilingStatus;
}

export interface SavedScenario {
  id: string;
  name: string;
  createdAt: string;
  input: CalculatorInput;
  summary: ProjectionSummary;
}
