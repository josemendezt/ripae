import React from 'react';
import Step from './step';
import { getUserSession } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getUserDataServer } from '@/apis/user/server';
import { User } from '@/types/user/type';

async function page() {
  const userSession = await getUserSession();
  if (!userSession) {
    redirect('/');
  }

  const userData = await getUserDataServer(
    userSession.email as string
  );

  return <Step user={userData as User} />;
}

export default page;
