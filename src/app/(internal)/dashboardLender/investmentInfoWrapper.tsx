import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { useLoanStore } from '@/stores/loanStore';
import { LoanStatus } from '@/types/loan/type';
import React from 'react';
import InvestmentInfo from './investmentInfo';
import { cn } from '@/lib/utils';
import { PurchasedInvesments } from './purchasedInvestments';

const InvestmentInfoWrapper = () => {
  const { loanStatus, setLoanStatus } = useLoanStore();

  const handleChange = (val: LoanStatus) => {
    setLoanStatus(val);
  };

  return (
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
      <div className=" mt-4">
        <PurchasedInvesments />
      </div>
    </section>
  );
};

export default InvestmentInfoWrapper;
