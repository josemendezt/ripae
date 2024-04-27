import { CheckCircleIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import React, { useState } from 'react';
//import { insertFunds } from '@/apis/lender/client';
import { useNoteStore } from '@/stores/noteStore';
import { useUserStore } from '@/stores/userStore';

function ConfirmationMsg({
  totalNotes,
  notesHasInvalidAmount,
}: {
  totalNotes: number;
  notesHasInvalidAmount: boolean;
}) {
  const { notes } = useNoteStore();
  const { userStore } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [dataInserted, setDataInserted] = useState(false);
  const [open, setOpen] = useState(false);

  const createLoans = async () => {
    setIsLoading(true);
    //await insertFunds(notes, userStore?.id as string);
    setDataInserted(true);
    setIsLoading(false);
  };
  return (
    <Dialog open={isLoading || open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-full">
        <Button
          className="w-40"
          disabled={notesHasInvalidAmount || !notes.length}
          onClick={() => setOpen(true)}
        >
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Loans Information</DialogTitle>
        </DialogHeader>
        <section className="flex flex-col items-center justify-center gap-4 py-6 mx-auto h-80 pb-0">
          {!dataInserted ? (
            <div className="flex flex-col gap-2 ">
              <h1 className="text-lg font-semibold tracking-tighter sm:text-4xl/tight">
                Do you want to create these draft loans?
              </h1>
              <div className="flex flex-col gap-4">
                <div>
                  Total to Loan: <strong>{totalNotes}</strong>
                </div>
                <hr />
                <div>
                  Number of microloans (drafts):{' '}
                  <strong>{notes.length}</strong>
                </div>
                <hr />
                <Button
                  onClick={createLoans}
                  className="mt-4"
                  disabled={isLoading}
                >
                  Confirm{' '}
                  {isLoading && (
                    <Loader2 className="animate-spin  ml-2" />
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <CheckCircleIcon className="text-green-500 w-12 h-12" />
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl/tight">
                  Congratulations!
                </h1>
                <p className="max-w-[600px] text-gray-500">
                  Your loan proposals were created successfully, at
                  the moment is only a draft but we will notify you
                  when they can be activated. If you have any
                  question, please contact us at info@ripae.ca
                </p>
              </div>

              <Button className="w-[80%] mt-4" asChild>
                <Link href="/dashboardLender">Go Home</Link>
              </Button>
            </>
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationMsg;
