import React from 'react';
import { createClient } from '@/lib/supabase/server';
import DashboardLender from './(internal)/dashboardLender/page';
import Login from './(external)/login/page';
import { redirect } from 'next/navigation';

async function page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data.user) {
    return <Login />;
  }

  if (error) {
    redirect('/error');
  }

  return data.user ? <DashboardLender /> : <Login />;
}

export default page;
