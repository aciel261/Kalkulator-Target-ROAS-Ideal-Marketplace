
export interface RoasInputs {
  sellingPrice: number;
  hpp: number;
  adminFeePercent: number;
  adSpendAllocation: number; // Percentage of gross margin used for ads
}

export interface RoasOutputs {
  grossMargin: number;
  adminFeeAmount: number;
  breakEvenAdSpend: number;
  idealAdSpend: number;
  breakEvenRoas: number;
  idealRoas: number;
  targetProfit: number;
}

export enum RoasStatus {
  BONCOS = 'BONCOS',
  IMPAS = 'IMPAS',
  PROFIT = 'PROFIT',
  IDEAL = 'IDEAL_GAS',
}
