import { Button } from '@/components/ui';
import { CheckCircleIcon, Clock, Frown } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function RejectedLoan() {
  return (
    <section className="flex justify-center items-center h-[60vh] md:h-[70vh] lg:h-[80vh]">
      <div className="rounded-lg border bg-card text-card-foreground shadow-md max-w-[550px] mx-auto p-4 ">
        <div className="flex flex-col items-center justify-center gap-4 py-6">
          <Frown className="text-yellow-500 w-12 h-12" />
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl/tight">
              we're really sorry
            </h1>
            <p className="max-w-[550px] p-4 text-gray-500 text-left">
              Your loan was rejected, we can't offer you any
              alternative at this time. please contact us at
              info@ripae.ca if you have any question.
            </p>
          </div>
          <Button className="w-[80%] mt-4" asChild>
            <Link href="/dashboardBorrower">Go Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default RejectedLoan;
