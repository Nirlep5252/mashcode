import { usePracticeQuestions } from "@/queries/practice.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button.tsx";
import { useCurrentUser } from "@/queries/user";
import AuthError from "@/components/auth-error";
import { ShuffleIcon } from "lucide-react";

export const Route = createFileRoute("/practice/")({
  component: Practice,
});

function Practice() {
  const { data: questions, isLoading: isQuestionsLoading } =
    usePracticeQuestions();
  const { data: user, isLoading: isUserLoading } = useCurrentUser();

  if (!isUserLoading && !user) {
    return <AuthError />;
  }
  return (
    <div className={"w-full h-screen flex items-center justify-around"}>
      <div className="flex flex-col w-full items-center justify-center gap-10">
        <div className="font-bold text-5xl">Practice Problems</div>
        <div className="questions-list rounded-lg outline outline-muted p-6 flex flex-col overflow-y-scroll max-h-[60vh] w-full gap-4">
          {isQuestionsLoading ? (
            "Loading questions..."
          ) : questions ? (
            questions.map((question, index) => {
              return (
                <Link
                  to="/practice/$id"
                  params={{
                    id: question.id.toString(),
                  }}
                  key={question.id}
                >
                  <Button
                    className="w-full justify-between h-20 text-lg font-semibold"
                    variant={"ghost"}
                    size="lg"
                  >
                    <div className="flex gap-4">
                      <div>{index + 1}.</div>
                      <div>{question.title}</div>
                    </div>
                    <div>rating / solved ratio / tags</div>
                  </Button>
                </Link>
              );
            })
          ) : (
            <>ok...</>
          )}
          {/* <Card className={"w-[380px] min-h-[400px]"}>
            <CardHeader>
              <CardTitle>Unsolved Questions</CardTitle>
              <CardContent className="h-96 overflow-y-scroll">
                {isQuestionsLoading
                  ? "Loading questions..."
                  : questions
                    ? questions.length > 0
                      ? questions.map((question) => (
                          <div
                            key={question.id}
                            className={"flex items-center justify-between"}
                          >
                            <div>{question.title}</div>
                            <Link
                              to="/practice/$id"
                              params={{
                                id: question.id.toString(),
                              }}
                            >
                              <Button variant={"ghost"}>Solve</Button>
                            </Link>
                          </div>
                        ))
                      : "No questions found"
                    : "Error while fetching questions"}
              </CardContent>
            </CardHeader>
            <CardContent
              className={"flex items-center justify-center"}
            ></CardContent>
          </Card> */}
        </div>
        <Link
          to={"/practice/$id"}
          params={{
            id: Math.floor(Math.random() * 100).toString(),
          }}
        >
          <Button
            size={"lg"}
            className={"font-bold scale-150 text-lg flex gap-4"}
          >
            Random Question <ShuffleIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
