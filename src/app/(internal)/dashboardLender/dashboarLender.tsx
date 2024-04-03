'use client';
import React from 'react';
import Sidebar from '../sidebar';
import InvestmentInfo from './investmentInfo';
import { PurchasedInvesments } from './purchasedInvestments';
import { Button } from '@/components/ui';
import { NotebookPen } from 'lucide-react';
import Link from 'next/link';

function DashboardLender() {
  return (
    <div className="w-full mt-8">
      <div className="flex mb-4">
        <h1 className="text-3xl ml-8 font-semibold ">
          Loan Activity
        </h1>
        <Link href="/noteCreation">
          <Button className="ml-4 p-4 text-secondary text-lg  w-60 h-12">
            <NotebookPen className="text-secondary mr-2" />
            Create a loan proposal
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap w-full justify-around">
        <InvestmentInfo />
        <div className="w-[95%] mt-4">
          <h2 className="font-semibold text-xl mb-1">
            Active Notes (3)
          </h2>
          <PurchasedInvesments />
        </div>
      </div>
    </div>
  );
}

export default DashboardLender;
