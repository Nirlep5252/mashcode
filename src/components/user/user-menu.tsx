"use client";

import Link from "next/link";
import React from "react";
import Button from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import { useUser } from "@/queries/auth";
import Image from "next/image";

export default function UserMenu() {
  const { data: user, isLoading, isError } = useUser();

  return (
    <>
      {isLoading || !user ? (
        <>Loading...</>
      ) : isError ? (
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
          <Dropdown.Content>
            <Dropdown.Item>test</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      )}
    </>
  );
}
