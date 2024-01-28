'use client';

import { Button } from '@/components/ui';
import React from 'react';

function loanBreakdown() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-auto h-[350px] mt-12 w-7/12">
      <div className="flex justify-between items-top">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Current monthly payment
          </h2>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            $100
          </p>
        </div>
        <Button className="w-24">Pay</Button>
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Next payment date
          </h3>
          <p className="text-base text-gray-900">Mar 2024</p>
        </div>
        <div className="mt-3">
          <div className="w-full h-3 bg-gray-200 rounded-full">
            <div className="h-3 bg-green-500 rounded-full w-[66%]" />
          </div>
          <div className="flex justify-center mt-2">
            <p className="text-2xl font-bold text-gray-900">$2000</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">66% paid</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Outstanding payment
        </h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">$180</p>
      </div>
    </div>
  );
}

export default loanBreakdown;
