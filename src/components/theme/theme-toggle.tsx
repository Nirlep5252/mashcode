"use client";

import { useThemeStore } from "@/stores/theme";
import useStore from "@/stores/useStore";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function ThemeToggle() {
  const themeStore = useStore(useThemeStore, (state) => state);

  return (
    <>
      <div onClick={themeStore?.toggleDark}>
        {themeStore?.dark ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </div>
    </>
  );
}
