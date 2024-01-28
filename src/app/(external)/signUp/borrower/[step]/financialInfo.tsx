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

export default function FinancialInfo() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-2xl ">
      <CardHeader>
        <CardTitle>Step 2: Financial Information</CardTitle>
        <CardDescription>
          Please fill in the fields below with your financial
          information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="income">Annual Income</Label>
          <Input
            id="income"
            placeholder="Enter your annual income"
            type="number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="liabilities">Monthly Liabilities</Label>
          <Input
            id="liabilities"
            placeholder="Enter your monthly liabilities"
            type="number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employmentLength">
            Employment Length (in months)
          </Label>
          <Input
            id="employmentLength"
            placeholder="Enter your employment length in months"
            type="number"
          />
        </div>
      </CardContent>
      <CardFooter>
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
            router.push('/signUp/borrower/employment');
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
