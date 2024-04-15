import React from 'react';
import Step from './step';
import { getUserSession } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

async function page() {
  /* We have to validate some sign up components because next js does not have a way to overwrite
  the current layout, you can only have nested layouts and that doesn't work for our current case
  */
  const userSession = await getUserSession();
  if (!userSession) {
    redirect('/');
  }
  return <Step />;
}

export default page;
