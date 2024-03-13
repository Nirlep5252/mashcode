import { createFileRoute } from "@tanstack/react-router";
import { Layout, Model, TabNode, IJsonModel } from "flexlayout-react";
import "flexlayout-react/style/dark.css";

import CodeMirror, { Extension } from "@uiw/react-codemirror";

import { usePracticeQuestion } from "@/queries/practice";

export const Route = createFileRoute("/practice/submit")({
  component: Submit,
});

var json: IJsonModel = {
  global: { tabEnableClose: false },
  borders: [],
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "tabset",
        weight: 100,
        selected: 0,
        children: [
          {
            type: "tab",
            name: "Problem Statement",
            component: "problemStatement",
          },
        ],
      },
      {
        type: "row",
        children: [
          {
            type: "tabset",
            weight: 50,
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Code",
                component: "codeEditor",
              },
            ],
          },
          {
            type: "tabset",
            weight: 50,
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Example Cases",
                component: "exampleCases",
              },
              {
                type: "tab",
                name: "Status",
                component: "status",
              },
            ],
          },
        ],
      },
    ],
  },
};

const model = Model.fromJson(json);

function Submit() {
    const { data: questionDetails, isLoading: isQuestionDetailsLoading } =
    usePracticeQuestion({
      variables: {
        id : "1",
      },
    });
  const factory = (node: TabNode) => {
    if (node.getComponent() === "text") {
      return <div>Text Component</div>;
    }
    if (node.getComponent() === "problemStatement") {
      return (
        <div>
          {isQuestionDetailsLoading
            ? "Loading question details..."
            : questionDetails
            ? questionDetails.problem_statement
            : "Error while fetching question details"}
        </div>
      );
    }
    if (node.getComponent() === "codeEditor"){
        return (
            <CodeMirror
            value={""}
            />
        )
    }
    if(node.getComponent() === "exampleCases"){
        return (
            <div>
                {
                    isQuestionDetailsLoading
                    ? "Loading example cases..."
                    : questionDetails
                    ? questionDetails.problem_examples
                    : "Error while fetching example cases"
                }
            </div>
        )
    }
    if(node.getComponent() === "status"){
        return (
            <div>Status</div>
        )
    }
  };
  return <Layout model={model} factory={factory} />;
}
