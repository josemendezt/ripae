import { Loan, LoanStatus } from '../loan/type';

export type Fund = {
  id: string;
  created_at?: Date | string;
  loan_id?: string;
  amount: string;
};

export type FundLoanDashboard = {
  // draft and pending
  total_amount_funds_projected: number;
  // Active
  total_amount_active_loans: number;
  average_interest_active: number;
  // Paid
  total_amount_paid_loans: number;
  average_interest_paid: number;
};

export type FundLoan = {
  amount: number;
  id: string;
  loan: {
    id: string;
    term: number;
    status: LoanStatus;
    interest_rate: number;
    reason: string;
  } | null;
  taken_on: Date | string | null;
};
