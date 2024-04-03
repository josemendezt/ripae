import ExtLayout from '@/app/(external)/ext-layout';
import IntLayout from '@/app/(internal)/int-layout';
import { createClient } from '@/lib/supabase/server';

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
