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
      value: 500,
      interest: '10%',
      period: '2 Month',
      id: 1,
    },
    {
      value: 250,
      interest: '10%',
      period: '1 Month',
      id: 2,
    },
    {
      value: 2000,
      interest: '10%',
      period: '3 Month',
      id: 3,
    },
    {
      value: 1000,
      interest: '10%',
      period: '2 Month',
      id: 4,
    },
    {
      value: 750,
      interest: '10%',
      period: '1 Month',
      id: 5,
    },
    {
      value: 5000,
      interest: '10%',
      period: '3 Month',
      id: 6,
    },
    {
      value: 500,
      interest: '10%',
      period: '1 Month',
      id: 4,
    },
    {
      value: 250,
      interest: '10%',
      period: '1 Month',
      id: 5,
    },
    {
      value: 500,
      interest: '10%',
      period: '2 Month',
      id: 6,
    },
    {
      value: 500,
      interest: '10%',
      period: '3 Month',
      id: 4,
    },
    {
      value: 2000,
      interest: '10%',
      period: '3 Month',
      id: 5,
    },
    {
      value: 500,
      interest: '10%',
      period: '1 Month',
      id: 6,
    },
  ];

  return (
    <div className="h-full w-[80%] mx-auto mt-8 ">
      <h1 className="text-3xl font-semibold ml-6">Available Loans</h1>
      <Card className="pb-16">
        <CardHeader>
          <CardDescription className="text-lg">
            Apply to one of the notes below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {notes.length > 0 && (
            <div className="text-center">
              <div className="flex flex-wrap gap-12  space-around items-center">
                {notes?.map((note) => (
                  <Card key={note.id} className="bg-secondary">
                    <div className="flex space-between items-center gap-6 h-[98px] px-4">
                      <div className="ml-4">
                        <div>Amount</div>
                        <div className="text-xl font-bold">
                          {note.value.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div>Period (Months)</div>
                        <div className="text-xl font-bold">
                          {note.period}
                        </div>
                      </div>
                      <div>
                        <div>Interest</div>
                        <div className="text-xl font-bold">
                          {note.interest}
                        </div>
                      </div>
                      {/* {notes.length > 1 && (
                          <div className="mx-auto p-5 hover:bg-muted-foreground  relative left-4 border border-primary bg-primary text-secondary cursor-pointer flex flex-col justify-center rounded-r-lg">
                            <Label className="mb-1">Apply</Label>
                            <SquarePen className="h-8 ml-2" />
                          </div>
                        )} */}
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
