'use client';
import React from 'react';
import LoanBreakdown from './loanBreakdown';
import PaymentsSchedule from './paymentsSchedule';

function page() {
  return (
    <div className="w-full flex flex-wrap justify-around mx-4 h-full">
      <LoanBreakdown />
      <PaymentsSchedule />
    </div>
  );
}

export default page;
