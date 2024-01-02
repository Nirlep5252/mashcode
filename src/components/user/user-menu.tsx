"use client";

import Link from "next/link";
import React from "react";
import Button from "@/components/ui/button";
import { useUser } from "@/queries/auth";

export default function UserMenu() {
  const { data: user, isLoading, isError } = useUser();

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : isError ? (
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
      ) : (
        // TODO: Add user dropdown
        <>{user.login}</>
      )}
    </>
  );
}
