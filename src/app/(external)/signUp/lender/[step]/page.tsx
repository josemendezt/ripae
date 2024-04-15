import React from 'react';
import Step from './step';
import { getUserSession } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getUserDataServer } from '../../server-actions';

async function page() {
  const userSession = await getUserSession();
  if (!userSession) {
    redirect('/');
  }

  const userData = await getUserDataServer(
    userSession.email as string
  );

  return <Step user={userData} />;
}

export default page;
