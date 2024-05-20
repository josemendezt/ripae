export enum LoanStatus {
  ARCHIVED = 'archived',
  TAKEN = 'taken',
  PENDING = 'pending',
  PAID = 'paid',
  WRITE_OFF = 'write_off',
}

export type Loan = {
  id: string; // UUID
  created_at: string | Date; // Timestamp with time zone
  amount: number; // Numeric
  borrower_id: string; // UUID
  gratitude: number; // Numeric
  status: string; // Text
  reason: string; // Text
  lender_id: string; // UUID
  payment_date: string | Date; // Timestamp with time zone
  expiration_date: string | Date; // Timestamp with time zone
};
