'use client';
import React, { useState } from 'react';
import { PurchasedInvesments } from '../dashboardLender/purchasedInvestments';
import { Button } from '@/components/ui';
import { NotebookPen } from 'lucide-react';
import Link from 'next/link';
import PendingNotes from './pendingNotes';

function MyNotes() {
  const [noteStatus, setNoteStatus] = useState('pending');

  const changeNoteStatus = (val: string) => {
    setNoteStatus(val);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-11/12 mt-8">
        <h1 className="text-3xl font-semibold mb-4">
          My Notes
          <Link href="/noteCreation">
            <Button className="ml-4 p-4 text-secondary text-lg  w-60 h-12">
              <NotebookPen className="text-secondary mr-2" />
              Create a loan proposal
            </Button>
          </Link>
        </h1>
        {(noteStatus === 'pending' || noteStatus === 'approved') && (
          <PendingNotes
            noteStatus={noteStatus}
            changeNoteStatus={changeNoteStatus}
          />
        )}

        <PurchasedInvesments />
      </div>
    </div>
  );
}

export default MyNotes;
