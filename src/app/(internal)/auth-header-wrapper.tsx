import React, { Suspense } from 'react';
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

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <AuthHeader user={userData as User} />
    </Suspense>
  );
}

export default AuthHeaderWrapper;
