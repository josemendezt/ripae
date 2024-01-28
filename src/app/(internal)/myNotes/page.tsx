import React from 'react';
import { PurchasedInvesments } from '../dashboardInvestor/purchasedInvestments';

function MyNotes() {
  return (
    <div className="flex justify-center w-full">
      <div className="w-11/12 mt-8">
        <h1 className="text-3xl font-semibold ">My Notes</h1>
        <PurchasedInvesments />
      </div>
    </div>
  );
}

export default MyNotes;
