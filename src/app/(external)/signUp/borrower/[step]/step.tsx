"use client";
import { useParams } from "next/navigation";
import React from "react";
import PersonalInfo from "../../personalInfo";
import FinancialInfo from "./financialInfo";
import EmploymentInfo from "./employmentInfo";
import LoanInfo from "./loanInfo";
import StepsGuide from "../../stepsGuide";

function Step() {
  const params = useParams<{ step: string }>();

  const steps = {
    personalInfo: "personal",
    employmentInfo: "employment",
    financialInfo: "financial",
    loanInfo: "loan",
  };
  const getStep = (step: string) => {
    switch (step) {
      case steps.personalInfo:
        return <PersonalInfo link="/signUp/borrower/employment" />;
      // case steps.financialInfo:
      //   return <FinancialInfo />;
      case steps.employmentInfo:
        return <EmploymentInfo />;
      case steps.financialInfo:
        return <FinancialInfo />;
      default:
        return <LoanInfo />;
    }
  };

  return (
    <section className="flex items-start justify-center h-[80vh] ">
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
