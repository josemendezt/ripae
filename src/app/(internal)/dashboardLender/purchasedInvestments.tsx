import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invesment: "Unexpected Expenses",
    takenOn: "N/A",
    amount: "$500",
    annualRate: "9%",
    loanTerm: "45 Days",
    projectedReturn: "45$",
    status: "Pending",
  },
  {
    invesment: "Home Improvements/Repairs",
    takenOn: "05/01/2024",
    amount: "1000",
    annualRate: "10%",
    loanTerm: "90 Days",
    projectedReturn: "100$",
    status: "In Progress",
  },
];

export function PurchasedInvesments() {
  return (
    <>
      <Table className="border">
        <TableHeader className="bg-primary border ">
          <TableRow>
            <TableHead className="text-secondary ">Loan</TableHead>
            <TableHead className="text-secondary">Taken On</TableHead>
            <TableHead className="text-secondary">Amount</TableHead>
            <TableHead className="text-secondary">Monthly Rate</TableHead>
            <TableHead className="text-secondary">Loan Term</TableHead>
            <TableHead className="text-secondary">Projected Return</TableHead>
            <TableHead className="text-secondary ">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{invoice.invesment}</TableCell>
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
