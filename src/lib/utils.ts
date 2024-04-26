import { LoanStatus } from '@/types/loan/type';
import { PostgrestError } from '@supabase/supabase-js';
import { type ClassValue, clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleError(
  data: any[] | null,
  error: PostgrestError | null,
  msg: string
) {
  if (error || !data) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Error: ${error?.message}`);
    }
    throw new Error(msg);
  }
}

export const getStatutsColor = (status?: LoanStatus) => {
  switch (status) {
    case LoanStatus.ACTIVE:
      return 'bg-green-500';
    case LoanStatus.IN_REVIEW:
      return 'bg-yellow-500';
    case LoanStatus.PAID:
      return 'bg-primary';
    case LoanStatus.WRITE_OFF:
      return 'bg-red-500';
    default:
      return 'bg-secondary';
  }
};

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
