'use client';
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import React from 'react';

function MyLoans() {
  return (
    <div className="w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Loans</h1>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-primary font-semibold text-md">
                Loan ID
              </TableHead>
              <TableHead className="text-primary font-semibold text-md">
                Amount
              </TableHead>
              <TableHead className="text-primary font-semibold text-md">
                Interest Rate
              </TableHead>
              <TableHead className="text-primary font-semibold text-md">
                Status
              </TableHead>
              <TableHead className="text-primary font-semibold text-md">
                Taken On
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>LN001</TableCell>
              <TableCell>$5,000</TableCell>
              <TableCell>7.5%</TableCell>
              <TableCell>
                <Badge
                  className="w-24 flex justify-center"
                  variant="secondary"
                >
                  Paid
                </Badge>
              </TableCell>
              <TableCell>2023-04-15</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>LN002</TableCell>
              <TableCell>$10,000</TableCell>
              <TableCell>8.2%</TableCell>
              <TableCell>
                <Badge
                  className="w-24 flex justify-center"
                  variant="secondary"
                >
                  Active
                </Badge>
              </TableCell>
              <TableCell>2023-05-01</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>LN003</TableCell>
              <TableCell>$15,000</TableCell>
              <TableCell>6.9%</TableCell>
              <TableCell>
                <Badge
                  className="w-24 flex justify-center"
                  variant="secondary"
                >
                  Delayed
                </Badge>
              </TableCell>
              <TableCell>2023-03-20</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>LN004</TableCell>
              <TableCell>$8,000</TableCell>
              <TableCell>7.8%</TableCell>
              <TableCell>
                <Badge
                  className="w-24 flex justify-center"
                  variant="secondary"
                >
                  Write off
                </Badge>
              </TableCell>
              <TableCell>2023-02-28</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default MyLoans;
