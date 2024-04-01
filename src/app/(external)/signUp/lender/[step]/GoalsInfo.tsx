import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Input,
  Button,
  Checkbox,
} from '@/components/ui/';
import { useState } from 'react';

export default function GoalsInfo() {
  const router = useRouter();

  const [showOther, setShowOther] = useState(false);

  return (
    <Card className="w-full max-w-2xl ">
      <CardHeader>
        <CardTitle>Step 4: Goals</CardTitle>
        <CardDescription>
          Please fill in the fields below with your goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="investmentGoals">
            What are your goals as a lender? (Select all that apply).
            Select all that apply. Use the 'Other' option to specify
            if none of the above apply
          </Label>
          <div className="grid gap-2">
            <div className="flex flex-row items-center gap-2">
              <Checkbox
                id="assisting"
                name="goals"
                value="assisting"
              />
              <div>Assisting someone in need</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Checkbox
                id="community"
                name="goals"
                value="community"
              />
              <div>
                Helping a community member or someone you know
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Checkbox id="income" name="goals" value="income" />
              <div>Possibility to earn passive income</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Checkbox
                onCheckedChange={(val: boolean) => {
                  setShowOther(val);
                }}
                id="other"
                name="goals"
                value="other"
              />
              <div>Other</div>
            </div>
            {showOther && (
              <Input
                type="text"
                placeholder="type your goal as a lender"
              />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-8">
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
            router.push('/signUp/lender/compliance');
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
