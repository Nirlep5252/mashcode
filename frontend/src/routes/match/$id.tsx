import { CodeEditor } from "@/components/code-editor/code-editor";
import { LiveMatchInformation } from "@/components/match/live-match-information";
import { ExampleTestCase } from "@/components/problem/example-test-case";
import { ProblemStatement } from "@/components/problem/problem-statement";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { API_WS_URL } from "@/lib/constants";
import { judge0Statuses, judge0SuccessStatusId } from "@/lib/judge0/statuses";
import { useMatch } from "@/queries/match";
import { useCurrentUser } from "@/queries/user";
import { useDynamicDashboardLayout } from "@/stores/dynamic-dashboard";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Layout, Model, TabNode } from "flexlayout-react";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { toast } from "sonner";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export const Route = createFileRoute("/match/$id")({
  component: Match,
});

function Match() {
  const { id } = useParams({
    strict: true,
    from: "/match/$id",
  });
  const { width, height } = useWindowSize();

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

  const [winner, setWinner] = useState<number>();

  const { sendJsonMessage, readyState } = useWebSocket(
    `${API_WS_URL}/match/${id}`,
    {
      onOpen: () => {
        sendJsonMessage({
          type: "auth",
          token: localStorage.getItem("ghToken"),
        });
      },
      onMessage: (event) => {
        const data:
          | {
              type: "submit_result";
              result: Record<
                string,
                {
                  compile_output: string | null;
                  memory: number;
                  message: string | null;
                  status: {
                    id: (typeof judge0Statuses)[number]["id"];
                    description: string;
                  };
                  stderr: string | null;
                  time: string;
                  token: string;
                }
              >;
            }
          | {
              type: "error";
              message: string;
            }
          | {
              type: "match_result";
              winner: number;
            } = JSON.parse(event.data);
        switch (data.type) {
          case "submit_result":
            console.log(data);
            if (data.result) {
              for (const testcase of Object.keys(data.result)) {
                if (data.result[testcase].status.id === judge0SuccessStatusId) {
                  toast.success(
                    `${data.result[testcase].status.description} on ${testcase}`,
                  );
                } else {
                  toast.error(
                    `${data.result[testcase].status.description} on ${testcase}`,
                  );
                }
              }
            }
            break;
          case "match_result":
            setWinner(data.winner);
            break;
          case "error":
            toast.error(data.message);
            break;
        }
      },
      filter: () => {
        return false;
      },
    },
  );
  const { matchLayout: model, setMatchLayout: setModel } =
    useDynamicDashboardLayout();
  const { data: currentUser } = useCurrentUser();

  if (isMatchLoading) {
    return <Loader2Icon className="aniamte-spin" />;
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
                type: "run",
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
      case "MatchInformation":
        return (
          <LiveMatchInformation
            websocketReadyState={readyState}
            match={match!}
          />
        );
      default:
        return <>Invalid Component</>;
    }
  }

  return (
    <div>
      <Dialog open={winner ? true : false}>
        <div className="z-50 absolute top-0 left-0">
          {winner && winner.toString() == currentUser?.id && (
            <Confetti width={width} height={height} />
          )}
        </div>
        <DialogContent>
          <DialogHeader>
            You {winner == currentUser?.id ? "Win" : "Lose"}!
          </DialogHeader>
          <DialogDescription>
            Go to <Link to="/dashboard">Dashboard</Link>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <Layout
        realtimeResize={true}
        model={Model.fromJson(model)}
        onModelChange={(model) => {
          setModel(model.toJson());
        }}
        factory={(node) => {
          return (
            <div className="w-full h-full bg-background text-foreground">
              {factory(node)}
            </div>
          );
        }}
      />
    </div>
  );
}
