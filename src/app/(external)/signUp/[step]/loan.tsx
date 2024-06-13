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

    if (amount % 50 !== 0) {
      return false;
    }

    return true;
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Step 5: Loan Details</CardTitle>
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
        <div className="space-y-2">
          <Label htmlFor="term">Term of at least</Label>
          <Select>
            <SelectTrigger id="term">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="6 Months">6 Months</SelectItem>
              <SelectItem value="1 Year">1 Year</SelectItem>
              <SelectItem value="2 Years">2 Years</SelectItem>
              <SelectItem value="3 Years">3 Years</SelectItem>
              <SelectItem value="4 Years">4 Years</SelectItem>
              <SelectItem value="5 Years">5 Years</SelectItem>
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
            You can only use multiples of 50.
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
          className="ml-auto "
          disabled={!amount || !is50Multiple()}
          onClick={() => {
            router.push(link);
          }}
        >
          Go to Phase 2: AI Interview
        </Button>
      </CardFooter>
    </Card>
  );
}
