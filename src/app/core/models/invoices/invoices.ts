export interface Invoice {
  id: string;
  bikeId: number;
  requestId: number;
  bike: string;
  startDate: number;
  endDate: number;
  payout?: string;
  total?: string;
  lister?: string;
  rider?: string;
}

export interface Settlement {
  batchId: string;
  requestIds: Array<number>;
  paidOutAt: string;
  amount: number;
}
