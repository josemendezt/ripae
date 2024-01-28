'use client';
import React from 'react';
import Sidebar from '../sidebar';
import LoanBreakdown from './loanBreakdown';
import DashboardBigButtons from './dashboardBigButtons';
import RecentTransactions from './recentTransactions';

function page() {
  return (
    <div className="w-full flex flex-wrap justify-around mx-4 h-full">
      <LoanBreakdown />
      <DashboardBigButtons />
      <RecentTransactions />
    </div>
  );
}

export default page;
