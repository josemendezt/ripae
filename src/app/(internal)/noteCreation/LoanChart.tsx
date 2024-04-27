import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from 'recharts';

export default function LoanChart({
  amount,
  maxLoan,
}: {
  amount: number;
  maxLoan: number;
}) {
  const min = 5;
  const max = 8.75;
  const data = [min, 5.75, 6.75, 7.75, max].map((int) => ({
    interest: int,
    Return: amount * (int / 100),
  }));

  const tooltipFormatter = (value: number, name: string) => {
    if (name === 'Return') {
      return `$${value.toFixed(2)}`;
    }
  };

  return (
    <div>
      <div className="h-[400px] w-full mb-16">
        <h3 className="text-xl font-semibold mt-4">
          Earning Projections
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="interest"
              tickFormatter={(val) => `${val}%`}
            />
            <YAxis />
            <Tooltip
              formatter={tooltipFormatter}
              labelFormatter={() => <></>}
            />
            <Bar dataKey="Return" fill="#2C4C8A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
