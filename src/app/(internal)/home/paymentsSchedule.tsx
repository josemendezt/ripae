import {
  Banknote,
  CheckIcon,
  DollarSign,
  PanelTopCloseIcon,
  PauseIcon,
} from 'lucide-react';
import React from 'react';

function PaymentsSchedule() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full mt-4">
      <h2 className="text-lg font-semibold mb-4">
        Scheduled Payments
      </h2>
      <ul>
        <li className="flex justify-between items-center py-2 border-b">
          <div className="flex items-center space-x-3">
            <Banknote className="text-green-500" />
            <div>
              <p className="font-medium">Monthly payment</p>
              <p className="text-sm text-gray-500">05 Apr 2024</p>
            </div>
          </div>
          <span>475$</span>
        </li>
        <li className="flex justify-between items-center py-2 border-b">
          <div className="flex items-center space-x-3">
            <Banknote className="text-green-500" />
            <div>
              <p className="font-medium"> Monthly payment</p>
              <p className="text-sm text-gray-500">05 Mar 2024</p>
            </div>
          </div>
          <span>475$</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-3">
            <Banknote className="text-green-500" />
            <div>
              <p className="font-medium">Monthly payment </p>
              <p className="text-sm text-gray-500">05 Feb 2024</p>
            </div>
          </div>
          <span>475$</span>
        </li>
      </ul>
    </div>
  );
}

export default PaymentsSchedule;
