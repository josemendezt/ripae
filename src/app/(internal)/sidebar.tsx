'use client';
import { cn } from '@/lib/utils';
import { Landmark, InfoIcon, Home, Handshake } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function SideBar() {
  const pathname = usePathname();

  const menu = [
    {
      id: 1,
      text: 'Home',
      link: '/home',
      // profile === 'investor'
      //   ? '/dashboardLender'
      //   : '/dashboardBorrower',
      visible: true,
      icon: <Home className="mr-2" />,
    },
    {
      id: 2,
      text: 'Loans',
      link: '/myLoans',
      visible: true,
      icon: <Handshake className=" mr-2" />,
    },
    // {
    //   id: 3,
    //   text: 'Chats',
    //   link: '/chats',
    //   visible: true,
    //   icon: <MessagesSquare className=" mr-2" />,
    // },
    {
      id: 4,
      text: 'Personal Info',
      link: '/personalInfo?tab=personal',
      visible: true,
      icon: <InfoIcon className=" mr-2" />,
    },
    {
      id: 5,
      text: 'ID and Bank',
      link: `/idBankVerification`,
      visible: true,
      icon: <Landmark className=" mr-2" />,
    },
    // {
    //   id: 7,
    //   text: 'Financial Insights',
    //   link: '/financial',
    //   visible: false,
    //   icon: <WandSparkles className=" mr-2" />,
    // },
    // {
    //   id: 6,
    //   text: 'Transactions',
    //   link: '/Transaction',
    //   visible: false,
    //   icon: <WalletIcon className=" mr-2" />,
    // },
    // {
    //   id: 3,
    //   text: 'Requests',
    //   link: '/requests',
    //   visible: false,
    //   icon: <ClipboardList className=" mr-2" />,
    // },
  ];

  return (
    <nav className="bg-secondary min-h-screen h-auto p-0 w-[80px] max-md:w-full max-md:min-h-0 max-md:h-auto max-md:fixed max-md:bottom-0 max-md:left-0 max-md:flex max-md:flex-row max-md:justify-around max-md:items-center">
      <div className="flex flex-col items-center max-md:flex-row max-md:w-full max-md:justify-around ">
        <div className="w-full max-md:flex max-md:flex-row max-md:justify-around ">
          {menu.map((element) =>
            element.visible ? (
              <Link
                key={element.id}
                className={cn(
                  'flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg flex-col max-md:w-[33%] text-xs text-center mb-0',
                  (element.link === pathname ||
                    element.link.includes(pathname)) &&
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
                className="opacity-25 flex items-center px-4 py-2 text-gray-700 rounded-lg cursor-default max-md:flex-col text-xs text-center mb-0"
              >
                {element.icon}
                {element.text}
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
