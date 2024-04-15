import React from 'react';
import { createClient } from '@/lib/supabase/server';
import DashboardLender from './(internal)/dashboardLender/page';
import Login from './(external)/login/page';
import { redirect } from 'next/navigation';
import LayoutExt from './(external)/layout';
import LayoutInt from './(internal)/layout';
import { getSignUpFlow } from './(external)/signUp/utils';

async function page() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error && error.code && error.code !== 'bad_jwt') {
    redirect('/error');
  }

  if (data.user) {
    const { data: userData, error } = await supabase
      .from('users')
      .select('signup_flow')
      .eq('email', data.user.email);

    if (error) {
      redirect('/error');
    }

    if (userData?.length) {
      if (
        userData[0].signup_flow !== 'lenderDashboard' &&
        userData[0].signup_flow
       !== 'borrowerDashboard')
        redirect(getSignUpFlow(userData[0].signup_flow));
    }
  }

  return data.user ? (
    <LayoutInt>
      <DashboardLender />
    </LayoutInt>
  ) : (
    <LayoutExt>
      <Login />
    </LayoutExt>
  );
}

export default page;
