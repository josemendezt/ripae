'use client';
import { Button } from '@/components/ui';
import { CheckCircleIcon, Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function PendingLoan() {
  return (
    <section className="flex justify-center items-center h-[60vh] md:h-[70vh] lg:h-[80vh]">
      <div className="rounded-lg border bg-card text-card-foreground shadow-md max-w-lg mx-auto p-4">
        <div className="flex flex-col items-center justify-center gap-4 py-6">
          <Clock className="text-yellow-500 w-12 h-12" />
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl/tight">
              You are all set!
            </h1>
            <p className="max-w-[600px] text-gray-500">
              Your loan is pending from investor approvement, You will
              receive a notification in the next 48 hours with
              information about your application. If you haven't
              received it by then, please contact us at info@ripae.ca
            </p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Loa Details:</h2>
            <div className="flex border-b p-4 w-72 justify-between">
              <div>Amount</div>
              <div>1500</div>
            </div>
            <div className="flex border-b p-4 w-72 justify-between">
              <div>Period</div>
              <div>30 Days</div>
            </div>
            <div className="flex border-b p-4 w-72 justify-between">
              <div>Interest</div>
              <div>7%</div>
            </div>
            <div className="flex border-b p-4 w-72 justify-between">
              <div>Installments</div>
              <div>One of 1605</div>
            </div>
          </div>
          <Button className="w-[80%] mt-4" asChild>
            <Link href="/dashboardBorrower">Go Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PendingLoan;
