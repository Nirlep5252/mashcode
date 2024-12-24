import { useTheme as useThemeContext } from "@/components/theme/theme-provider";

export const useTheme = () => {
  const { theme } = useThemeContext();
  return theme === "system"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : theme;
};
