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

export default function EmploymentInfo() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-2xl ">
      <CardHeader>
        <CardTitle>Step 3: Employment and Living Situation</CardTitle>
        <CardDescription>
          Please fill in the fields below with your employment and living
          situation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input id="occupation" placeholder="Enter your occupation" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTime">
            How much time do you have in your current job? (in months)
          </Label>
          <Input
            id="jobTime"
            placeholder="Enter your time at your current job"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="livingSituation">Living Situation</Label>
          <Select>
            <SelectTrigger id="livingSituation">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="own">Own</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="mortgage">Mortgage</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="addressTime">
            How long have you lived at your current address?
          </Label>
          <Input
            id="addressTime"
            placeholder="Enter your time at your current address"
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
            router.push("/signUp/borrower/financial");
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
