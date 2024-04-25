import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  theme: string;
  language: string;
}

interface Actions {
  setTheme: (theme: string) => void;
  setLanguage: (language: string) => void;
}

export const useCodeEditorSettings = create<State & Actions>()(
  persist(
    (set) => {
      return {
        theme: "tokyoNight",
        language: "71",
        setTheme: (theme) => set({ theme }),
        setLanguage: (language) => set({ language }),
      };
    },
    {
      name: "code-editor-settings",
    }
  )
);
