'use client';
import { BellIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from '../../components/ui';
import { useRouter } from 'next/navigation';

export default function AuthHeader() {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as any;

  const now = new Date().toLocaleString('en-US', options);
  const router = useRouter();

  const logout = () => {
    router.push('/login');
  };

  return (
    <header className="flex justify-between bg-secondary border w-full h-16 items-center px-4 md:px-6 pb-4">
      <Image
        alt="Ripae Logo"
        height="80"
        src="/logo.png"
        width="120"
        className="ml-16 mt-2"
      />
      <div className="flex items-center space-x-3 text-sm mt-4">
        <span>{now}</span>
        <BellIcon className="text-gray-600" />
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
      </div>
    </header>
  );
}
