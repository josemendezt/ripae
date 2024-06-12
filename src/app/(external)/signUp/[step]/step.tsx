'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
// PersonalInfo is the same for both components
import PersonalInfo from '../personalInfo';
import FinancialInfo from './financialInfo';
import StepsGuide from '../stepsGuide';
import ComplianceInfo from './ComplianceInfo';
import { User } from '@/types/user/type';
import { useUserStore } from '@/stores/userStore';
import Loader from '@/components/ui/loader';
import KYC from './kyc';
import BankConnection from './bankConnection';
import LoanInfo from './loan';

function Step({ user }: { user: User }) {
  const params = useParams<{ step: string }>();

  const { userStore, setUserStore } = useUserStore();

  useEffect(() => {
    if (!userStore) {
      setUserStore(user);
    }
  }, [setUserStore, user, userStore]);

  const steps = {
    personalInfo: 'personal',
    financialInfo: 'employment',
    // preferencesInfo: "preferences",
    // goalsInfo: "goals",
    //complianceInfo: 'compliance',
    kyc: 'kyc',
    bank: 'bank',
    loanInfo: 'loan',
  };
  //<LoanInfo />
  const getStep = (step: string) => {
    switch (step) {
      case steps.personalInfo:
        return <PersonalInfo link="/signUp/employment" />;
      case steps.financialInfo:
        return <FinancialInfo link="/signUp/kyc" />;
      case steps.kyc:
        return <KYC link="/signUp/bank" />;
      case steps.bank:
        return <BankConnection link="/signUp/loan" />;
      default:
        return <LoanInfo link="/riskAI" />;
    }
  };

  return (
    <section className="flex items-start justify-center h-[80vh]">
      <div className="w-full  max-w-2xl ">
        <h1 className="text-2xl mt-4 font-semibold">
          Phase 1: Application for the Loan
        </h1>
        <StepsGuide steps={Object.values(steps)} />
        <div className="flex items-center justify-center">
          {userStore ? (
            getStep(params.step)
          ) : (
            <Loader widthClass="w-[500px]" rows={10} />
          )}
        </div>
      </div>
    </section>
  );
}

export default Step;
