import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  dark: boolean;
}

interface ThemeActions {
  setDark: (dark: boolean) => void;
  toggleDark: () => void;
}

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set, get) => ({
      dark: false,
      setDark: (dark: boolean) => set({ dark }),
      toggleDark: () => set({ dark: !get().dark }),
    }),
    {
      name: "theme",
      partialize: (state) => ({ dark: state.dark }),
    },
  ),
);
