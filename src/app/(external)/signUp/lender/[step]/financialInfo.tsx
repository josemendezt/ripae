import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function FinancialInfo() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-2xl ">
      <CardHeader>
        <CardTitle>Step 2: Financial and Employment Information</CardTitle>
        <CardDescription>
          Please fill in the fields below with your financial and employment
          information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="income">Payment Frequency</Label>
          <Input
            id="income"
            placeholder="Enter your annual income"
            type="number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="income">Amount per payment (after tax)</Label>
          <Input
            id="income"
            placeholder="Enter your annual income"
            type="number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="income">Monthly Obligations</Label>
          <Input
            id="income"
            placeholder="Enter your monthly obligations such as rent, debts, etc."
            type="number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input id="occupation" placeholder="Enter your occupation" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTime">
            How much time do you have in your current job?
          </Label>
          <Input
            id="jobTime"
            placeholder="Enter your time at your current job"
          />
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
            router.push("/signUp/lender/preferences");
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
