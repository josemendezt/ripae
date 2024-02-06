export default function InvestmentInfo() {
  return (
    <div className="flex gap-4 w-[95%] flex-wrap ">
      <div className="w-1/3 h-32 bg-secondary  rounded flex flex-col justify-center items-center">
        <div className="text-md">Total Invested</div>
        <div className="text-3xl font-bold">$4,000</div>
      </div>
      <div className="w-1/3 h-32 bg-secondary  rounded flex flex-col justify-center items-center">
        <div className="text-md">Total Return</div>
        <div className="text-3xl font-bold text-green-500">
          $226.25
        </div>
      </div>
      <div className="w-1/3 h-32 bg-secondary  rounded flex flex-col justify-center items-center flex-1">
        <div className="text-md">Earned Interest</div>
        <div className="text-3xl font-bold">10.05%</div>
      </div>
      <div className="w-1/3 h-32 bg-secondary  rounded flex flex-col justify-center items-center">
        <div className="text-md ">Current Investment</div>
        <div className="text-3xl font-bold ">$1750</div>
      </div>
      <div className="w-1/3 h-32 bg-secondary  rounded flex flex-col justify-center items-center ">
        <div className="text-md">Projected Return</div>
        <div className="text-3xl font-bold text-green-500">
          197.50
        </div>
      </div>
      <div className="w-1/3 h-32 bg-secondary  rounded flex flex-col justify-center items-center  flex-1">
        <div className="text-md">Blended Rate</div>
        <div className="text-3xl font-bold">11.28%</div>
      </div>
    </div>
  );
}
