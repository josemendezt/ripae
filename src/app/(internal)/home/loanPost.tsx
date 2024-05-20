import { AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LoanPost() {
  return (
    <Card className="w-full p-6 border rounded-lg my-8">
      <div className="flex">
        <div className="flex flex-col items-start justify-between flex-grow space-y-4">
          <div className="flex justify-between space-x-4 w-full">
            <div className="flex items-center space-x-4 w-full">
              <Avatar className="bg-secondary">
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">Jose Mendez</h2>
                <p className="text-sm">Category: Car Repair</p>
              </div>
            </div>

            <div className="ml-auto">
              <p className="text-sm w-24">Loan Status</p>
              <p className="font-bold text-primary">Pending</p>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-sm">Payback on:</p>
              <p className="font-bold">May 20, 2024</p>
            </div>
            <div>
              <p className="text-sm">Amount:</p>
              <p className="font-bold">1000</p>
            </div>
            <div>
              <p className="text-sm">Offered Gratitude:</p>
              <p className="font-bold">100</p>
            </div>
            <div>
              <p className="text-sm">Expire on:</p>
              <p className="font-bold">May 20, 2024</p>
            </div>
          </div>
          <p className="text-left w-full">
            Hi guys, I got an issue with my car and I need for work,
            if I receive the loan I can fix it and pay you back in 2
            months + gratitude.
          </p>
          <div className="flex justify-between w-full">
            <Button variant="outline" className="w-40">
              See Jose Details
            </Button>
            <Button className="w-40">Contact</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
