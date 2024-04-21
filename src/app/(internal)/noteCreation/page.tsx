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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui';

import ActionButton from '../requests/actionButton';
import ConfirmationMsg from './ConfirmationMsg';
import LoanCard from './loanCard';
import { useNoteStore } from '@/stores/noteStore';

export default function NoteCreation() {
  const router = useRouter();

  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [divideBy, setDivideBy] = useState<number>(0);
  const { notes, addNote, setNotes } = useNoteStore();

  function addNotes() {
    addNote({
      id: notes.length + 1,
      value: divideBy || 250,
      isDeleting: false,
    });
  }

  const is50Multiple = () => {
    //not value selected yet
    if (!selectedAmount) return true;

    if (selectedAmount < 250 || selectedAmount % 50 !== 0) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    setNotes([]);
    function divideAmount() {
      if (selectedAmount && divideBy) {
        const fullParts = Math.floor(selectedAmount / divideBy);

        const remainder = selectedAmount % divideBy;

        const result = Array.from({ length: fullParts }, (_, i) => ({
          id: i + 1,
          value: divideBy,
          isDeleting: false,
        }));

        if (remainder !== 0 && remainder >= 250) {
          result.push({
            id: fullParts + 1,
            value: remainder,
            isDeleting: false,
          });
        }

        setNotes(result);
      }
    }
    divideAmount();
  }, [selectedAmount, divideBy]);

  const totalNotes = notes.reduce(
    (sum, current) => sum + current.value,
    0
  );

  const notesHasInvalidAmount = () => {
    for (const obj of notes) {
      if (
        obj.value < 250 ||
        obj.value > 2000 ||
        obj.value % 50 !== 0
      ) {
        return true;
      }
    }
    return false;
  };

  const getAmountColor = () => {
    if (selectedAmount > totalNotes) {
      return 'text-yellow-400';
    } else if (totalNotes > selectedAmount) {
      return 'text-orange-600';
    }
    return 'text-primary';
  };

  return (
    <div className="h-full w-[75%] mx-auto ">
      <Card className="  m-8">
        <CardHeader>
          <CardTitle>Create Loan Proposals</CardTitle>
          <CardDescription>
            Fill the following information to create your loan
            proposal(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="invest">
                How much would you like to lend?
              </Label>
              <Input
                id="invest"
                type="number"
                min={250}
                step={50}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedAmount(Number(val));
                  setDivideBy(0);
                }}
              />
              <CardDescription
                className={cn(!is50Multiple() && 'text-red-500')}
              >
                You can only use multiples of 50 and the minimum
                amount is 250
              </CardDescription>
              {selectedAmount >= 500 && (
                <>
                  <Label htmlFor="divisor">Split your funds</Label>
                  <Select
                    onValueChange={(val) => {
                      setDivideBy(Number(val));
                    }}
                  >
                    <SelectTrigger id="divisor">
                      <SelectValue placeholder="Divide funds by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="250">
                        Divide by 250
                      </SelectItem>
                      <SelectItem value="500">
                        Divide by 500
                      </SelectItem>
                      <SelectItem value="1000">
                        Divide by 1000
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <CardDescription>
                    We encourage you to split your funds to have more
                    available micro loans, help more people and reduce
                    the risk. If the number is not fully divisible we
                    will adjust it, after that, you can modify the
                    microloans.
                  </CardDescription>
                </>
              )}
            </div>
            <div className="flex gap-8 mt-0">
              <Button onClick={addNotes}>Add Loan +</Button>
            </div>
            {notes.length > 0 && (
              <div className="flex flex-col  space-y-1.5">
                <div className="flex flex-wrap gap-4  space-around items-center">
                  {notes?.map((note) => (
                    <LoanCard note={note} key={note.id} />
                  ))}
                </div>
              </div>
            )}
            {notesHasInvalidAmount() && (
              <div className="text-red-500">
                Amounts in the loans must be multiples of 50 and must
                be between 250 and 2000
              </div>
            )}
          </div>
          {totalNotes > 0 && selectedAmount > 0 && (
            <div className={`flex gap-4 mt-4 ${getAmountColor()}`}>
              <div>Desired amount to loan: {selectedAmount}</div>
              <div>Real amount to loan: {totalNotes}</div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            className="w-40"
            onClick={() => router.back()}
            variant="outline"
          >
            Cancel
          </Button>
          <ConfirmationMsg
            totalNotes={totalNotes}
            notesHasInvalidAmount={notesHasInvalidAmount()}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
