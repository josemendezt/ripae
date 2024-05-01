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
import { Loader2 } from 'lucide-react';
import { insertFunds } from '@/apis/lender/client';
import { useUserStore } from '@/stores/userStore';
import { useToast } from '@/components/ui';

export default function NoteCreation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const funds = searchParams.get('funds') as string;
  const [selectedAmount, setSelectedAmount] = useState<number>(
    funds ? Number(funds) : 0
  );

  const [maxLoan, setMaxLoan] = useState<number>(250);
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

  const is50Multiple = () => {
    //not value selected yet
    if (!selectedAmount) return true;

    if (selectedAmount < 250 || selectedAmount % 50 !== 0) {
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

  useEffect(() => {
    setMaxLoan(getSuggestedAmount());
  }, [selectedAmount]);

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
                onWheel={(event) => event.currentTarget.blur()}
                defaultValue={selectedAmount || undefined}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedAmount(Number(val));
                }}
              />

              {!is50Multiple() && (
                <CardDescription className="text-red-500">
                  You can only use multiples of 50 and the minimum
                  amount is 250
                </CardDescription>
              )}
            </div>
            {is50Multiple() && (selectedAmount as number) > 249 && (
              <div>
                <hr />
                <LoanChart
                  amount={selectedAmount}
                  maxLoan={maxLoan}
                />
                <div className="text-gray-600">
                  Note: while more interest means more earnings, that
                  also means more risk.
                </div>
                <hr />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-1">
                    Summary
                  </h3>
                  {selectedAmount > 499 && (
                    <div className="text-lg">
                      We will split your funds in multiples loans to
                      mitigate the risk and assist more borrowers. We
                      set a max of <strong>{maxLoan}</strong> per
                      loan.
                    </div>
                  )}

                  <div className="py-4 text-primary">
                    <div className="flex justify-around gap-12  border-t p-3">
                      <div>Total to loan</div>
                      <div className="text-lg font-bold">
                        {selectedAmount}
                      </div>
                    </div>
                    {selectedAmount > 499 && (
                      <div className="flex justify-around  border-t p-3">
                        <div>Max amount per loan</div>
                        <div className="text-lg font-bold">
                          {maxLoan}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-around p-3 border-t">
                      <div>Term per loan</div>
                      <strong className="text-lg">90 Days</strong>
                    </div>
                    <div className="flex justify-around p-3 border-b border-t">
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
          {selectedAmount > 0 && is50Multiple() && (
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
