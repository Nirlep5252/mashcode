import { Loader2Icon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePracticeHistory, usePracticeQuestions } from "@/queries/practice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Verdict } from "@/types/submission";
import { verdictToString } from "@/lib/utils";

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
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Practice History</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <Loader2Icon className="animate-spin mx-auto" />}
        {isError && (
          <div className="text-red-500 text-center">
            Error loading practice history
          </div>
        )}
        <ScrollArea className="h-[500px] w-full rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[150px]">Date</TableHead>
                <TableHead>Problem</TableHead>
                <TableHead className="w-[100px] text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {practices?.map((submission) => (
                <TableRow
                  key={submission.submission_id}
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => {
                    navigate({
                      to: "/submission/$id",
                      params: { id: submission.submission_id.toString() },
                    });
                  }}
                >
                  <TableCell className="font-medium">
                    {submission.submission_id}
                  </TableCell>
                  <TableCell>
                    {
                      questions?.find(
                        (question) =>
                          Number(question.id) === submission.problem_id,
                      )?.title
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    {(submission.memory / 1024).toFixed(2)} MB
                  </TableCell>
                  <TableCell className="text-right">
                    {submission.time} ms
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        submission.verdict === Verdict.Accepted
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {verdictToString(submission.verdict)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
