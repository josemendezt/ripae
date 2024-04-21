import { format } from 'date-fns';
import { useGetLoansByStatus } from '@/apis/fund/client';
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
import { Card, CardContent, CardDescription } from '@/components/ui';

export function PurchasedInvesments() {
  const { userStore } = useUserStore();
  const { loanStatus } = useLoanStore();
  const loansByStatus = useGetLoansByStatus(
    userStore?.id as string,
    loanStatus as LoanStatus
  );

  if (loansByStatus.isLoading) return <Loader />;

  if (loansByStatus.error || !loansByStatus.data)
    return (
      <ErrorToast
        msg="There was a problem to get you loans list"
        toastClick={loansByStatus.refetch}
      />
    );

  return loansByStatus.data.length > 0 ? (
    <>
      <h2 className="text-xl mb-1 capitalize">
        {loanStatus} Loans ({loansByStatus.data.length})
      </h2>
      <Table className="border">
        <TableHeader className="bg-primary border ">
          <TableRow>
            <TableHead className="text-secondary ">Loan</TableHead>
            <TableHead className="text-secondary">Taken On</TableHead>
            <TableHead className="text-secondary">Amount</TableHead>
            <TableHead className="text-secondary">
              Monthly Rate
            </TableHead>
            <TableHead className="text-secondary">
              Loan Term
            </TableHead>
            <TableHead className="text-secondary">
              Projected Return
            </TableHead>
            <TableHead className="text-secondary ">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loansByStatus.data.map((fund, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {fund.loan?.reason || 'N/A'}
              </TableCell>
              <TableCell>
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
              <TableCell>{fund.loan?.term}</TableCell>
              <TableCell>
                {fund.loan?.interest_rate
                  ? (fund.loan?.interest_rate * fund.amount) / 100
                  : '5% - 11%'}
              </TableCell>
              <TableCell>{fund.loan?.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  ) : (
    <Card>
      <CardContent className="flex flex-col justify-center items-center">
        <Blocks className="h-80 w-80  text-primary" />
        <h2 className="text-2xl mb-1 capitalize ">
          You don't have {loanStatus} Loans yet...
        </h2>
        {loanStatus === LoanStatus.DRAFT ? (
          <CardDescription className="text-md">
            Press the button that says "create a loan proposal" to
            start creating drafts
          </CardDescription>
        ) : (
          <CardDescription className="text-md">
            We will notify you when this options is avaiable
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
