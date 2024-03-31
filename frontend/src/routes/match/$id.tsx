import { CodeEditor } from "@/components/match/code-editor";
import { ExampleTestCase } from "@/components/problem/example-test-case";
import { ProblemStatement } from "@/components/problem/problem-statement";
import { API_WS_URL } from "@/lib/constants";
import { useMatch } from "@/queries/match";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { IJsonModel, Layout, Model, TabNode } from "flexlayout-react";
import useWebSocket from "react-use-websocket";
import { toast } from "sonner";

export const Route = createFileRoute("/match/$id")({
  component: Match,
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

function Match() {
  const { id } = useParams({
    strict: true,
    from: "/match/$id",
  });

  const {
    data: match,
    isLoading: isMatchLoading,
    isError: isMatchError,
    error: matchError,
  } = useMatch({
    variables: {
      id,
    },
  });

  const { sendJsonMessage } = useWebSocket(`${API_WS_URL}/match/${id}`, {
    onOpen: () => {
      sendJsonMessage({
        type: "auth",
        token: localStorage.getItem("ghToken"),
      });
    },
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "submit_result":
          if (data.result) toast.info(data.result.status.description);
          break;
        case "error":
          toast.error(data.message);
          break;
      }
    },
    filter: () => {
      return false;
    },
  });

  if (isMatchLoading) {
    return <>Loading...</>;
  }

  if (isMatchError) {
    return <>{matchError.message}</>;
  }

  function factory(node: TabNode) {
    switch (node.getComponent()) {
      case "ProblemStatement":
        return (
          <ProblemStatement problemId={match?.problem_id.toString() || ""} />
        );
      case "CodeEditor":
        return (
          <CodeEditor
            codeId={`match-${id}`}
            onSubmit={async (sourceCode: string, languageId: number) => {
              sendJsonMessage({
                type: "submit",
                source_code: sourceCode,
                language_id: languageId,
              });
            }}
            onRun={async (sourceCode: string, languageId: number) => {
              sendJsonMessage({
                type: "submit",
                source_code: sourceCode,
                language_id: languageId,
              });
            }}
          />
        );
      case "TestCases":
        return (
          <ExampleTestCase problemId={match?.problem_id.toString() || ""} />
        );
      default:
        return <>Invalid Component</>;
    }
  }

  return (
    <Layout
      realtimeResize={true}
      model={Model.fromJson(layout)}
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
