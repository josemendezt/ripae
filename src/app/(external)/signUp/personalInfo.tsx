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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';

export default function PersonalInfo({ link }: { link: string }) {
  const router = useRouter();

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Step 1: Personal Information</CardTitle>
        <CardDescription>
          Please fill in the fields below with your information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="completeName">Complete Name</Label>
          <Input
            id="completeName"
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            placeholder="Enter your date of birth"
            type="date"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sin">Social Insurance Number (SIN)</Label>
          <Input
            id="sin"
            placeholder="Enter your SIN"
            type="number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="province">Province</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  id="province"
                  readOnly
                  value="Alberta"
                  disabled
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  We can only work in Alberta at the moment, we will
                  move to other provinces in the future
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex gap-4 pt-2">
            <div className="w-[70%]">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter your address" />
            </div>
            <div className="w-[30%]">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                placeholder="Enter your postal code"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            router.push(link);
          }}
          className="mx-auto w-full"
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
