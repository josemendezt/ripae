import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const invoices = [
  {
    invesment: 'Unexpected Expense',
    takenOn: 'N/A',
    amount: '$250.00',
    annualRate: '10.0%',
    loanTerm: '2 month',
    projectedReturn: '50$',
    status: 'Pending',
  },
  {
    invesment: 'Medical Expense',
    takenOn: 'N/A',
    amount: '1000.00',
    annualRate: '10.0%',
    loanTerm: '1 month',
    projectedReturn: '400$',
    status: 'Pending',
  },
  {
    invesment: 'Home Renovation',
    takenOn: '2024/01/05',
    amount: '$3000.00',
    annualRate: '10.0%',
    loanTerm: '2 months',
    projectedReturn: '500$',
    status: 'In progress',
  },
  {
    invesment: 'Car Loan',
    takenOn: '2023/12/21',
    amount: '2000.00',
    annualRate: '10.0%',
    loanTerm: '3 months',
    projectedReturn: '400$',
    status: 'In progress',
  },
];

export function PurchasedInvesments() {
  return (
    <>
      <Table className="border">
        <TableHeader className="bg-primary border ">
          <TableRow>
            <TableHead className="text-secondary ">
              Investment
            </TableHead>
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
          {invoices.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {invoice.invesment}
              </TableCell>
              <TableCell>{invoice.takenOn}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>{invoice.annualRate}</TableCell>
              <TableCell>{invoice.loanTerm}</TableCell>
              <TableCell>{invoice.projectedReturn}</TableCell>
              <TableCell>{invoice.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
