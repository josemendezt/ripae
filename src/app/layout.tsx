import type { Metadata } from 'next';
import './globals.css';
import Header from '@/app/(external)/ext-header';
import { createClient } from '@/lib/supabase/server';
import ExtLayout from '@/app/(external)/layout';
import IntLayout from '@/app/(internal)/layout';

export const metadata: Metadata = {
  title: 'Ripae Sign Up',
  description: 'Generate your account in Ripae',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return data.user ? (
    <IntLayout>{children}</IntLayout>
  ) : (
    <ExtLayout>{children}</ExtLayout>
  );
}
