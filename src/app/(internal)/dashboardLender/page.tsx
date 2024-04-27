'use client';
import React from 'react';
import { Button } from '@/components/ui';
import { NotebookPen } from 'lucide-react';
import Link from 'next/link';
import EmptyPlaceholder from '@/components/ui/EmptyPlaceholder';
import LoanChart from '../noteCreation/LoanChart';
import InvestmentInfo from './investmentInfo';
import { useUserStore } from '@/stores/userStore';
import { useGetUserTotalFundLoans } from '@/apis/lender/client';
import Loader from '@/components/ui/loader';
import ErrorToast from '@/components/ui/ToastHandler';

function DashboardLender() {
  const { userStore } = useUserStore();
  const getUserFunds = useGetUserTotalFundLoans(
    userStore?.id as string
  );

  console.log('logDD', getUserFunds.data);
  if (getUserFunds.isLoading) return <Loader />;

  if (getUserFunds.error || !getUserFunds.data)
    return (
      <ErrorToast
        msg="There was a problem to get you loan info"
        toastClick={getUserFunds.refetch}
      />
    );

  return (
    <div className="w-full mt-8">
      <div className="flex mb-4 flex-wrap">
        <h1 className="text-3xl ml-8 font-semibold ">
          Loan Activity
        </h1>
        <Link
          href={
            getUserFunds.data.amount
              ? `/noteCreation?funds=${getUserFunds.data.amount}`
              : '/noteCreation'
          }
        >
          <Button className="ml-4 p-4 text-secondary text-lg  w-60 h-12">
            <NotebookPen className="text-secondary mr-2" />
            Set your funds to loan
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap w-full justify-around">
        <section className="w-[95%] ">
          {/* <h2 className="text-xl mb-1">Loan Status</h2>
      <div className="flex gap-4 ">
        <div
          className={cn(
            'border-2 text-primary rounded-full px-6 py-1 capitalize cursor-pointer transition duration-300 ease-in-out hover:border-primary hover:border-2 w-28 text-center',
            loanStatus === LoanStatus.DRAFT &&
              'bg-primary text-secondary border-primary'
          )}
          onClick={() => handleChange(LoanStatus.DRAFT)}
        >
          {LoanStatus.DRAFT}
        </div>
        <div
          className={cn(
            'border-2 text-primary rounded-full px-6 py-1 capitalize cursor-pointer transition duration-300 ease-in-out hover:border-primary hover:border-2 w-28 text-center',
            loanStatus === LoanStatus.ACTIVE &&
              'bg-primary text-secondary border-primary'
          )}
          onClick={() => handleChange(LoanStatus.ACTIVE)}
        >
          {LoanStatus.ACTIVE}
        </div>
      </div> */}
          <InvestmentInfo />
          <hr className="mt-8" />
          {getUserFunds.data?.amount ? (
            <div>
              <LoanChart
                amount={getUserFunds.data.amount as number}
                maxLoan={getUserFunds.data.max_loan_amount as number}
              />
              <hr />
            </div>
          ) : (
            <EmptyPlaceholder
              message={`You don't have funds to loan yet. We won't take your funds
            until a borrower applies for a loan and you accept an
            agreement with them.`}
              link="/noteCreation"
              linkMsg="Click here to set your funds"
            />
          )}

          {/* <div className=" mt-4">
        <PurchasedInvesments />
      </div> */}
        </section>
      </div>
    </div>
  );
}

export default DashboardLender;
