'use client';
import { createClient } from '@/lib/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui';
import { UserIcon } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

function LogoutButton() {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      router.push('/error');
    }
    router.push('/');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex border p-2 rounded ">
        <UserIcon className="text-gray-600" />
        <span>Jose Mendez</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel
          className="cursor-pointer"
          onClick={logout}
        >
          Log Out
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LogoutButton;
