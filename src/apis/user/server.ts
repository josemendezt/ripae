'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { User } from '../../types/user/type';
import { headers } from 'next/headers';

// export async function signup(formData: FormData) {
//   const supabase = createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//   };

//   const { error } = await supabase.auth.signInWithOtp({
//     email: formData.get('email') as string,
//   });

//   if (error) {
//     redirect('/error');
//   }

//   revalidatePath('/', 'layout');
//   redirect('/');
// }

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
    redirect('/error');
  }
  return data;
}
export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  redirect('/');
}

export async function getUserDataServer(email: string) {
  const supabase = createClient();
  const { data: userData, error } = await supabase
    .from('decrypted_users')
    .select('*')
    .eq('email', email);

  if (error || !userData.length) {
    return null;
  }
  return userData[0] as User;
}

export async function getInveriteAccountInfo() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INVERITE_API}/list`,
      {
        method: 'POST',
        headers: {
          // Authorization: process.env.INVERITE_MERCHANT_KEY,
          Auth: `${process.env.INVERITE_MERCHANT_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'sites',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('logR2', data);
  } catch (error) {
    console.error(
      'There was a problem with your fetch operation:',
      error
    );
  }
}
