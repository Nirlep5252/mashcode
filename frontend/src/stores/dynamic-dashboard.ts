import { IJsonModel } from "flexlayout-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  layout: IJsonModel;
}

interface Actions {
  setLayout: (layout: IJsonModel) => void;
}

const defaultLayoutJson: IJsonModel = {
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

export const useDynamicDashboardLayout = create<State & Actions>()(
  persist(
    (set) => {
      return {
        layout: defaultLayoutJson,
        setLayout: (layout) => set({ layout }),
      };
    },
    {
      name: "dynamic-dashboard-layout",
    }
  )
);
