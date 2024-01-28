import {
  CheckIcon,
  PanelTopCloseIcon,
  PauseIcon,
} from 'lucide-react';
import React from 'react';

function RecentTransactions() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full mt-4">
      <h2 className="text-lg font-semibold mb-4">
        Recent transactions
      </h2>
      <ul>
        <li className="flex justify-between items-center py-2 border-b">
          <div className="flex items-center space-x-3">
            <PauseIcon className="text-yellow-500" />
            <div>
              <p className="font-medium">Monthly repayment pending</p>
              <p className="text-sm text-gray-500">
                05 Nov 2021 at 3:06PM
              </p>
            </div>
          </div>
          <span>100$</span>
        </li>
        <li className="flex justify-between items-center py-2 border-b">
          <div className="flex items-center space-x-3">
            <CheckIcon className="text-green-500" />
            <div>
              <p className="font-medium">
                Successful monthly repayment
              </p>
              <p className="text-sm text-gray-500">
                05 Nov 2021 at 3:06PM
              </p>
            </div>
          </div>
          <span>100$</span>
        </li>
        <li className="flex justify-between items-center py-2 border-b">
          <div className="flex items-center space-x-3">
            <CheckIcon className="text-green-500" />
            <div>
              <p className="font-medium">
                Successful monthly repayment
              </p>
              <p className="text-sm text-gray-500">
                05 Nov 2021 at 3:06PM
              </p>
            </div>
          </div>
          <span>100$</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-3">
            <PanelTopCloseIcon className="text-red-500" />
            <div>
              <p className="font-medium">Monthly repayment failed</p>
              <p className="text-sm text-gray-500">
                05 Nov 2021 at 3:06PM
              </p>
            </div>
          </div>
          <span>100$</span>
        </li>
      </ul>
    </div>
  );
}

export default RecentTransactions;
