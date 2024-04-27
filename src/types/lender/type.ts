export type Lender = {
  id: string;
  created_at: string | Date;
  loan_id: string;
  amount: number;
  max_loan_amount: number;
  user_id: string;
};
