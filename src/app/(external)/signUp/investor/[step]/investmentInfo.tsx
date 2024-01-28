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

export default function EmploymentInfo() {
  const router = useRouter();

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
          <Select>
            <SelectTrigger id="experience">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="otherInvestments">
            Do you hold any other type of investments?
          </Label>
          <RadioGroup id="otherInvestments" className="flex">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="r1" />
              <Label htmlFor="r1">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="r2" />
              <Label htmlFor="r2">No</Label>
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
            router.push('/signUp/investor/goals');
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
