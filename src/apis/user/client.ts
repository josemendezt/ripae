'use client';
import { createClient } from '@/lib/supabase/client';
import { User } from '../../types/user/type';

export async function signInUpWithEmail(
  form: FormData,
  shouldCreateUser: boolean
) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    email: form.get('email') as string,
    options: {
      // For sign Up it should be true, for signIn it should be false
      shouldCreateUser,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_API}`,
    },
  });

  if (error) {
    return {
      error: error as any,
    };
  }
  return {
    user: data.user,
  };
}

export async function updateUserData(
  userData: Partial<User>,
  email: string
) {
  const supabase = createClient();

  const { error } = await supabase
    .from('users')
    .update(userData)
    .eq('email', email);

  // validate there is no error
  return error === null;
}

export async function getUserDataClient(email: string) {
  const supabase = createClient();
  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (error || !userData.length) {
    return null;
  }
  return userData[0] as User;
}
