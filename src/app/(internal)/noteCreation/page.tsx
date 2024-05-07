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
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import LoanChart from './LoanChart';
import { Check, Loader2, Pencil } from 'lucide-react';
import { insertFunds } from '@/apis/lender/client';
import { useUserStore } from '@/stores/userStore';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useToast,
} from '@/components/ui';
import { cn } from '@/lib/utils';

export default function NoteCreation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const funds = searchParams.get('funds') as string;
  const [editMax, setEditMax] = useState<
    'default' | 'editing' | 'edited'
  >('default');
  const [selectedAmount, setSelectedAmount] = useState<number>(
    funds ? Number(funds) : 0
  );

  const [maxLoan, setMaxLoan] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { userStore } = useUserStore();
  const { toast } = useToast();

  const min = 5;
  const max = 8.75;

  const InsertData = async () => {
    if (userStore && selectedAmount) {
      setIsLoading(true);
      const data = await insertFunds(
        selectedAmount,
        maxLoan,
        userStore.id
      );

      if (data) {
        toast({
          description: 'Your funds data was updated successfuly!',
          className: 'bg-green-300 text-primary font-semibold',
          duration: 2000,
        });
        router.push('/dashboardLender');
      }
      setIsLoading(false);
    }
  };

  const is50Multiple = (amount: number) => {
    //not value selected yet
    if (!amount) return true;

    if (amount < 250 || amount % 50 !== 0) {
      return false;
    }

    return true;
  };

  const getSuggestedAmount = () => {
    let max: number = 0;
    if (selectedAmount < 500) {
      max = selectedAmount;
    } else if (selectedAmount < 1000) {
      max = 250;
    } else if (selectedAmount < 2000) {
      max = 500;
    } else if (selectedAmount < 4000) {
      max = 1000;
    } else {
      max = 2000;
    }

    return max;
  };

  const invalidMaxloan =
    maxLoan > selectedAmount ||
    maxLoan === 0 ||
    !is50Multiple(maxLoan);

  useEffect(() => {
    if (editMax === 'default') setMaxLoan(getSuggestedAmount());
  }, [selectedAmount, editMax]);

  return (
    <div className="h-full w-[75%] mx-auto ">
      <Card className="m-8">
        <CardHeader>
          <CardTitle>
            Allocate how many funds you want to loan
          </CardTitle>
          <CardDescription>
            Fill the following information to allocate the funds you
            want to loan
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
                onWheel={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  event.currentTarget.blur();
                }}
                defaultValue={selectedAmount || undefined}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedAmount(Number(val));
                }}
              />

              {!is50Multiple(selectedAmount) && (
                <CardDescription className="text-red-500">
                  You can only use multiples of 50 and the minimum
                  amount is 250
                </CardDescription>
              )}
            </div>
            {is50Multiple(selectedAmount) &&
              (selectedAmount as number) > 249 && (
                <div>
                  <hr />
                  <LoanChart
                    amount={selectedAmount}
                    maxLoan={maxLoan}
                  />
                  <div className="text-gray-600">
                    Note: while more interest means more earnings,
                    that also means more risk.
                  </div>
                  <hr />
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-1">
                      Summary
                    </h3>
                    {selectedAmount > 499 && (
                      <div className="text-lg">
                        We will split your funds in multiples loans to
                        mitigate the risk and assist more borrowers.
                        We suggest a max of{' '}
                        <strong>{getSuggestedAmount()}</strong> per
                        loan.
                      </div>
                    )}

                    <div className="py-4 text-primary">
                      <div className="flex justify-around gap-12  border-t p-4">
                        <div>Total to loan</div>
                        <div className="text-lg font-bold">
                          {selectedAmount}
                        </div>
                      </div>
                      {selectedAmount > 499 && (
                        <div className="flex justify-around items-center border-t p-3">
                          <div>Max amount per loan</div>
                          <div className="flex gap-2 items-center">
                            <Input
                              className="text-lg font-bold w-24 text-right"
                              disabled={editMax !== 'editing'}
                              value={maxLoan}
                              min={250}
                              step={50}
                              type="number"
                              onChange={(e) => {
                                setMaxLoan(Number(e.target.value));
                              }}
                              onWheel={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                event.currentTarget.blur();
                              }}
                            />
                            {invalidMaxloan && (
                              <CardDescription className="text-red-500">
                                You can only use multiples of 50, the
                                minimum amount is 250 and the maximum
                                is {selectedAmount}
                              </CardDescription>
                            )}
                            {editMax === 'editing' ? (
                              <Tooltip delayDuration={250}>
                                <TooltipTrigger
                                  className={cn(
                                    (maxLoan > selectedAmount ||
                                      maxLoan === 0 ||
                                      !is50Multiple(maxLoan)) &&
                                      'opacity-40 cursor-not-allowed pointer-events-none'
                                  )}
                                >
                                  <Check
                                    onClick={() => {
                                      setEditMax('edited');
                                    }}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="font-semibold">
                                    Confirm max loan
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <Tooltip delayDuration={250}>
                                <TooltipTrigger>
                                  <Pencil
                                    onClick={() => {
                                      setEditMax('editing');
                                    }}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="font-semibold">
                                    Edit max loan amount
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-around p-4 border-t">
                        <div>Term per loan</div>
                        <strong className="text-lg">90 Days</strong>
                      </div>
                      <div className="flex justify-around p-4 border-b border-t">
                        <div>Min expected return </div>
                        <strong className="text-lg">
                          {(selectedAmount * (min / 100)).toFixed(2)}
                        </strong>
                      </div>
                      <div className="flex justify-around p-4 border-b">
                        <div>Max expected return </div>
                        <strong className="text-lg">
                          {(selectedAmount * (max / 100)).toFixed(2)}
                        </strong>
                      </div>
                      <div className="flex justify-around p-4 border-b">
                        <div>Interest range</div>
                        <div className="text-lg font-bold">{`${min}% - ${max}%`}</div>
                      </div>
                    </div>
                    <div className="font-semibold text-lg">
                      We won't take your funds until we match you with
                      potential borrowers and you accept their loan
                      request.
                    </div>
                  </div>
                </div>
              )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between ">
          <Button
            className="w-40"
            onClick={() => router.back()}
            disabled={isLoading}
            variant="outline"
          >
            Cancel
          </Button>
          {selectedAmount > 0 &&
            is50Multiple(selectedAmount) &&
            !invalidMaxloan && (
              <Button
                onClick={InsertData}
                className="w-40"
                disabled={isLoading}
              >
                Submit{' '}
                {isLoading && (
                  <Loader2 className="animate-spin  ml-2" />
                )}
              </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
