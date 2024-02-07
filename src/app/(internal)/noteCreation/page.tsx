'use client';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NoteCreation() {
  const amounts = [
    250, 500, 750, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500,
    5000,
  ];

  const router = useRouter();

  const [selectedAmount, setSelectedAmount] = useState<number>();
  const [noteOptions, setNoteOptions] = useState<number[][]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const generateNotes = (number: number) => {
    const objects = [];
    const interest = '6.5% - 13.5%';
    const period = '30';
    let idCounter = 1;

    for (let value = 250; value <= number; value += 250) {
      const obj = {
        value: 250,
        interest,
        period,
        id: idCounter,
      };
      objects.push(obj);
      idCounter++;
    }

    return objects;
  };

  const getInterest = (period: string) => {
    switch (period) {
      case '30':
        return '6.5% - 13.5%';
      case '60':
        return '8.5% - 15.5%';
      default:
        return '10.5% - 17.5%';
    }
  };

  function addNotes() {
    const baseTotal = selectedAmount || 0;
    if (notes.length === 0) {
      return [
        {
          value: baseTotal,
          interest: '6.5% - 13.5%',
          period: '30',
          id: 1,
          isDeleting: false,
        },
      ];
    }

    let newNotes = [];
    let newNumberOfNotes = notes.length;

    for (let i = newNumberOfNotes + 1; i <= baseTotal / 250; i++) {
      if (baseTotal % i === 0 && (baseTotal / i) % 250 === 0) {
        newNumberOfNotes = i;
        break;
      }
    }

    const newValue = baseTotal / newNumberOfNotes;

    newNotes = Array.from(
      { length: newNumberOfNotes },
      (_, index) => ({
        value: newValue,
        interest: getInterest('30'),
        period: '30',
        id: index + 1,
        isDeleting: false,
      })
    );

    setNotes(newNotes);
  }

  function removeNotes() {
    const baseTotal = selectedAmount;
    if (notes.length <= 1 || !baseTotal) {
      return [
        {
          value: baseTotal,
          interest: '10%',
          period: '1 month',
          id: 1,
        },
      ];
    }

    let newValuePerNote = 250;
    let newNumberOfNotes = baseTotal / newValuePerNote;

    while (
      baseTotal % newValuePerNote !== 0 ||
      newNumberOfNotes > notes.length - 1
    ) {
      newValuePerNote += 250;
      newNumberOfNotes = baseTotal / newValuePerNote;
    }

    if (newNumberOfNotes >= notes.length) {
      newValuePerNote -= 250;
      newNumberOfNotes = baseTotal / newValuePerNote;
    }

    const updatedNotes: Note[] = Array.from({
      length: newNumberOfNotes,
    }).map((_, index) => ({
      value: newValuePerNote,
      interest: getInterest('30'),
      period: '30',
      id: index + 1,
      isDeleting: false,
    }));

    setNotes(updatedNotes);
  }

  function generateSpecificCombinations(total: number) {
    let combinations = [];

    if (amounts.includes(total)) {
      combinations.push([total]);
    }

    const minAmount = Math.min(...amounts);
    combinations.push(
      Array(Math.floor(total / minAmount)).fill(minAmount)
    );

    for (let parts = 2; parts <= 7; parts++) {
      const avgAmount = Math.floor(total / parts);
      let closestAmounts = amounts
        .filter((a) => a <= avgAmount)
        .sort((a, b) => b - a);

      let combo = [];
      let currentSum = 0;
      for (let amount of closestAmounts) {
        while (currentSum + amount <= total && combo.length < parts) {
          combo.push(amount);
          currentSum += amount;
        }
        if (currentSum === total) break;
      }

      if (combo.length === parts && currentSum === total) {
        combinations.push(combo);
      }
    }

    const combinationStrings = combinations.map((comb) =>
      JSON.stringify(comb.sort((a, b) => a - b))
    );

    const uniqueCombinations = new Set(combinationStrings);

    const uniqueCombinationsArray = Array.from(
      uniqueCombinations
    ).map((combStr) => JSON.parse(combStr));

    setNoteOptions(
      uniqueCombinationsArray.sort((a, b) => a.length - b.length)
    );
  }

  const assignNotes = (newNotes: number[]) => {
    const tempNotes = newNotes.map((n, index) => ({
      interest: '6.5% - 13.5%',
      period: '30',
      id: index,
      value: n,
    }));

    setNotes(tempNotes);
  };

  useEffect(() => {
    if (selectedAmount) {
      setNotes(generateNotes(selectedAmount));
    }
  }, [selectedAmount]);

  const changePeriod = (noteId: number, period: string) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === noteId) {
          note.period = period;

          note.interest = getInterest(period);
        }
        return note;
      })
    );
  };

  return (
    <div className="h-full w-[75%] mx-auto ">
      <Card className="  m-8">
        <CardHeader>
          <CardTitle>Create Note</CardTitle>
          <CardDescription>
            Fill the following information to create your note(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="invest">
                How much would you like to invest?
              </Label>
              <Select
                onValueChange={(val) => {
                  setSelectedAmount(Number(val));
                  generateSpecificCombinations(Number(val));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Amount" />
                </SelectTrigger>
                <SelectContent>
                  {amounts.map((amount) => (
                    <SelectItem
                      key={amount}
                      value={amount.toString()}
                    >
                      {amount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {noteOptions.length > 0 && (
              <>
                <CardDescription>
                  We have the following suggestions to divide your
                  funds in multiple notes, the lowest they are the
                  safest, but the return will be smaller.
                  Alternatively, you can customize it using the
                  buttons to Add or Delete notes.
                </CardDescription>
                <p className=" font-semibold">Note Options</p>
                <section className="flex gap-4">
                  {noteOptions.map((opt, index) => (
                    <div
                      className={cn(
                        'border rounded-full px-6 py-2 cursor-pointer transition duration-300 ease-in-out hover:border-primary hover:border-2',
                        opt.length === notes.length &&
                          'bg-primary text-secondary'
                      )}
                      key={`${opt}-${index}`}
                      onClick={() => {
                        assignNotes(opt);
                      }}
                    >
                      {opt.length} notes
                    </div>
                  ))}
                </section>
              </>
            )}
            {noteOptions.length > 0 && (
              <>
                <p className=" font-semibold mt-2">Customize Notes</p>
                <div className="flex gap-8 mt-0">
                  <Button
                    onClick={addNotes}
                    disabled={notes[0] && notes[0].value === 250}
                  >
                    Add Notes +
                  </Button>
                  <Button
                    disabled={notes.length === 1}
                    onClick={removeNotes}
                    variant="secondary"
                  >
                    Delete Notes -
                  </Button>
                </div>
              </>
            )}
            <hr />
            {notes.length > 0 && (
              <div className="flex flex-col  space-y-1.5">
                <div className="flex flex-wrap gap-4  space-around items-center">
                  {notes?.map((note) => (
                    <Card
                      key={note.id}
                      className={cn(
                        'bg-secondary ' &&
                          note.isDeleting &&
                          'bg-secondary transition-transform duration-150 ease-in-out scale-0'
                      )}
                    >
                      <div className="flex space-between items-center gap-6 h-[98px] px-4">
                        <div className="ml-4">
                          <Label>Amount</Label>
                          <div className="text-2xl">
                            {note.value.toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <Label>Period (Months)</Label>
                          <Select
                            defaultValue={note.period}
                            onValueChange={(val) =>
                              changePeriod(note.id, val)
                            }
                          >
                            <SelectTrigger className="bg-secondary border-primary">
                              <SelectValue placeholder="Select Period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">
                                30 Days
                              </SelectItem>
                              <SelectItem value="60">
                                60 Days
                              </SelectItem>
                              <SelectItem value="90">
                                90 Days
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Interest</Label>
                          <div className="text-2xl">
                            {note.interest}
                          </div>
                        </div>
                        {/* {notes.length > 1 && (
                          <div
                            onClick={() => deleteNote(note.id)}
                            className="mx-auto p-6 hover:bg-muted-foreground  relative left-4 border border-primary bg-primary text-secondary cursor-pointer flex flex-col justify-center rounded-r-lg"
                          >
                            <Label className="mb-1">Delete</Label>
                            <Trash2 className="h-8 ml-2" />
                          </div>
                        )} */}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            className="w-40"
            onClick={() => router.back()}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            className="w-40"
            onClick={() => {
              router.push('/myNotes');
            }}
          >
            Confirm
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
