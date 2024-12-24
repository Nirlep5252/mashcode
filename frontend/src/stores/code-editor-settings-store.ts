import { create } from "zustand";
import { persist } from "zustand/middleware";

type MonacoTheme = "light" | "dark" | "hc-black" | "hc-light";

interface CodeEditorSettingsStore {
  language: string;
  setLanguage: (language: string) => void;
  theme: MonacoTheme;
  setTheme: (theme: MonacoTheme) => void;
  vimMode: boolean;
  setVimMode: (enabled: boolean) => void;
}

export const useCodeEditorSettings = create<CodeEditorSettingsStore>()(
  persist(
    (set) => ({
      language: "71",
      setLanguage: (language) => set({ language }),
      theme: "dark",
      setTheme: (theme) => set({ theme }),
      vimMode: false,
      setVimMode: (enabled) => set({ vimMode: enabled }),
    }),
    {
      name: "code-editor-settings",
    }
  )
);
