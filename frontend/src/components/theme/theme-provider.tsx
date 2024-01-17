import { useThemeStore } from "@/stores/theme";
import React from "react";

export default function ThemeProvider(props: { children: React.ReactNode }) {
  const { dark } = useThemeStore();
  return (
    <div className={(dark ? "dark" : "") + " mc-root"}>{props.children}</div>
  );
}
