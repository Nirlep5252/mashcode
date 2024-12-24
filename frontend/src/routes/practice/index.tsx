import { usePracticeQuestions } from "@/queries/practice.ts";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/queries/user";
import AuthError from "@/components/auth-error";
import { Loader2Icon, ShuffleIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export const Route = createFileRoute("/practice/")({
  component: Practice,
});

function Practice() {
  const { data: questions, isLoading: isQuestionsLoading } =
    usePracticeQuestions();
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");

  if (!isUserLoading && !user) {
    return <AuthError />;
  }

  const filteredQuestions = questions?.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto py-6 px-4 mt-16">
      <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Practice Problems</h1>
            <p className="text-muted-foreground mt-2">
              Improve your skills with our curated problems
            </p>
          </div>
          <Link to={`/practice/${Math.floor(Math.random() * 100)}`}>
            <Button size="lg" className="gap-2">
              <ShuffleIcon className="h-5 w-5" />
              Random Problem
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              {/* Add filter buttons here if needed */}
            </div>
          </CardHeader>
          <CardContent>
            {isQuestionsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2Icon className="animate-spin h-8 w-8" />
              </div>
            ) : (
              <ScrollArea className="h-[600px] w-full rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">#</TableHead>
                      <TableHead>Title</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuestions?.map((question, index) => (
                      <TableRow
                        key={question.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() =>
                          (window.location.href = `/practice/${question.id}`)
                        }
                      >
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{question.title}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "hard":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}
