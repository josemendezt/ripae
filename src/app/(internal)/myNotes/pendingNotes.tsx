"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { CheckCircleIcon, User } from "lucide-react";
import Link from "next/link";

function PendingNotes({
  changeNoteStatus,
  noteStatus,
}: {
  changeNoteStatus: (val: string) => void;
  noteStatus: string;
}) {
  return (
    <section className="mb-8 border-b pb-8">
      <div className="pb-4">
        The following loans are pending to approve, please check the information
        below about the microloan and the applicant (the borrower) and accept or
        reject the application.
      </div>
      <div className="flex flex-wrap gap-12 w-fit space-around items-center text-center">
        <div className="rounded-lg border bg-card text-card-foreground shadow-md">
          <div className="font-semibold p-2">Loan Info</div>
          <div className="w-fit flex border-y ">
            <div className="p-4 border-r">
              <div className="mt-2">Amount</div>
              <div className="text-4xl font-bold ">1500</div>
            </div>
            <div className="w-fit flex flex-col">
              <div className="flex border-b p-2 w-56 justify-between">
                <div>Period:</div>
                <div>45 Days</div>
              </div>
              <div className="flex border-b p-2 w-56 justify-between">
                <div>Interest:</div>
                <div>9%</div>
              </div>
              <div className="flex  p-2 w-56 justify-between">
                <div>Installments: </div>
                <div>3</div>
              </div>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild className="w-full">
              <Button className="my-4 w-[90%] font-semibold">
                <User className="h-5 mr-1" />
                Check Applicant's Info
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Borrower Application</DialogTitle>
              </DialogHeader>
              {noteStatus === "approved" ? (
                <div className="flex flex-col items-center justify-center gap-4 py-6">
                  <CheckCircleIcon className="text-green-500 w-12 h-12" />
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl/tight">
                      Congratulations!
                    </h1>
                    <p className="max-w-[600px] text-gray-500">
                      You have accepted the borrower's application to your loan
                      and it has been processed. If you have any question,
                      please contact us at info@ripae.ca
                    </p>
                  </div>
                  <Button className="w-[80%] mt-4" asChild>
                    <Link href="/dashboardInvestor">Go Home</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="w-full flex flex-col">
                    <div className="flex border-b p-4 pt-2 w-full gap-2">
                      <div>Name:</div>
                      <div className="font-semibold">John Doe</div>
                    </div>
                    <div className="flex border-b p-4 w-full gap-2">
                      <div>Purpose:</div>
                      <div className="font-semibold">Unexpected expense</div>
                    </div>
                    <div className="flex  p-4 w-full gap-2">
                      <div>Risk Profile: </div>
                      <div className="font-semibold">Medium</div>
                    </div>
                  </div>
                  <div className="flex w-full justify-between ">
                    <Button
                      className="w-40"
                      type="button"
                      variant="destructive"
                      onClick={() => changeNoteStatus("rejected")}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => changeNoteStatus("approved")}
                      className="w-40"
                      type="button"
                    >
                      Approve
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}

export default PendingNotes;
