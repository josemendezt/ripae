import { createClient } from '@/lib/supabase/client';
import { handleError } from '@/lib/utils';
import { Loan } from '@/types/loan/type';

export async function insertFunds(body: Partial<Loan>) {
  const supabase = createClient();

  const { data: insertData, error } = await supabase
    .from('loans')
    .insert({ ...body });

  if (error) {
    return handleError(
      insertData,
      error,
      'We could not create your loans, please try again'
    );
  }
  return true;
}
