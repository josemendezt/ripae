import { useGetUserTotalFundLoans } from '@/apis/fund/client';
import { useToast } from '@/components/ui';
import ErrorToast from '@/components/ui/ToastHandler';
import Loader from '@/components/ui/loader';
import { useLoanStore } from '@/stores/loanStore';
import { useUserStore } from '@/stores/userStore';
import { FundLoanDashboard } from '@/types/fund/type';
import { LoanStatus } from '@/types/loan/type';
import { ToastAction } from '@radix-ui/react-toast';
import { Suspense } from 'react';

type LoanInfo = {
  label: string;
  value: number;
}[];

export default function InvestmentInfo() {
  const { userStore } = useUserStore();
  const { loanStatus } = useLoanStore();
  const { toast } = useToast();
  const getUserFunds = useGetUserTotalFundLoans(
    userStore?.id as string
  );

  if (getUserFunds.isLoading) return <Loader />;

  if (getUserFunds.error || !getUserFunds.data)
    return (
      <ErrorToast
        msg="There was a problem to get you loan info"
        toastClick={getUserFunds.refetch}
      />
    );

  const userFunds = getUserFunds.data as FundLoanDashboard;
  const minInterest = 0.05;
  const maxInterest = 0.11;

  const getDashboardData = () => {
    // rember to review the in_review status, that is not in your sql function

    switch (loanStatus) {
      case LoanStatus.DRAFT:
        // case LoanStatus.PENDING:
        // case LoanStatus.IN_REVIEW:
        return [
          {
            label: 'Total to loan',
            value: userFunds.total_amount_funds_projected || 5,
          },
          {
            label: 'Projected Return (Range)',
            value: `${
              userFunds.total_amount_funds_projected * minInterest
            } - ${
              userFunds.total_amount_funds_projected * maxInterest
            }`,
          },
          {
            label: 'Interest Range',
            value: '5% - 11%',
          },
        ];
      // Set other status properly later
      case LoanStatus.ACTIVE:
      // case LoanStatus.DEFAULT:
      // case LoanStatus.DELAYED:
      // case LoanStatus.ARCHIVED:

      case LoanStatus.PAID:
      default:
        return [
          {
            label: 'Total loan',
            value: userFunds.total_amount_paid_loans,
          },
          {
            label: 'Total Return',
            value:
              (userFunds.total_amount_paid_loans *
                userFunds.average_interest_paid) /
              100,
          },
          {
            label: 'Earned Interest',
            value: userFunds.average_interest_paid,
          },
          {
            label: 'Current loans',
            value: userFunds.total_amount_active_loans,
          },
          {
            label: 'Projected Returns',
            value:
              (userFunds.total_amount_active_loans *
                userFunds.average_interest_active) /
              100,
          },
          {
            label: 'Blended Rate',
            value: `${
              (userFunds.average_interest_paid +
                userFunds.average_interest_active) /
              2
            }%`,
          },
        ];
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="flex gap-4 flex-wrap mt-4 justify-center">
        {getDashboardData()?.map((data, index) => (
          <div
            key={index}
            className="w-[32.5%] h-32 bg-secondary  rounded flex flex-col justify-center items-center "
          >
            <div className="text-md">{data.label}</div>
            <div className="text-3xl font-bold">{data.value}</div>
          </div>
        ))}
      </div>
    </Suspense>
  );
}
