'use client';
import { BellIcon } from 'lucide-react';
import Image from 'next/image';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../../components/ui';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import LogoutButton from './logout-button';
import { useUserStore } from '@/stores/userStore';
import { User } from '@/types/user/type';
import { BankGuidData, IDGuidData } from '@/types/inverite/Type';
import { useInveriteStore } from '@/stores/inveriteStore';

export default function AuthHeader({
  user,
  idData,
  bankData,
}: {
  user: User;
  idData?: IDGuidData;
  bankData?: BankGuidData;
}) {
  const { setUserStore, userStore } = useUserStore();
  const name = user?.first_name || 'User';

  const getLinkHeader = 'home';

  const { idGuidData, setIdGuidData, bankGuidData, setBankGuidData } =
    useInveriteStore();

  useEffect(() => {
    if (userStore?.id !== user.id) {
      setUserStore(user);
    }
    if (!idGuidData && idData) {
      setIdGuidData(idData);
    }
    if (!bankGuidData && bankData) {
      setBankGuidData(bankData);
    }
  }, [
    idData,
    bankData,
    idGuidData,
    bankGuidData,
    setUserStore,
    user,
    userStore?.id,
  ]);

  return (
    <header className="flex justify-between bg-secondary border w-full h-16 items-center px-4 md:px-6 pb-4">
      <div className="text-center w-full">
        <Link href={getLinkHeader}>
          <Image
            alt="Ripae Logo"
            height="50"
            src="/RIVENFI_blue.svg"
            width="100"
            className="ml-16 mt-2"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-3 text-sm mt-4">
        {/* <Popover>
          <PopoverTrigger onClick={() => setIsNotified(true)}>
            <div className="flex">
              <BellIcon className="text-gray-600" />
              {!isNotified && (
                <div className="-ml-2 w-2 h-2 rounded-full bg-red-500" />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[450px] mr-2">
            <div>
              <p className="text-lg font-semibold mb-4">
                Notifications
              </p>
              <p className="flex justify-between items-center text-sm text-card-foreground border-y p-4">
                <p>
                  Hey{' '}
                  <span className="font-semibold mr-2">{name}</span>
                  <Link
                    className="underline underline-offset-4"
                    href="/myNotes"
                  >
                    your loan is pending of approval
                  </Link>
                </p>
                <div className="bg-secondary rounded-full p-3">
                  <NotebookText />
                </div>
              </p>
            </div>
          </PopoverContent>
        </Popover> */}

        <Popover>
          <PopoverTrigger>
            <div className="flex">
              <BellIcon className="text-gray-600" />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-lg text-semibold">Notifications</p>
            There are no notifications yet.
          </PopoverContent>
        </Popover>

        <LogoutButton name={name} />
      </div>
    </header>
  );
}
