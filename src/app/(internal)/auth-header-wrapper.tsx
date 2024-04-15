import React from 'react';
import AuthHeader from './auth-header';
import { createClient } from '@/lib/supabase/server';
import { getUserDataServer } from '../(external)/signUp/server-actions';

async function AuthHeaderWrapper() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const userData = await getUserDataServer(
    data.user?.email as string
  );

  return <AuthHeader user={userData} />;
}

export default AuthHeaderWrapper;
