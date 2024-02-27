import { usePracticeQuestions } from "@/queries/practice.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button.tsx";

export const Route = createFileRoute("/practice/")({
  component: Practice,
});

function Practice() {
  const { data: questions, isLoading: isQuestionsLoading } =
    usePracticeQuestions();
  return (
    <div className={"w-full h-screen flex items-center justify-around"}>
      <div className="w - 1/3 flex flex-col items-center justify-center gap-10">
        <div className="previous-matches w-full flex column">
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
        <Button size={"lg"} className={"font-bold scale-150 text-lg"}>
          Practice
        </Button>
      </div>
    </div>
  );
}