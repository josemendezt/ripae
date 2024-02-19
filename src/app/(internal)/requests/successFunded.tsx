import { Button } from '@/components/ui';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function successFunded() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 py-6">
        <CheckCircleIcon className="text-green-500 w-12 h-12" />
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl/tight">
            You funded this request!
          </h1>
          <p className="max-w-[600px] text-gray-500">
            You have funded this loan request and it was processed as
            one of your notes. If you have any question, please
            contact us at info@ripae.ca
          </p>
        </div>
        <Button className="w-[80%] mt-4" asChild>
          <Link href="/myNotes">Go to my Notes</Link>
        </Button>
      </div>
    </div>
  );
}

export default successFunded;
