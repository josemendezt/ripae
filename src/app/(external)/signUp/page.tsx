import React from 'react';
import SignUp from './signUp';
import { validateSession } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

async function page() {
  const isValidSession = await validateSession();

  if (isValidSession) {
    redirect('/');
  }
  return <SignUp />;
}

export default page;
