import React from 'react';
import { createClient } from '@/lib/supabase/server';
import Login from './(external)/login/page';
import { redirect } from 'next/navigation';
import LayoutExt from './(external)/layout';
import { getSignUpFlow } from './(external)/signUp/utils';

async function page() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error && error.code && error.code !== 'bad_jwt') {
    await supabase.auth.signOut();
  }

  if (data.user) {
    const { data: userData, error } = await supabase
      .from('users')
      .select('signup_flow')
      .eq('email', data.user.email);

    if (error) {
      redirect('/error');
    }

    if (userData[0].signup_flow === 'home') {
      redirect('/home');
    }
    if (userData?.length) {
      if (userData[0].signup_flow !== 'home')
        redirect(getSignUpFlow(userData[0].signup_flow));
    }
  }

  return (
    <LayoutExt>
      <Login />
    </LayoutExt>
  );
}

export default page;
