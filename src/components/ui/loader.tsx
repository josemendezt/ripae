import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '.';

export default function Loader({
  widthClass,
  rows = 6,
}: {
  widthClass?: string;
  rows?: number;
}) {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-6 mt-8 border p-8 rounded">
        {Array.from({ length: rows }, (_, index) => (
          <Skeleton
            key={index}
            className={`h-6 ${widthClass} bg-gray-300`}
          />
        ))}
      </div>
    </div>
  );
}
