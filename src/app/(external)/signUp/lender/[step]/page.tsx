import React from 'react';
import Step from './step';
import { getUserSession } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getUserDataServer } from '@/apis/user/server';
import { User } from '@/types/user/type';
import { getInveriteAccountInfo } from '@/apis/inverite/server';

async function page() {
  const inveriteList = await getInveriteAccountInfo();
  const userSession = await getUserSession();
  if (!userSession) {
    redirect('/');
  }

  const userData = await getUserDataServer(
    userSession.email as string
  );

  return <Step user={userData as User} inveriteList={inveriteList} />;
}

export default page;
