export type CalculatorInput = {
  annualRD: number;
  grossProfit: number;
  taxRate: number;
  openingCash: number;
  monthlyBurn: number;
};

export type ProjectionRow = {
  year: number;
  rdDeductionOld: number;
  rdDeductionNew: number;
  taxableIncomeOld: number;
  taxableIncomeNew: number;
  taxesOld: number;
  taxesNew: number;
  phantomIncomeTax: number;
  cashFlowOld: number;
  cashFlowNew: number;
  cashBalanceOld: number;
  cashBalanceNew: number;
  runwayMonthsOld: number;
  runwayMonthsNew: number;
};

export type CalculatorResult = {
  totals: {
    additionalTaxes5y: number;
    averageAnnualCashHit: number;
    worstYearCashHit: number;
    runwayLossMonthsAtYear5: number;
  };
  projection: ProjectionRow[];
};
