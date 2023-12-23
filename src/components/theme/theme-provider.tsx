"use client";

import { useThemeStore } from "@/stores/theme";
import useStore from "@/stores/useStore";
import React from "react";

export default function ThemeProvider(props: { children: React.ReactNode }) {
  const dark = useStore(useThemeStore, (state) => state.dark);
  return (
    <div className={(dark ? "dark" : "") + " mc-root"}>{props.children}</div>
  );
}
