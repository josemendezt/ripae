import { PostgrestError } from '@supabase/supabase-js';
import { type ClassValue, clsx } from 'clsx';
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
