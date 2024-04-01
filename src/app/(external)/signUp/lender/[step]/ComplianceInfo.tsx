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
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/';

export default function GoalsInfo() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-2xl ">
      <CardHeader>
        <CardTitle>Step 5: Compliance and Regulations</CardTitle>
        <CardDescription>
          Please fill in the fields below with your compliance and
          regulations details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="compliance">
            Are you a politically exposed person or subject to
            additional financial regulations?
          </Label>
          <RadioGroup id="compliance" className="flex">
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
      <CardFooter className="mt-32">
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
            router.push('/dashboardLender');
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
