'use client';
import { Button } from '@/components/ui';
import useUserStore from '@/store/userStore';
import {
  ArrowRightLeft,
  BanknoteIcon,
  GraduationCap,
  InfoIcon,
  NotebookTabs,
  ViewIcon,
  WalletIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function SideBar() {
  const router = useRouter();
  const { getUserProfile, setUserProfile } = useUserStore();

  const profile = getUserProfile();

  return (
    <nav className="bg-secondary h-screen p-4 w-[300px]">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <a
            className="flex items-center px-4 py-2 mb-2 bg-primary text-white rounded-lg"
            href="#"
          >
            <ViewIcon className="text-white mr-2" />
            Overview
          </a>
          {profile === 'investor' && (
            <>
              <Link
                className="flex items-center px-4 py-2 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg"
                href="/myNotes"
              >
                <NotebookTabs className="text-gray-700 mr-2" />
                My Notes
              </Link>
              {/* <a
                className="flex items-center px-4 py-2 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg"
                href="#"
              >
                <Store className="text-gray-700 mr-2" />
                Secondary Market
              </a> */}
            </>
          )}

          <a
            className="flex items-center px-4 py-2 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg "
            href="#"
          >
            <InfoIcon className="text-gray-700 mr-2" />
            Personal Information
          </a>
          <a
            className="flex items-center px-4 py-2 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            href="#"
          >
            <BanknoteIcon className="text-gray-700 mr-2" />
            Bank Account
          </a>
          <a
            className="flex items-center px-4 py-2 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            href="#"
          >
            <WalletIcon className="text-gray-700 mr-2" />
            Transactions
          </a>
          <a
            className="flex items-center px-4 py-2 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            href="#"
          >
            <GraduationCap className="text-gray-700 mr-2" />
            Financial Literacy Center
          </a>
        </div>
      </div>

      <div className="mt-[100%] border-t-2">
        <div className="font-semibold text-lg">
          {profile === 'investor'
            ? 'Investor Profile'
            : 'Borrower Profile'}
        </div>
        <Button
          onClick={() => {
            if (profile === 'investor') {
              setUserProfile('borrower');
              router.push('/dashboardBorrower');
            } else {
              setUserProfile('investor');
              router.push('/dashboardInvestor');
            }
          }}
          className="w-full"
          variant="outline"
        >
          <ArrowRightLeft className="mr-2 h-4 w-4" /> Switch Profile
        </Button>
      </div>
    </nav>
  );
}

export default SideBar;
