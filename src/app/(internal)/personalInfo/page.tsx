'use client';
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Sidebar from '../sidebar';
import { Button } from '@/components/ui';

export default function PersonalInfo() {
  return (
    <div className="flex justify-between">
      <div className="w-full flex flex-wrap justify-around my-12  h-full">
        <Card className="w-4/5">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
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
              <Label htmlFor="sin">
                Social Insurance Number (SIN)
              </Label>
              <Input
                id="sin"
                placeholder="Enter your SIN"
                type="number"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-32">Save</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
