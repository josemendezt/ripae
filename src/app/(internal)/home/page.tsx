'use client';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import React from 'react';

function page() {
  return (
    <div className="w-full  m-4 h-full">
      <section className="w-full py-8 px-4 border rounded h-full">
        <div className="px-4 md:px-6 ">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter ">
              Loan Details
            </h2>
            <div className="flex gap-2">
              <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Loan Purpose: <strong>Car Repairs</strong>
              </p>
              <div className="flex items-center justify-between">
                <Button variant="outline">Cancel Application</Button>
              </div>
            </div>
            <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Your profile and loan application has been submitted and
              is currently being processed by:
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex items-center gap-4 rounded-md bg-secondary p-4 dark:bg-gray-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white p-2 dark:bg-gray-950">
                <img
                  src="/td.png"
                  width="40"
                  height="40"
                  alt="Bank Logo"
                  className="aspect-square object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium">TD Bank</h3>
                <p className="text-sm">Loan Application Submitted</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-md bg-secondary p-4 dark:bg-gray-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white p-2 dark:bg-gray-950">
                <img
                  src="/eq.webp"
                  width="40"
                  height="40"
                  alt="Bank Logo"
                  className="aspect-square object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium">EQ Bank</h3>
                <p className="text-sm">Loan Application Submitted</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-md bg-secondary p-4 dark:bg-gray-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white p-2 dark:bg-gray-950">
                <img
                  src="/quadfi.webp"
                  width="40"
                  height="40"
                  alt="Bank Logo"
                  className="aspect-square object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium">QuadFI</h3>
                <p className="text-sm">Loan Application Submitted</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-md bg-secondary p-4 dark:bg-gray-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white p-2 dark:bg-gray-950">
                <img
                  src="/logo_scotia.png"
                  width="40"
                  height="40"
                  alt="Bank Logo"
                  className="aspect-square object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium">Scotiabank</h3>
                <p className="text-sm">Loan Application Submitted</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-full mt-4">
        <div className="grid gap-2">
          <h2 className="text-3xl font-bold tracking-tighter ml-4">
            Financia Insights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardDescription>
                  Average Monthly Spending
                </CardDescription>
                <CardTitle>$3,908</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span>Essential</span>
                    <span>$2,452 (62.74%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Non-essential</span>
                    <span>$1,456 (37.26%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Income:</span>
                    <span>$4,800</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Spending to Income Ratio</span>
                    <span>81.42%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Debt Overview</CardDescription>
                <CardTitle>$13,700</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span>Credit Card Debt</span>
                    <span>$5,000 (APR: 19.99%).</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Student Loan Debt</span>
                    <span>$8,700 (APR: 5%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>
                      Debt to Income Ratio ( Rent Included )
                    </span>
                    <span>40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>NSF Fees</span>
                    <span>$0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Late Fees</span>
                    <span>$0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Remarks</CardDescription>
                <CardTitle>Key Activities and Habits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span>Stable income</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Moderate DTI</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>No NSF or Late fees</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>High spending patterns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Recommendations</CardDescription>
                <CardTitle>Optimize Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div>
                    <h4 className="font-semibold">
                      Reduce Dining Out
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Reduce dining out expenses by 20% to save an
                      additional $103.2 on average per month.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Limit Shopping</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Set a monthly butget.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      Manage Utilities
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Turn off lights when not at home and do not
                      leave water running.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      NSF and Late fees:
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Continue avoiding this type of fees by being on
                      top of your expenses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="border shadow-sm rounded-lg mt-4">
            <h2 className="px-6 py-4 font-bold text-lg">
              Major Monthly Expense Categories
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Rent</TableCell>
                  <TableCell>$1,570</TableCell>
                  <TableCell>Essential</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Groceries</TableCell>
                  <TableCell>$410</TableCell>
                  <TableCell>Essential</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dining Out</TableCell>
                  <TableCell>$516</TableCell>
                  <TableCell>Non-essential</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Utilities</TableCell>
                  <TableCell>$252</TableCell>
                  <TableCell>Essential</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Subscriptions</TableCell>
                  <TableCell>$100</TableCell>
                  <TableCell>Non-essential</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Shopping</TableCell>
                  <TableCell>$480</TableCell>
                  <TableCell>Non-essential</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
