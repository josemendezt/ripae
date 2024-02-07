/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dDLmkoqqcpA
 */
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

export default function LoanInfo() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Step 4: Loan Details</CardTitle>
        <CardDescription>
          Please fill in the fields below with your loan details.
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
              <SelectItem value="creditCard">Credit Card</SelectItem>
              <SelectItem value="debtConsolidation">
                Debt Consolidation
              </SelectItem>
              <SelectItem value="homeImprovement">
                Home Improvement
              </SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="majorPurchase">
                Major Purchase
              </SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="moving">Moving</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="smallBusiness">
                Small Business
              </SelectItem>
              <SelectItem value="vacation">Vacation</SelectItem>
              <SelectItem value="wedding">Wedding</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="term">Term (in days)</Label>
          <Select>
            <SelectTrigger id="term">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium-low">Medium-Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="medium-high">Medium-High</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
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
            router.push('/dashboardBorrower');
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
