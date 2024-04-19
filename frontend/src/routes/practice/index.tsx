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
      <div className="w - 1/3 flex flex-col items-center justify-center gap-10">
        <div className="questions-list w-full flex column">
          <Card className={"w-[380px] min-h-[400px]"}>
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
          </Card>
        </div>
        <Link
          to={"/practice/$id"}
          params={{
            id: Math.floor(Math.random() * 100).toString(),
          }}
        >
          <Button size={"lg"} className={"font-bold scale-150 text-lg"}>
            Practice
          </Button>
        </Link>
      </div>
    </div>
  );
}
