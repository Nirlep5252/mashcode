import { create } from "zustand";

type MonacoTheme = "light" | "dark" | "hc-black" | "hc-light";

interface CodeEditorSettingsStore {
  language: string;
  setLanguage: (language: string) => void;
  theme: MonacoTheme;
  setTheme: (theme: MonacoTheme) => void;
}

export const useCodeEditorSettings = create<CodeEditorSettingsStore>((set) => ({
  language: "71",
  setLanguage: (language) => set({ language }),
  theme: "dark",
  setTheme: (theme) => set({ theme }),
}));
