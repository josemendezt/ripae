import { useGetUserTotalFundLoans } from '@/apis/lender/client';
import ErrorToast from '@/components/ui/ToastHandler';
import Loader from '@/components/ui/loader';
import { useLoanStore } from '@/stores/loanStore';
import { useUserStore } from '@/stores/userStore';
import { Lender } from '@/types/lender/type';
import { LoanStatus } from '@/types/loan/type';
import { Suspense } from 'react';

export default function InvestmentInfo() {
  const { userStore } = useUserStore();
  const { loanStatus } = useLoanStore();
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

  const userFunds = getUserFunds.data as Lender;
  const minInterest = 0.05;
  const maxInterest = 0.0875;

  const getDashboardData = () => {
    // rember to review the in_review status, that is not in your sql function

    switch (loanStatus) {
      case LoanStatus.DRAFT:
        // case LoanStatus.PENDING:
        // case LoanStatus.IN_REVIEW:
        return [
          {
            label: 'Total to loan',
            value: userFunds.amount,
          },
          {
            label: 'Projected Return (Range)',
            value: `${(userFunds.amount * minInterest).toFixed(
              2
            )} - ${(userFunds.amount * maxInterest).toFixed(2)}`,
          },
          {
            label: 'Interest Range',
            value: '5% - 8.75%',
          },
        ];
      // Set other status properly later
      case LoanStatus.ACTIVE:
      // case LoanStatus.WRITE_OFF:
      // case LoanStatus.DELAYED:
      // case LoanStatus.ARCHIVED:

      case LoanStatus.PAID:
        break;
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="flex gap-4 flex-wrap mt-4 justify-center">
        {getDashboardData()?.map((data, index) => (
          <div
            key={index}
            className="w-[31%] h-32 bg-secondary  rounded flex flex-col justify-center items-center max-md:w-full"
          >
            <div className="text-md">{data.label}</div>
            <div className="text-3xl font-bold">{data.value}</div>
          </div>
        ))}
      </div>
    </Suspense>
  );
}
