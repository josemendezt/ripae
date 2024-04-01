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
        <CardTitle>Step 3: Borrower Preferences</CardTitle>
        <CardDescription>
          Please fill in the fields below with your borrower
          preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="borrowerProfile">
            Depending on the the borrower profile the risk of your
            return might increase, but those could be the people who
            need more help. What kind of borrower profile would you
            accept?
          </Label>
          <Select>
            <SelectTrigger id="borrowerProfile">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="low">Low risk borrower</SelectItem>
              <SelectItem value="medium">
                Medium risk borrower
              </SelectItem>
              <SelectItem value="high">High risk borrower</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mode">
            You will propose loans through our platforms. Would you
            like to automatically set a loan agreement with any
            borrower who applies and meets your risk profile
            specifications or would you like to review the application
            first?
          </Label>
          <RadioGroup
            onValueChange={(val) => {
              getInvesment(val);
            }}
            id="mode"
            className="flex"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="auto" />
              <Label htmlFor="auto">Set Automatically</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="manual" />
              <Label htmlFor="manual">Review Applications</Label>
            </div>
          </RadioGroup>
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
          onClick={() => {
            router.push('/signUp/lender/goals');
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
