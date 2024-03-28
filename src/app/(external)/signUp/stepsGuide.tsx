import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import React from 'react';

function StepsGuide({ steps }: { steps: string[] }) {
  const params = useParams<{ step: string }>();

  return (
    <div className="flex items-center justify-center mx-auto mb-12 mt-20 max-sm:hidden">
      {steps.map((stepVal, index) => (
        <>
          <div key={stepVal} className="flex items-center relative">
            <div className="flex items-center relative">
              <div
                className={cn(
                  'rounded-full h-12 w-12 flex items-center justify-center',
                  params.step === stepVal
                    ? 'bg-primary  text-white animate-fade-in'
                    : 'border-2  bg-white',
                  index < steps.indexOf(params.step)
                    ? ' border-primary'
                    : 'border-gray-300'
                )}
              >
                <div
                  className={cn(
                    'text-xl font-medium',
                    params.step === stepVal && 'font-bold text-2xl'
                  )}
                >
                  {index + 1}
                </div>
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase">
                {stepVal}
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'flex-auto border-t-2 transition duration-500 ease-in-out ',
                index < steps.indexOf(params.step)
                  ? 'border-primary'
                  : 'border-gray-300'
              )}
            />
          )}
        </>
      ))}
    </div>
  );
}

export default StepsGuide;
