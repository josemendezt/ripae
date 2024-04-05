"use client";
import React from "react";
import { Button } from "@/components/ui";
import { SquarePen } from "lucide-react";
import Link from "next/link";

function NoteRequest() {
  const notes = [
    {
      value: 2000,
      interest: "7%",
      period: "45 Days",
      monthlyAmount: "3 installments",
      id: 1,
      url: "/noteData/request",
    },
    // {
    //   value: 2000,
    //   interest: '10%',
    //   period: '60 Days',
    //   monthlyAmount: 'Two installments of 1100',
    //   url: '/noteData/request',
    //   id: 2,
    // },
    // {
    //   value: 2000,
    //   interest: '15%',
    //   period: '90 Days',
    //   monthlyAmount: 'Three installments of 966.67',
    //   id: 3,
    //   url: '/noteData/request',
    // },
  ];

  return (
    <div className="h-full w-fit mx-auto mt-8">
      <h1 className="text-3xl font-semibold ml-6 mb-4">Loan Requests</h1>
      <section className="rounded-lg border bg-card text-card-foreground shadow-md w-fit mx-auto p-12 ">
        <div className="text-lg mb-4 text-card-foreground">
          There are not avaialble loans with your specified criteria, we suggest
          to create a request for our lenders consideration:
        </div>
        <div>
          {notes.length > 0 && (
            <div className="text-center">
              <div className="flex flex-wrap gap-12 w-fit space-around items-center">
                {notes?.map((note) => (
                  <div
                    key={note.id}
                    className="w-80 h-64 flex flex-col justify-between gap-4 pt-8 rounded-lg border bg-card text-card-foreground shadow-md"
                  >
                    <div>
                      <div>Amount</div>
                      <div className="text-4xl font-bold">{note.value}</div>
                    </div>
                    <div>
                      <div>
                        Interest: <strong>{note.interest}</strong>
                      </div>
                      <div>
                        Period: <strong>{note.period}</strong>
                      </div>
                      <div>
                        Payments: <strong>{note.monthlyAmount}</strong>
                      </div>
                    </div>
                    <Link href={note.url}>
                      <Button className="w-[90%] mb-4 font-bold">
                        <SquarePen className="h-5 mr-1" />
                        Request Loan
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default NoteRequest;
