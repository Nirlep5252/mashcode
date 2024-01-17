"use client";

import Navbar from "@/components/navbar";
import { useUser } from "@/queries/auth";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: user, isLoading, isError } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/login";
    }
  }, [user, isLoading]);

  return (
    <div className="mx-auto min-h-screen w-[70%] pt-4">
      <div className="mx-auto">
        <Navbar />
      </div>
    </div>
  );
}
