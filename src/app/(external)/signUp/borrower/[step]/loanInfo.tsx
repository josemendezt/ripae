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
  const amounts = [
    250, 500, 750, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500,
    5000,
  ];

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
              <SelectItem value="30">30 Days</SelectItem>
              <SelectItem value="60">60 Days</SelectItem>
              <SelectItem value="90">90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="invest">
            How much would you like to borrow?
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Amount" />
            </SelectTrigger>
            <SelectContent>
              {amounts.map((amount) => (
                <SelectItem key={amount} value={amount.toString()}>
                  {amount}
                </SelectItem>
              ))}
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
            router.push('/notesList');
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
