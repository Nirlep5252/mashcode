import { useMatchHistory } from "@/queries/match";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MatchHistoryItem } from "@/components/match/match-history/match-history-item";
import { Loader2Icon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";

export const MatchHistoryList = () => {
  const { data: matches, isLoading, isError, error } = useMatchHistory();

  const sortedMatches = matches?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Match History</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <Loader2Icon className="animate-spin mx-auto" />}
        {isError && (
          <div className="text-red-500 text-center">{`Error while fetching matches: ${error?.message}`}</div>
        )}
        <ScrollArea className="h-[500px] w-full rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[150px]">Date</TableHead>
                <TableHead>Players</TableHead>
                <TableHead className="w-[100px] text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMatches
                ? sortedMatches.map((match) => (
                    <MatchHistoryItem key={match.id} {...match} />
                  ))
                : !isLoading &&
                  !isError && (
                    <TableRow>
                      <td colSpan={3} className="text-center py-4">
                        No matches found.
                      </td>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
