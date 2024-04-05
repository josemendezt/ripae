"use client";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui";
import { UserIcon } from "lucide-react";
import React from "react";
import { signOut } from "../(external)/signUp/server-actions";

function LogoutButton({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex border p-2 rounded ">
        <UserIcon className="text-gray-600" />
        <span>{name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild>
        <form
          action={async (e) => {
            await signOut();
          }}
        >
          <DropdownMenuLabel className="cursor-pointer">
            <Button className="w-full" variant="outline" type="submit">
              Log Out
            </Button>
          </DropdownMenuLabel>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LogoutButton;
