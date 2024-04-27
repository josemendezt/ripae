'use client';
import React, { useState } from 'react';
import { PurchasedInvesments } from '../dashboardLender/purchasedInvestments';
import { Button, Input } from '@/components/ui';
import { NotebookPen } from 'lucide-react';
import Link from 'next/link';
import { useDebounce } from '@/lib/utils';

function MyNotes() {
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 250);

  return (
    <div className="flex justify-center w-[90%]">
      <div className="w-11/12  mt-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold mb-4">My Loans</h1>
          {/* <Link href="/noteCreation">
            <Button className="p-4 text-secondary text-lg  w-60 h-12">
              <NotebookPen className="text-secondary mr-2" />
              Set your funds to loan
            </Button>
          </Link> */}
        </div>
        <Input
          className="mt-8 my-4"
          placeholder="Search by amount, interest rate, projected return or status"
          onChange={(e) => setSearch(e.target.value)}
        />
        <PurchasedInvesments filter={debouncedSearchTerm} />
      </div>
    </div>
  );
}

export default MyNotes;
