import React from 'react';
import SignUp from './signUp';
import { getUserSession } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

async function page() {
  const userSession = await getUserSession();

  if (userSession) {
    redirect('/');
  }
  return <SignUp />;
}

export default page;
