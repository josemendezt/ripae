'use client';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  BanknoteIcon,
  ClipboardList,
  WandSparkles,
  InfoIcon,
  NotebookTabs,
  ViewIcon,
  WalletIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

function SideBar() {
  const router = useRouter();
  // const { getUserProfile, setUserProfile } = useUserStore();

  //const profile = getUserProfile();

  const pathname = usePathname();

  const menu = [
    {
      id: 1,
      text: 'Overview',
      link: '/dashboardLender',
      // profile === 'investor'
      //   ? '/dashboardLender'
      //   : '/dashboardBorrower',
      visible: true,
      icon: <ViewIcon className="mr-2" />,
    },
    {
      id: 2,
      text: 'My loan proposals',
      link: '/myNotes',
      visible: true,
      icon: <NotebookTabs className=" mr-2" />,
    },
    {
      id: 4,
      text: 'Personal Information',
      link: '/personal',
      visible: true,
      icon: <InfoIcon className=" mr-2" />,
    },
    {
      id: 5,
      text: 'Bank Account',
      link: '/bank',
      visible: false,
      icon: <BanknoteIcon className=" mr-2" />,
    },
    {
      id: 7,
      text: 'Financial Insights',
      link: '/financial',
      visible: false,
      icon: <WandSparkles className=" mr-2" />,
    },
    {
      id: 6,
      text: 'Transactions',
      link: '/Transaction',
      visible: false,
      icon: <WalletIcon className=" mr-2" />,
    },
    {
      id: 3,
      text: 'Requests',
      link: '/requests',
      visible: false,
      icon: <ClipboardList className=" mr-2" />,
    },
  ];

  return (
    <nav className="bg-secondary h-screen p-4 w-[300px] max-md:w-24 max-md:p-0">
      <div className="flex flex-col items-center">
        <div className="w-full">
          {menu.map((element) =>
            element.visible ? (
              <Link
                key={element.id}
                className={cn(
                  'flex items-center px-4 py-2 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg max-md:flex-col max-md:text-xs text-center',
                  element.link === pathname &&
                    'bg-primary text-white hover:bg-primary transition duration-500 ease-in-out'
                )}
                href={element.link}
              >
                <div>{element.icon}</div>
                <div>{element.text}</div>
              </Link>
            ) : (
              <div
                key={element.id}
                className="opacity-25 flex items-center px-4 py-2 mb-2 text-gray-700 rounded-lg cursor-default max-md:flex-col  max-md:text-xs text-center"
              >
                {element.icon}
                {element.text}
              </div>
            )
          )}
        </div>
      </div>

      {/* <div className="mt-[100%] border-t-2">
        <div className="font-semibold text-lg">
          {profile === 'investor'
            ? 'Lender Profile'
            : 'Borrower Profile'}
        </div>
        <Button
          onClick={() => {
            if (profile === 'investor') {
              setUserProfile('borrower');
              router.push('/dashboardBorrower');
            } else {
              setUserProfile('investor');
              router.push('/dashboardLender');
            }
          }}
          className="w-full"
          variant="outline"
        >
          <ArrowRightLeft className="mr-2 h-4 w-4" /> Switch Profile
        </Button>
      </div> */}
    </nav>
  );
}

export default SideBar;
