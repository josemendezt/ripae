'use client';
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import ActionButton from './actionButton';
import SuccessFunded from './successFunded';

function RequestInfo() {
  const [requestFunded, setRequestFunded] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-full">
        <ActionButton onClick={() => setOpen(true)} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Information</DialogTitle>
        </DialogHeader>
        {requestFunded ? (
          <SuccessFunded />
        ) : (
          <>
            <div className="w-full flex flex-col">
              <div className="flex border-b p-4 pt-2 w-full gap-2">
                <div>Borrower Name:</div>
                <div className="font-semibold">Wally West</div>
              </div>
              <div className="flex border-b p-4 w-full gap-2">
                <div>Purpose:</div>
                <div className="font-semibold">
                  Unexpected expense
                </div>
              </div>
              <div className="flex border-b  p-4 w-full gap-2">
                <div>Risk Profile: </div>
                <div className="font-semibold">Medium</div>
              </div>
              <div className="flex border-b  p-4 w-full gap-2">
                <div>Requested Amount: </div>
                <div className="font-semibold">2000</div>
              </div>
            </div>
            <div className="flex w-full  gap-4 justify-end mt-4">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setRequestFunded(true)}
                type="button"
              >
                Fund Request
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default RequestInfo;
