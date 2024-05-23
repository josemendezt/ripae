'use client';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function LoanInfo({ link }: { link: string }) {
  const router = useRouter();

  const [amount, setAmount] = useState<number>();

  const is50Multiple = () => {
    //not value selected yet
    if (!amount) return true;

    if (amount < 250 || amount > 2000 || amount % 50 !== 0) {
      return false;
    }

    return true;
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Step 4: Loan Details</CardTitle>
        <CardDescription>
          Please fill in the fields below with your loan details. The
          loan term is for 90 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose</Label>
          <Select>
            <SelectTrigger id="purpose">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="unexpectedExp">
                Unexpected Expenses
              </SelectItem>
              <SelectItem value="medicalBills">
                Medical Bills
              </SelectItem>
              <SelectItem value="carRepairs">Car Repairs</SelectItem>
              <SelectItem value="house">
                Home Improvements/Repairs
              </SelectItem>
              <SelectItem value="debt">Debt Consolidation</SelectItem>
              <SelectItem value="smallBusiness">
                Funding for Small Businesses
              </SelectItem>
              <SelectItem value="travel">
                Travel or Vacation
              </SelectItem>
              <SelectItem value="education">
                Education Expenses
              </SelectItem>
              <SelectItem value="special">
                Special Ocassions
              </SelectItem>
              <SelectItem value="moving">Moving Costs</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="invest">
            How much would you like to borrow?
          </Label>
          <Input
            type="number"
            min={250}
            max={2000}
            step={50}
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
          <CardDescription
            className={cn(!is50Multiple() && 'text-red-500')}
          >
            You can only use multiples of 50 between 250 and 2000.
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="mt-16">
        <Button
          variant="outline"
          className="w-32"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <Button
          className="ml-auto w-32"
          disabled={!amount || !is50Multiple()}
          onClick={() => {
            router.push(link);
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
