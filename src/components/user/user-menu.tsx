"use client";

import Link from "next/link";
import React from "react";
import Button from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import { useUser } from "@/queries/auth";
import Image from "next/image";
import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function UserMenu() {
  const { data: user, isLoading, isError } = useUser();

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : isError || !user ? (
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
      ) : (
        <Dropdown>
          <Dropdown.Trigger>
            <Button iconOnly size="sm" radius="full" variant="ghost">
              <Image
                className="rounded-full"
                src={user.avatar_url}
                alt={user?.login}
                width={36}
                height={36}
              />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content className="flex w-36 flex-col px-2">
            <div className="flex flex-col">
              <Link href="/profile">
                <Button
                  size="sm"
                  className="w-full justify-start px-2"
                  variant="ghost"
                >
                  <UserIcon className="h-5 w-5" />
                  Profile
                </Button>
              </Link>
              <Link href="/logout">
                <Button
                  size="sm"
                  className="w-full justify-start px-2"
                  variant="ghost"
                >
                  <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                  Logout
                </Button>
              </Link>
            </div>
          </Dropdown.Content>
        </Dropdown>
      )}
    </>
  );
}
