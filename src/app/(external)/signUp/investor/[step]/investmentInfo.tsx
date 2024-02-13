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
import { RadioGroup, RadioGroupItem } from '@/components/ui';
import { useState } from 'react';

export default function EmploymentInfo() {
  const router = useRouter();

  // state will be hanlded in a better way later
  const [hasInvesment, setHasInvesment] = useState('');

  const [showInvOptions, setShowInvOptions] = useState('');

  const getInvesment = (val: string) => {
    setHasInvesment(val);
  };

  const getInvOptions = (val: string) => {
    setShowInvOptions(val);
  };

  return (
    <Card className="w-full max-w-2xl ">
      <CardHeader>
        <CardTitle>
          Step 3: Experience and Current Investments
        </CardTitle>
        <CardDescription>
          Please fill in the fields below with your investment
          experience and current investments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="experience">
            Do you have previous experience with investing?
          </Label>
          <RadioGroup id="invesment" className="flex">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="invYes" />
              <Label htmlFor="invYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="invNo" />
              <Label htmlFor="invNo">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="otherInvestments">
            Do you hold any other type of investments?
          </Label>
          <RadioGroup
            onValueChange={(val) => {
              getInvesment(val);
            }}
            id="otherInvestments"
            className="flex"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="otherInvYes" />
              <Label htmlFor="otherInvYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="otherInvNo" />
              <Label htmlFor="otherInvNo">No</Label>
            </div>
          </RadioGroup>
        </div>
        {hasInvesment === 'no' && (
          <div className="space-y-2">
            <Label htmlFor="otherInvestments">
              have you held any investment in the past?
            </Label>
            <RadioGroup
              onValueChange={(val) => {
                getInvOptions(val);
              }}
              id="otherInvestments"
              className="flex"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="otherInvYes" />
                <Label htmlFor="otherInvYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="otherInvNo" />
                <Label htmlFor="otherInvNo">No</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {(showInvOptions === 'yes' || hasInvesment === 'yes') && (
          <div className="space-y-2">
            <Label htmlFor="invOptions">
              what kind of investments have you hold?
            </Label>
            <Select>
              <SelectTrigger id="invOptions">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="properties">Properties</SelectItem>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="crytpo">Crypto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
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
          onClick={() => {
            router.push('/signUp/investor/goals');
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
