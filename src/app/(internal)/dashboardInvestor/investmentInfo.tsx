export default function InvestmentInfo() {
  return (
    <div className="flex gap-4 w-[95%] flex-wrap ">
      <div className="w-1/3 h-32 bg-secondary  rounded flex flex-col justify-center items-center">
        <div className="text-md">Total Invested</div>
        <div className="text-3xl font-bold">$2,000</div>
      </div>
      <div className="w-1/3 h-32 bg-secondary  rounded flex flex-col justify-center items-center">
        <div className="text-md">Projected Return</div>
        <div className="text-3xl font-bold text-green-500">$2000</div>
      </div>
      <div className="w-1/3 h-32 bg-secondary  rounded flex flex-col justify-center items-center flex-1">
        <div className="text-md">Blended Rate</div>
        <div className="text-3xl font-bold">10.1%</div>
      </div>
      <div className="w-1/3 h-32 bg-secondary  rounded flex flex-col justify-center items-center">
        <div className="text-md ">Projected Earnings</div>
        <div className="text-3xl font-bold text-green-500">$116</div>
      </div>
      <div className="w-1/3 h-32 bg-primary text-secondary  rounded flex flex-col justify-center items-center ">
        <div className="text-md">Active Notes</div>
        <div className="text-3xl font-bold">4</div>
      </div>
      <div className="w-1/3 h-32 bg-secondary  rounded flex flex-col justify-center items-center  flex-1">
        <div className="text-md">Total of Notes</div>
        <div className="text-3xl font-bold">8</div>
      </div>
    </div>
  );
}
