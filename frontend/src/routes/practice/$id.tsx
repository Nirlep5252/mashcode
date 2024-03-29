import { createFileRoute, useParams } from "@tanstack/react-router";

import { Layout, Model, TabNode, IJsonModel } from "flexlayout-react";
import "flexlayout-react/style/dark.css";

import { ProblemStatement } from "@/components/problem/problem-statement";
import { CodeEditor } from "@/components/match/code-editor";
import { ExampleTestCase } from "@/components/problem/example-test-case";
import { useSubmission } from "@/mutations/pratice";

export const Route = createFileRoute("/practice/$id")({
  component: PracticePage,
});

const layout: IJsonModel = {
  global: { tabEnableClose: true, tabSetEnableMaximize: false },
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

const model = Model.fromJson(layout);

function PracticePage() {
  const { id } = useParams({
    strict: true,
    from: "/practice/$id",
  });

  const mutation = useSubmission();
  const handleSubmit = (code: string) => {
    mutation.mutate({
      problem_id: parseInt(id),
      language_id: 71,
      source_code: code,
    });
  };
  const handleRun = (code: string) => {
    mutation.mutate({
      problem_id: parseInt(id),
      language_id: 71,
      source_code: code,
    });
  };
  const factory = (node: TabNode) => {
    if (node.getComponent() === "text") {
      return <div>Text Component</div>;
    }
    if (node.getComponent() === "ProblemStatement") {
      return <ProblemStatement problemId={id} />;
    }
    if (node.getComponent() === "CodeEditor") {
      return (
        <CodeEditor
          onSubmit={(code) => {
            handleSubmit(code);
          }}
          onRun={(code) => {
            handleRun(code);
          }}
        />
      );
    }
    if (node.getComponent() === "TestCases") {
      return <ExampleTestCase problemId={id} />;
    }
    if (node.getComponent() === "Submissions") {
      return <div>Status</div>;
    }
  };
  return <Layout model={model} factory={factory} />;
}
