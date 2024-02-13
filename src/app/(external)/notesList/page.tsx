'use client';
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from '@/components/ui';

import React from 'react';
import ApplyButton from './ApplyButton';

function NotesList() {
  const notes = [
    {
      value: 1500,
      interest: '7%',
      period: '30 Days',
      monthlyAmount: 'One installment of 1605',
      id: 1,
    },
    {
      value: 1500,
      interest: '10%',
      period: '60 Days',
      monthlyAmount: 'Two installments of 825',
      id: 2,
    },
    {
      value: 1500,
      interest: '15%',
      period: '90 Days',
      monthlyAmount: 'Three installments of 575',
      id: 3,
    },
  ];

  return (
    <div className="h-full w-fit mx-auto mt-8 ">
      <h1 className="text-3xl font-semibold ml-6 mb-4">
        Available Loans for You
      </h1>
      <Card>
        <CardHeader>
          <CardDescription className="text-lg">
            We have matched you with the following loans.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {notes.length > 0 && (
            <div className="text-center">
              <div className="flex flex-wrap gap-12  space-around items-center">
                {notes?.map((note) => (
                  <Card
                    key={note.id}
                    className="w-80 h-64 flex flex-col justify-between gap-4 pt-8"
                  >
                    <div>
                      <div>Amount</div>
                      <div className="text-4xl font-bold">
                        {note.value}
                      </div>
                    </div>
                    <div>
                      <div>
                        Interest: <strong>{note.interest}</strong>
                      </div>
                      <div>
                        Period (Months):{' '}
                        <strong>{note.period}</strong>
                      </div>
                      <div>
                        Payments:{' '}
                        <strong>{note.monthlyAmount}</strong>
                      </div>
                    </div>
                    <ApplyButton />
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default NotesList;
