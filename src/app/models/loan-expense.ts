export interface LoanExpense {

  id: number;
  owner: string;
  name: string;
  lenderName: string;
  category: string;
  totalAmount: number;
  emiAmount: number;
  tenure: number;
  processingFee: number;
  interestRate: number;
  disbursedDate: string;
  emiStartDate: string;
}
