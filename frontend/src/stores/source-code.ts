import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSourceCodeStore = create<{
  sourceCodeMap: Record<string, string>;
  setSourceCode: (id: string, sourceCode: string) => void;
}>()(
  persist(
    (set) => ({
      sourceCodeMap: {},
      setSourceCode: (id: string, sourceCode: string) => {
        set((state) => {
          state.sourceCodeMap[id] = sourceCode;
          return state;
        });
      },
    }),
    {
      name: "source-code-store",
    },
  ),
);
