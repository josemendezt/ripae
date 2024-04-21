import React from 'react';
import AuthHeader from './auth-header';
import { createClient } from '@/lib/supabase/server';
import { getUserDataServer } from '@/apis/user/server';
import { User } from '@/types/user/type';

async function AuthHeaderWrapper() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const userData = await getUserDataServer(
    data.user?.email as string
  );

  return <AuthHeader user={userData as User} />;
}

export default AuthHeaderWrapper;
