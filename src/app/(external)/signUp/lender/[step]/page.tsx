'use client';
import { useParams } from 'next/navigation';
import React from 'react';
// PersonalInfo is the same for both components
import PersonalInfo from '../../personalInfo';
import FinancialInfo from './financialInfo';
import PreferencesInfo from './preferencesInfo';
import StepsGuide from '../../stepsGuide';
import ComplianceInfo from './ComplianceInfo';
import GoalsInfo from './GoalsInfo';

function Step() {
  const params = useParams<{ step: string }>();

  const steps = {
    personalInfo: 'personal',
    financialInfo: 'financial',
    preferencesInfo: 'preferences',
    goalsInfo: 'goals',
    complianceInfo: 'compliance',
  };
  const getStep = (step: string) => {
    switch (step) {
      case steps.personalInfo:
        return <PersonalInfo link="/signUp/lender/financial" />;
      case steps.financialInfo:
        return <FinancialInfo />;
      case steps.preferencesInfo:
        return <PreferencesInfo />;
      case steps.goalsInfo:
        return <GoalsInfo />;
      default:
        return <ComplianceInfo />;
    }
  };

  return (
    <section className="flex items-center justify-center h-[80vh]">
      <div className="w-full  max-w-2xl">
        <StepsGuide steps={Object.values(steps)} />
        <div className="flex items-center justify-center">
          {getStep(params.step)}
        </div>
      </div>
    </section>
  );
}

export default Step;
