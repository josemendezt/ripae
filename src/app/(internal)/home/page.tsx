'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Textarea,
} from '@/components/ui';
import React from 'react';
import LoanRequestForm from './loanRequestForm';
import LoanPost from './loanPost';

function Home() {
  return (
    <section className="w-full mt-8">
      <div className=" h-screen max-w-full min-w-[70%] w-[600px] text-center mx-auto">
        WORK IN PROGRESS :)
        {/* <Dialog>
          <DialogTrigger className="w-full cursor-pointer">
            <Textarea
              className="text-2xl p-8 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-24 resize-none cursor-pointer pointer-events-none"
              placeholder="Request your loan here..."
            />
          </DialogTrigger>
          <DialogContent>
            <LoanRequestForm />
          </DialogContent>
        </Dialog>
        <LoanPost /> */}
      </div>
    </section>
  );
}

export default Home;
