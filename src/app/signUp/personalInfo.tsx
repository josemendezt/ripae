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
