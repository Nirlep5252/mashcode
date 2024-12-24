import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePracticeHistory, usePracticeQuestions } from "@/queries/practice";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const PracticeHistory = ({ user_id }: { user_id: string }) => {
  const {
    data: practices,
    isLoading,
    isError,
    error,
  } = usePracticeHistory({
    variables: { id: user_id },
  });

  const { data: questions, isLoading: isQuestionsLoading } =
    usePracticeQuestions();

  console.log(practices);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submission History</CardTitle>
      </CardHeader>
      <CardContent
        className={"flex flex-col items-center justify-center w-full"}
      >
        {isLoading ||
          (isQuestionsLoading && <Loader2Icon className="animate-spin" />)}
        {isError && `Error while fetching matches: ${error?.message}`}
        <ScrollArea className="w-full h-[400px] pr-4">
          {practices &&
            practices.map((problem) => (
              <div key={problem.problem_id}>
                <div>
                  <Link to="/" className="w-full">
                    <Button
                      className="w-full h-20 flex gap-10 w-full"
                      variant={"ghost"}
                      size="lg"
                    >
                      <div className="flex justify-between items-center h-full w-full gap-10">
                        <div className="flex gap-2">
                          <span className="text-lg">{problem.problem_id}.</span>
                          <span className="font-semibold text-lg">
                            {
                              questions?.find(
                                (question) =>
                                  Number(question.id) === problem.problem_id,
                              )?.title
                            }
                          </span>
                        </div>
                        <div className="flex gap-5 text-sm text-gray-500">
                          <span>{(problem.memory / 1024).toFixed(2)} MB</span>
                          <span>{problem.time} ms</span>
                          {problem.verdict === "Accepted" ? (
                            <span className="text-green-500">Accepted</span>
                          ) : (
                            <span className="text-red-500">
                              {problem.verdict}
                            </span>
                          )}
                        </div>
                      </div>
                    </Button>
                  </Link>
                </div>
                <div className="flex justify-between w-full"></div>
              </div>
            ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
