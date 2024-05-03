'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
// PersonalInfo is the same for both components
import PersonalInfo from '../../personalInfo';
import FinancialInfo from './financialInfo';
import PreferencesInfo from './preferencesInfo';
import StepsGuide from '../../stepsGuide';
import ComplianceInfo from './ComplianceInfo';
import GoalsInfo from './GoalsInfo';
import { User } from '@/types/user/type';
import { useUserStore } from '@/stores/userStore';
import Loader from '@/components/ui/loader';
import KYC from './kyc';
import { InvSiteList } from '@/types/inverite/Type';
import { useInveriteStore } from '@/stores/inveriteStore';
import BankConnection from './bankConnection';

function Step({
  user,
  inveriteList,
}: {
  user: User;
  inveriteList?: InvSiteList;
}) {
  const params = useParams<{ step: string }>();

  const { userStore, setUserStore } = useUserStore();
  const { siteList, setSiteList } = useInveriteStore();

  useEffect(() => {
    if (!userStore) {
      setUserStore(user);
    }
    if (!siteList && inveriteList) {
      setSiteList(inveriteList);
    }
  }, [setUserStore, user, userStore, siteList]);

  const steps = {
    personalInfo: 'personal',
    financialInfo: 'employment',
    // preferencesInfo: "preferences",
    // goalsInfo: "goals",
    complianceInfo: 'compliance',
    kyc: 'kyc',
    bank: 'bank',
  };

  const getStep = (step: string) => {
    switch (step) {
      case steps.personalInfo:
        return <PersonalInfo link="/signUp/lender/employment" />;
      case steps.financialInfo:
        return <FinancialInfo link="/signUp/lender/compliance" />;
      //   case steps.preferencesInfo:
      //     return <PreferencesInfo />;
      case steps.complianceInfo:
        return <ComplianceInfo link="/signUp/lender/kyc" />;
      case steps.kyc:
        return <KYC link="/signUp/lender/bank" />;
      default:
        return <BankConnection />;
    }
  };

  return (
    <section className="flex items-start justify-center h-[80vh]">
      <div className="w-full  max-w-2xl ">
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
