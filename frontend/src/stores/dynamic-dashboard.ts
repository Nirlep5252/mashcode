import { IJsonModel } from "flexlayout-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  practiceLayout: IJsonModel;
  matchLayout: IJsonModel;
}

interface Actions {
  setPracticeLayout: (layout: IJsonModel) => void;
  resetPracticeLayout: () => void;

  setMatchLayout: (layout: IJsonModel) => void;
  resetMatchLayout: () => void;
}

const defaultPracticeLayoutJson: IJsonModel = {
  global: {
    tabEnableClose: false,
    tabSetEnableMaximize: false,
    tabEnableRename: false,
  },
  borders: [],
  layout: {
    type: "row",
    children: [
      {
        type: "row",
        weight: 50,
        children: [
          {
            type: "tabset",
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Problem Statement",
                component: "ProblemStatement",
              },
            ],
          },
        ],
      },
      {
        type: "row",
        weight: 50,
        children: [
          {
            type: "tabset",
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Code Editor",
                component: "CodeEditor",
              },
            ],
          },
          {
            type: "tabset",
            weight: 40,
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Test Cases",
                component: "TestCases",
              },
              {
                type: "tab",
                name: "Submissions",
                component: "Submissions",
              },
            ],
          },
        ],
      },
    ],
  },
};

const defaultMatchLayoutJson: IJsonModel = {
  global: {
    tabEnableClose: false,
    tabSetEnableMaximize: false,
    tabEnableRename: false,
  },
  borders: [],
  layout: {
    type: "row",
    children: [
      {
        type: "row",
        weight: 50,
        children: [
          {
            type: "tabset",
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Problem Statement",
                component: "ProblemStatement",
              },
            ],
          },
          {
            type: "tabset",
            weight: 40,
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Match Information",
                component: "MatchInformation",
              },
            ],
          },
        ],
      },
      {
        type: "row",
        weight: 50,
        children: [
          {
            type: "tabset",
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Code Editor",
                component: "CodeEditor",
              },
            ],
          },
          {
            type: "tabset",
            weight: 40,
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Test Cases",
                component: "TestCases",
              },
              {
                type: "tab",
                name: "Submissions",
                component: "Submissions",
              },
            ],
          },
        ],
      },
    ],
  },
};

export const useDynamicDashboardLayout = create<State & Actions>()(
  persist(
    (set) => {
      return {
        practiceLayout: defaultPracticeLayoutJson,
        setPracticeLayout: (layout) => set({ practiceLayout: layout }),
        resetPracticeLayout: () =>
          set({ practiceLayout: defaultPracticeLayoutJson }),

        matchLayout: defaultMatchLayoutJson,
        setMatchLayout: (layout) => set({ matchLayout: layout }),
        resetMatchLayout: () => set({ matchLayout: defaultMatchLayoutJson }),
      };
    },
    {
      name: "dynamic-dashboard-layout",
      version: 2,
    }
  )
);
