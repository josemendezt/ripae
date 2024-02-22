import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import RequestInfo from './requestInfo';

const requests = [
  {
    purpose: 'Unxpected Expenses',
    value: 2000,
    interest: '7%',
    subbmittedOn: '2024/02/12',
    period: '30 Days',
    projectedReturn: '2140',
    id: 1,
  },
  // {
  //   purpose: 'Medical Bill',
  //   value: 2000,
  //   interest: '15%',
  //   subbmittedOn: '2024/02/15',
  //   period: '90 Days',
  //   projectedReturn: '2300',
  //   id: 3,
  // },
];

export default function Requests() {
  return (
    <section className="w-full m-8">
      <h1 className="text-3xl font-semibold mb-4">Requests</h1>
      <Table className="border w-[90%]">
        <TableHeader className="bg-primary border ">
          <TableRow>
            <TableHead className="text-secondary ">Purpose</TableHead>
            <TableHead className="text-secondary">
              Submitted On
            </TableHead>
            <TableHead className="text-secondary">Amount</TableHead>
            <TableHead className="text-secondary">
              Interest Rate
            </TableHead>
            <TableHead className="text-secondary">
              Loan Term
            </TableHead>
            <TableHead className="text-secondary">
              Projected Return
            </TableHead>
            <TableHead className="text-secondary ">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {request.purpose}
              </TableCell>
              <TableCell>{request.subbmittedOn}</TableCell>
              <TableCell>{request.value}</TableCell>
              <TableCell>{request.interest}</TableCell>
              <TableCell>{request.period}</TableCell>
              <TableCell>{request.projectedReturn}</TableCell>
              <TableCell>
                <RequestInfo />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
