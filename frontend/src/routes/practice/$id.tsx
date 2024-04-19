import { createFileRoute, useParams } from "@tanstack/react-router";

import { Layout, Model, TabNode } from "flexlayout-react";
import "flexlayout-react/style/dark.css";

import { ProblemStatement } from "@/components/problem/problem-statement";
import { CodeEditor } from "@/components/match/code-editor";
import { ExampleTestCase } from "@/components/problem/example-test-case";
import { useSubmission } from "@/mutations/pratice";
import { toast } from "sonner";
import { useDynamicDashboardLayout } from "@/stores/dynamic-dashboard";

export const Route = createFileRoute("/practice/$id")({
  component: PracticePage,
});

function PracticePage() {
  const { id } = useParams({
    strict: true,
    from: "/practice/$id",
  });

  const { layout, setLayout } = useDynamicDashboardLayout();

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
              console.log("Verdict Data", data);
              let wronganswerFlag = false;
              for (const key in data) {
                if (data[key].status.description === "Wrong Answer") {
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
  return (
    <Layout
      realtimeResize={true}
      model={Model.fromJson(layout)}
      onModelChange={(model) => setLayout(model.toJson())}
      factory={(node) => {
        return (
          <div className="w-full h-full bg-background text-foreground">
            {factory(node)}
          </div>
        );
      }}
    />
  );
}
