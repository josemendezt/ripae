import { LoanStatus } from '@/types/loan/type';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type UserState = {
  loanStatus: LoanStatus | null;
  setLoanStatus: (user: LoanStatus) => void;
};

export const useLoanStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        loanStatus: LoanStatus.DRAFT,
        setLoanStatus: (status) =>
          set((state) => ({
            loanStatus: status,
          })),
      }),
      {
        name: 'loan-storage',
      }
    )
  )
);
