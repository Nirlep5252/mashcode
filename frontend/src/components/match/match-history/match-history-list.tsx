import { useMatchHistory } from "@/queries/match";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MatchHistoryItem } from "@/components/match/match-history/match-history-item";
import { Loader2Icon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MatchHistoryList = () => {
  const { data: matches, isLoading, isError, error } = useMatchHistory();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Match History</CardTitle>
      </CardHeader>
      <CardContent
        className={"flex flex-col items-center justify-center w-full"}
      >
        {isLoading && <Loader2Icon className="animate-spin" />}
        {isError && `Error while fetching matches: ${error?.message}`}
        <ScrollArea className="w-[380px] h-[400px] pr-4">
          {matches
            ? matches.map((match) => {
                return <MatchHistoryItem key={match.id} {...match} />;
              })
            : !isLoading && !isError && "No matches found."}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
