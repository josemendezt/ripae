import { CheckCircleIcon } from 'lucide-react';
import React from 'react';

function SuccessEmailSent() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <CheckCircleIcon className="text-green-500 w-12 h-12" />
      <div className="flex flex-col ">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl/tight text-center">
          Your auth link was sent!
        </h1>
        <p className="w-full text-gray-500 text-center mx-auto">
          Please check your email you should receive an email from us
          shortly. If you have any issue, please contact us at
          info@ripae.ca
        </p>
      </div>
    </div>
  );
}

export default SuccessEmailSent;
