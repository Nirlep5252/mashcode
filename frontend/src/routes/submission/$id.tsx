import { useSubmission, useVerdicts } from "@/queries/submission";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Verdict } from "@/types/submission";
import { verdictToString } from "@/lib/utils";
import Editor from "@monaco-editor/react";
import { monacoLanguageMap } from "@/lib/constants";
import { useTheme } from "@/hooks/use-theme";

export const Route = createFileRoute("/submission/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({
    strict: true,
    from: "/submission/$id",
  });

  const { data: submission, isLoading: isSubmissionLoading } = useSubmission({
    variables: { id },
  });

  const { data: verdicts, isLoading: isVerdictsLoading } = useVerdicts({
    variables: { submission_id: id },
  });

  const theme = useTheme();

  if (isSubmissionLoading || isVerdictsLoading) {
    return <Loader2Icon className="animate-spin" />;
  }

  if (!submission || !verdicts) {
    return <div>Submission not found</div>;
  }

  const overallVerdict = verdicts.every((v) => v.verdict === 3)
    ? "Accepted"
    : "Failed";
  const maxTime = Math.max(...verdicts.map((v) => v.execution_time));
  const maxMemory = Math.max(...verdicts.map((v) => v.memory_used));

  return (
    <div className="container mx-auto py-6 pt-20 space-y-6">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div
            className={`text-lg font-semibold ${overallVerdict === "Accepted" ? "text-green-500" : "text-red-500"}`}
          >
            {overallVerdict}
          </div>
          <div className="text-muted-foreground">Time: {maxTime}ms</div>
          <div className="text-muted-foreground">
            Memory: {(maxMemory / 1024).toFixed(2)}MB
          </div>
        </CardContent>
      </Card>

      {/* Source Code Card */}
      <Card>
        <CardHeader>
          <CardTitle>Source Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full rounded-md border">
            <Editor
              value={submission.source_code}
              language={
                monacoLanguageMap[submission.language_id] || "plaintext"
              }
              theme={theme === "dark" ? "vs-dark" : "vs-light"}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                lineNumbers: "on",
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Test Cases Card */}
      <Card>
        <CardHeader>
          <CardTitle>Test Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test #</TableHead>
                <TableHead>Verdict</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>Output</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {verdicts.map((verdict) => (
                <TableRow key={verdict.id}>
                  <TableCell>{verdict.test_case}</TableCell>
                  <TableCell>
                    <span
                      className={
                        verdict.verdict === Verdict.Accepted
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {verdictToString(verdict.verdict)}
                    </span>
                  </TableCell>
                  <TableCell>{verdict.execution_time}ms</TableCell>
                  <TableCell>
                    {(verdict.memory_used / 1024).toFixed(2)}MB
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {verdict.output.length > 30
                      ? verdict.output.slice(0, 30) + "..."
                      : verdict.output}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
