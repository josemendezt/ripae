import { format } from 'date-fns';
// import { useGetLoansByStatus } from '@/apis/lender/client';
import ErrorToast from '@/components/ui/ToastHandler';
import Loader from '@/components/ui/loader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLoanStore } from '@/stores/loanStore';
import { useUserStore } from '@/stores/userStore';
import { LoanStatus } from '@/types/loan/type';
import { Blocks, Frown } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
} from '@/components/ui';
import Link from 'next/link';
import { getStatutsColor } from '@/lib/utils';
import EmptyPlaceholder from '@/components/ui/EmptyPlaceholder';

export function PurchasedInvesments({ filter }: { filter?: string }) {
  const { userStore } = useUserStore();
  const { loanStatus } = useLoanStore();
  const minInterest = 0.05;
  const maxInterest = 0.11;
  // const loansByStatus = useGetLoansByStatus(
  //   userStore?.id as string,
  //   loanStatus as LoanStatus
  // );

  // if (loansByStatus.isLoading) return <Loader />;

  // if (loansByStatus.error || !loansByStatus.data)
  //   return (
  //     <ErrorToast
  //       msg="There was a problem to get you loans list"
  //       toastClick={loansByStatus.refetch}
  //     />
  //   );

  // This filter needs to be adjusted later
  // const loanList = filter
  //   ? loansByStatus.data.filter(
  //       (data) =>
  //         data.amount.toString() === filter ||
  //         (data.amount * minInterest).toString() === filter ||
  //         (data.amount * maxInterest).toString() === filter ||
  //         filter === (minInterest * 100).toString() ||
  //         filter === (maxInterest * 100).toString()
  //     )
  //   : loansByStatus.data;

  return (
    <>
      {/* <h2 className="text-xl mb-1 capitalize">
        {loanStatus} Loans ({loanList.length})
      </h2>
      <Table className="border">
        <TableHeader className="bg-primary border ">
          <TableRow>
            <TableHead className="text-secondary">
              Loan Reason
            </TableHead>
            <TableHead className="text-secondary max-sm:hidden">
              Taken On
            </TableHead>
            <TableHead className="text-secondary">Amount</TableHead>
            <TableHead className="text-secondary">
              Interest Rate
            </TableHead>
            <TableHead className="text-secondary max-sm:hidden">
              Loan Term
            </TableHead>
            <TableHead className="text-secondary max-sm:hidden">
              Projected Return
            </TableHead>
            <TableHead className="text-secondary ">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loanList.map((fund, index) => (
            <TableRow key={index} className="cursor-pointer">
              <TableCell className="font-medium">
                {fund.loan?.reason || 'N/A'}
              </TableCell>
              <TableCell className="max-sm:hidden">
                {fund.taken_on
                  ? format(fund.taken_on, 'yyyy-MM-dd')
                  : 'Not taken yet'}
              </TableCell>
              <TableCell>{fund.amount}</TableCell>
              <TableCell>
                {fund.loan?.interest_rate
                  ? `${fund.loan?.interest_rate}%`
                  : '5% - 11%'}
              </TableCell>
              <TableCell className="max-sm:hidden">
                {fund.loan?.term || '90 Days'}
              </TableCell>
              <TableCell className="max-sm:hidden">
                {fund.loan?.interest_rate
                  ? (fund.loan?.interest_rate * fund.amount) / 100
                  : `${fund.amount * minInterest} - ${
                      fund.amount * maxInterest
                    }`}
              </TableCell>
              <TableCell>
                <div
                  className={`capitalize ${getStatutsColor(
                    fund.loan?.status
                  )} text-center  rounded-full w-18 py-1`}
                >
                  {fund.loan?.status || loanStatus}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  ) : ( */}
      <EmptyPlaceholder
        message={`You don't have loans yet. We will start adding borrowers in the platform soon and you will be notified when one of them is requesting you a loan`}
      />
    </>
  );
}
