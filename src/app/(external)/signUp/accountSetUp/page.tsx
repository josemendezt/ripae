import { validateSession } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AccountSetUp from './accountSetUp';

export default async function Page() {
  /* We have to validate some sign up components because next js does not have away to over write
  the current layout, you can only have nested layouts and that doesn't work for our current case
  */
  const isValidSession = await validateSession();
  if (!isValidSession) {
    redirect('/');
  }

  return <AccountSetUp />;
}
