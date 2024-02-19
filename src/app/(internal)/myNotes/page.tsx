'use client';
import React, { useState } from 'react';
import { PurchasedInvesments } from '../dashboardInvestor/purchasedInvestments';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { NotebookPen, User } from 'lucide-react';
import Link from 'next/link';
import PendingNotes from './pendingNotes';

function MyNotes() {
  const [noteStatus, setNoteStatus] = useState(false);

  const changeNoteStatus = (val: boolean) => {
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
              Create a Note
            </Button>
          </Link>
        </h1>
        {!noteStatus && (
          <PendingNotes changeNoteStatus={changeNoteStatus} />
        )}

        <PurchasedInvesments />
      </div>
    </div>
  );
}

export default MyNotes;
