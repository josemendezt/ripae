'use client';
import { createClient } from '@/lib/supabase/client';

export async function signInWithGoogle() {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/signUp/accountSetUp',
    },
  });
}

export async function signInWithEmailCli(email: string) {
  const supabase = createClient();
  const res = await supabase.auth.signInWithOtp({
    email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
      emailRedirectTo: 'http://localhost:3000/signUp/accountSetUp',
    },
  });
  console.log('logD5', res);
}
