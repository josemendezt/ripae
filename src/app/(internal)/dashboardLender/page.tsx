'use client';
import React from 'react';
import { Button } from '@/components/ui';
import { NotebookPen } from 'lucide-react';
import Link from 'next/link';
import InvestmentInfoWrapper from './investmentInfoWrapper';

function DashboardLender() {
  return (
    <div className="w-full mt-8">
      <div className="flex mb-4 flex-wrap">
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
        <InvestmentInfoWrapper />
      </div>
    </div>
  );
}

export default DashboardLender;
