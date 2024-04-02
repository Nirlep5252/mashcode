import { createFileRoute, useParams } from "@tanstack/react-router";

import { Layout, Model, TabNode, IJsonModel } from "flexlayout-react";
import "flexlayout-react/style/dark.css";

import { ProblemStatement } from "@/components/problem/problem-statement";
import { CodeEditor } from "@/components/match/code-editor";
import { ExampleTestCase } from "@/components/problem/example-test-case";
import { useSubmission } from "@/mutations/pratice";
import { toast } from "sonner";

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
          codeId={`practice-${id}`}
          onSubmit={async (code, language_id) => {
            const data = await mutation.mutateAsync({
              problem_id: parseInt(id),
              language_id: language_id,
              source_code: code,
              run: false,
            });
            if (data) {
              let wronganswerFlag = false;
              for (const key in data) {
                if (data[key].description === "Wrong Answer") {
                  wronganswerFlag = true;
                  toast.error("Wrong on test case " + key);
                }
              }
              if (!wronganswerFlag) {
                toast.success("All test cases passed");
              }
            }
            return data;
          }}
          onRun={async (code, language_id) => {
            const data = await mutation.mutateAsync({
              problem_id: parseInt(id),
              language_id: language_id,
              source_code: code,
              run: true,
            });
            if (data.status) {
              if (data.status.description === "Wrong Answer") {
                toast.error(data.status.description);
              } else {
                toast.success(data.status.description);
              }
            } else toast.error(data.detail);
            return data;
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
