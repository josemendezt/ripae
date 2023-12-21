'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function SignUp() {
  return (
    <section className="flex items-center justify-center h-[70vh]">
      <div className="mx-auto max-w-[380px] space-y-6 ">
        <div className="space-y-2 text-center">
          <h1 className="text-5xl font-bold mb-4">Account set up</h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl ">
            Please select the option that better describes you for the
            set up, you can get access to the other option later
          </p>
        </div>
        <div className="space-y-4">
          <div className="py-1">
            <Link href="/signUp/investor/personal">
              <Button className="w-full py-4 font-semibold">
                Investor
              </Button>
            </Link>
          </div>
          <div className="py-1">
            <Link href="/signUp/borrower/personal">
              <Button
                variant="secondary"
                className="w-full py-4 font-semibold"
              >
                Borrower
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
