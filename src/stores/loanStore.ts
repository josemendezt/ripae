import { LoanStatus } from '@/types/loan/type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserState = {
  loanStatus: LoanStatus | null;
  setLoanStatus: (user: LoanStatus) => void;
};

export const useLoanStore = create<UserState>()(
  devtools((set) => ({
    loanStatus: LoanStatus.PENDING,
    setLoanStatus: (status) =>
      set((state) => ({
        loanStatus: status,
      })),
  }))
);
