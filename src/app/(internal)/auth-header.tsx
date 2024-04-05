"use client";
import { BellIcon, NotebookText } from "lucide-react";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import { useState } from "react";
import LogoutButton from "./logout-button";

export default function AuthHeader() {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as any;

  const now = new Date().toLocaleString("en-US", options);
  const { getUserProfile } = useUserStore();
  const userProfile = getUserProfile();
  const [isNotified, setIsNotified] = useState(false);

  const getLinkHeader =
    userProfile === "borrower" ? "/dashboardBorrower" : "dashboardLender";

  return (
    <header className="flex justify-between bg-secondary border w-full h-16 items-center px-4 md:px-6 pb-4">
      <Link href={getLinkHeader}>
        <Image
          alt="Ripae Logo"
          height="80"
          src="/logo.png"
          width="120"
          className="ml-16 mt-2"
        />
      </Link>
      <div className="flex items-center space-x-3 text-sm mt-4">
        <span>{now}</span>

        {userProfile === "investor" ? (
          <Popover>
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
                <p className="text-lg font-semibold mb-4">Notifications</p>
                <p className="flex justify-between items-center text-sm text-card-foreground border-y p-4">
                  <p>
                    Hey <span className="font-semibold mr-2">Jose!</span>
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
          </Popover>
        ) : (
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
        )}
        <LogoutButton />
      </div>
    </header>
  );
}
