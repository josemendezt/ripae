'use client';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  ArrowRightLeft,
  BanknoteIcon,
  ClipboardList,
  GraduationCap,
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
      id: 3,
      text: 'Requests',
      link: '/requests',
      visible: true,
      icon: <ClipboardList className=" mr-2" />,
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
      visible: true,
      icon: <BanknoteIcon className=" mr-2" />,
    },
    {
      id: 6,
      text: 'Transactions',
      link: '/Transaction',
      visible: true,
      icon: <WalletIcon className=" mr-2" />,
    },
    {
      id: 7,
      text: 'Financial Insights And Literacy Center',
      link: '/financial',
      visible: true,
      icon: <GraduationCap className=" mr-2 w-12 h-12" />,
    },
  ];

  return (
    <nav className="bg-secondary h-screen p-4 w-[300px]">
      <div className="flex flex-col items-center">
        <div className="w-full">
          {menu.map(
            (element) =>
              element.visible && (
                <Link
                  key={element.id}
                  className={cn(
                    'flex items-center px-4 py-2 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg',
                    element.link === pathname &&
                      'bg-primary text-white hover:bg-primary transition duration-500 ease-in-out'
                  )}
                  href={element.link}
                >
                  {element.icon}
                  {element.text}
                </Link>
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
