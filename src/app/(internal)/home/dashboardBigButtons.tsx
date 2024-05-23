import { Button } from '@/components/ui';
import {
  ClipboardIcon,
  CreditCardIcon,
  DollarSignIcon,
} from 'lucide-react';
import React from 'react';

function DashboardBigButtons() {
  return (
    <section className="flex flex-col items-center pt-12 pb-0 mb-0 h-[400px] space-y-8 w-[30%]">
      {/* <Button
        variant="secondary"
        className="w-full h-24 flex items-center gap-2 text-xl "
      >
        <DollarSignIcon className="h-6 w-6" />
        Make a Loan Payment
      </Button> */}
      <Button
        variant="secondary"
        className="w-full h-[350px]  flex flex-col items-center gap-4 text-xl font-semibold max-md:text-sm"
      >
        <ClipboardIcon size={200} />
        Read Loan Agreement
      </Button>
      {/* <Button
        variant="secondary"
        className="w-full h-24  flex items-center gap-4 text-xl "
      >
        <CreditCardIcon className="h-6 w-6" />
        Payment Methods
      </Button> */}
    </section>
  );
}

export default DashboardBigButtons;
