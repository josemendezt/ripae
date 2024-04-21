import { createClient } from '@/lib/supabase/client';
import { handleError } from '@/lib/utils';
import { FundLoan, FundLoanDashboard } from '@/types/fund/type';
import { LoanStatus } from '@/types/loan/type';
import { Note } from '@/types/note';

import { useQuery } from '@tanstack/react-query';

export async function getUserTotalFundLoans(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc(
    'calculate_funds_loans',
    {
      user_id: userId,
    }
  );

  if (error)
    return handleError(
      data,
      error,
      'We could not get your loan info, please try again'
    );

  const fundLoan = data[0] as FundLoanDashboard;

  return fundLoan;
}

export const useGetUserTotalFundLoans = (userId: string) => {
  const res = useQuery({
    queryKey: ['funds', userId],
    queryFn: () => getUserTotalFundLoans(userId),
    enabled: !!userId,
  });
  return res;
};

export const getFundsDraft = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('funds')
    .select('id, amount, lender_id, taken_on')
    .eq('lender_id', userId)
    .is('loan_id', null);

  if (error) {
    return handleError(
      data,
      error,
      'We could not get your drafts info, please try again'
    );
  }

  const formattedData = data.map((fund) => ({
    ...fund,
    loan: null,
  }));

  return formattedData as FundLoan[];
};

// export const useGetFundsDraft = (userId: string) => {
//   const res = useQuery({
//     queryKey: ['drafts', userId],
//     queryFn: () => getFundsDraft(userId),
//     enabled: !!userId,
//   });
//   return res;
// };

export const getLoansByStatus = async (
  userId: string,
  status: LoanStatus
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('funds')
    .select(
      `
        id,
        lender_id,
        amount,
        taken_on,
        loan_id,
        loans:id (id, interest_rate, term, status, reason)
      `
    )
    .eq('lender_id', userId)
    .not('loan_id', 'is', null)
    .filter('loans.status', 'eq', status);

  if (error) {
    console.error('Error fetching data:', error);
    return null;
  }

  const formattedData = data
    .filter((row) => row.loans.length)
    .map((item) => ({
      amount: item.amount,
      id: item.id,
      taken_on: item.taken_on,
      loan: {
        id: item.loans[0].id,
        term: item.loans[0].term,
        status: item.loans[0].status,
        interest_rate: item.loans[0].interest_rate,
        reason: item.loans[0].reason,
      },
    }));

  return formattedData as FundLoan[];
};

export const useGetLoansByStatus = (
  userId: string,
  status: LoanStatus
) => {
  const res = useQuery({
    queryKey: ['loanByStatus', userId, status],
    queryFn: () => {
      if (status === LoanStatus.DRAFT) {
        return getFundsDraft(userId);
      } else {
        return getLoansByStatus(userId, status);
      }
    },
    enabled: !!userId && !!status,
  });

  return res;
};

export async function insertFunds(notes: Note[], userId: string) {
  const supabase = createClient();

  const newFunds = notes.map((fund) => ({
    amount: fund.value,
    lender_id: userId,
  }));

  const { data, error } = await supabase
    .from('funds')
    .insert(newFunds);
  if (error) {
    return handleError(
      data,
      error,
      'We could not create your loans, please try again'
    );
  }
  return data;
}
