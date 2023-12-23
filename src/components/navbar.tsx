import Link from "next/link";
import React from "react";
import ThemeToggle from "./theme/theme-toggle";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between rounded-full p-3 px-6 backdrop-blur-lg">
      <div className="left flex items-center justify-center gap-6">
        <Link href="/">
          <div className="logo text-xl font-bold text-foreground">mashcode</div>
        </Link>
        <div className="links flex items-center justify-center gap-2 text-sm">
          <Link href="/practice">practice</Link>
        </div>
      </div>
      <div className="right flex items-center justify-center gap-4">
        <ThemeToggle />
        <div>login</div>
      </div>
    </div>
  );
}
