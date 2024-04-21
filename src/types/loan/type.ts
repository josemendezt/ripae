export enum LoanStatus {
  ARCHIVED = 'archived',
  DRAFT = 'draft',
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  ACTIVE = 'active',
  DELAYED = 'delayed',
  PAID = 'paid',
  DEFAULT = 'default',
}

export type Loan = {
  id: string;
  created_at?: Date | string;
  loan_id?: string;
  amount: string;
  term: number | string;
  borrower_id: string;
  interest_rate: number;
  status: LoanStatus;
  pending_amount: number;
  payment_period: string; // check this later
};
