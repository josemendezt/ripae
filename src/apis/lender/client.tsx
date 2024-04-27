import { createClient } from '@/lib/supabase/client';
import { handleError } from '@/lib/utils';
import { Lender } from '@/types/lender/type';
import { LoanStatus } from '@/types/loan/type';
import { Note } from '@/types/note';

import { useQuery } from '@tanstack/react-query';

export async function getUserTotalFundLoans(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('lenders')
    .select('id, user_id, amount')
    .eq('user_id', userId);

  if (error)
    return handleError(
      data,
      error,
      'We could not get your loan info, please try again'
    );

  if (data.length) return data[0] as Partial<Lender>;
  return {
    id: '',
    amount: 0,
    loan_id: '',
    user_id: '',
  } as Partial<Lender>;
}

export const useGetUserTotalFundLoans = (userId: string) => {
  const res = useQuery({
    queryKey: ['lenders', userId],
    queryFn: () => getUserTotalFundLoans(userId),
    enabled: !!userId,
  });
  return res;
};

// export const getFundsDraft = async (userId: string) => {
//   const supabase = createClient();
//   const { data, error } = await supabase
//     .from('funds')
//     .select('id, amount, lender_id, taken_on')
//     .eq('lender_id', userId)
//     .is('loan_id', null);

//   if (error) {
//     return handleError(
//       data,
//       error,
//       'We could not get your drafts info, please try again'
//     );
//   }

//   const formattedData = data.map((fund) => ({
//     ...fund,
//     loan: null,
//   }));

//   return formattedData as FundLoan[];
// };

// export const useGetFundsDraft = (userId: string) => {
//   const res = useQuery({
//     queryKey: ['drafts', userId],
//     queryFn: () => getFundsDraft(userId),
//     enabled: !!userId,
//   });
//   return res;
// };

// export const getLoansByStatus = async (
//   userId: string,
//   status: LoanStatus
// ) => {
//   const supabase = createClient();
//   const { data, error } = await supabase
//     .from('funds')
//     .select(
//       `
//         id,
//         lender_id,
//         amount,
//         taken_on,
//         loan_id,
//         loans:id (id, interest_rate, term, status, reason)
//       `
//     )
//     .eq('lender_id', userId)
//     .not('loan_id', 'is', null)
//     .filter('loans.status', 'eq', status);

//   if (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }

//   const formattedData = data
//     .filter((row) => row.loans.length)
//     .map((item) => ({
//       amount: item.amount,
//       id: item.id,
//       taken_on: item.taken_on,
//       loan: {
//         id: item.loans[0].id,
//         term: item.loans[0].term,
//         status: item.loans[0].status,
//         interest_rate: item.loans[0].interest_rate,
//         reason: item.loans[0].reason,
//       },
//     }));

//   return formattedData as FundLoan[];
// };

// export const useGetLoansByStatus = (
//   userId: string,
//   status: LoanStatus
// ) => {
//   const res = useQuery({
//     queryKey: ['loanByStatus', userId, status],
//     queryFn: () => {
//       if (status === LoanStatus.DRAFT) {
//         return getFundsDraft(userId);
//       } else {
//         return getLoansByStatus(userId, status);
//       }
//     },
//     enabled: !!userId && !!status,
//   });

//   return res;
// };

export async function insertFunds(
  amount: number,
  maxLoan: number,
  userId: string
) {
  const supabase = createClient();

  const { data } = await supabase
    .from('lenders')
    .select()
    .eq('user_id', userId)
    .single();

  if (data) {
    console.log('logH2', data);
    const { data: updateData, error } = await supabase
      .from('lenders')
      .update({ amount, max_loan_amount: maxLoan })
      .eq('user_id', userId)
      .select();

    if (error) {
      return handleError(
        updateData,
        error,
        'We could not create your loans, please try again'
      );
    }

    return updateData;
  } else {
    const { data: insertData, error } = await supabase
      .from('lenders')
      .insert({ amount, max_loan_amount: maxLoan, user_id: userId });

    if (error) {
      return handleError(
        insertData,
        error,
        'We could not create your loans, please try again'
      );
    }
    return true;
  }
}
