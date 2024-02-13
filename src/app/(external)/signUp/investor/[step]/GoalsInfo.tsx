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
} from '@/components/ui/';

export default function GoalsInfo() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-2xl ">
      <CardHeader>
        <CardTitle>Step 4: Goals and Risk Tolerance</CardTitle>
        <CardDescription>
          Please fill in the fields below with your goals and risk
          tolerance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="investmentGoals">
            What are your short-term and long-term investment goals?
          </Label>
          <Input
            id="investmentGoals"
            placeholder="Enter your goals"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="riskTolerance">
            How would you describe your risk tolerance?
          </Label>
          <Select>
            <SelectTrigger id="riskTolerance">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="low-medium">Low-Medium</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="medium-high">Medium-High</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="liquidity">
            How important is liquidity to you in your investments?
          </Label>
          <Input id="liquidity" placeholder="Enter your preference" />
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
            router.push('/signUp/investor/compliance');
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
