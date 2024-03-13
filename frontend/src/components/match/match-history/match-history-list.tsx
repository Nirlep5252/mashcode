import { useMatchHistory } from "@/queries/match";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MatchHistoryItem } from "@/components/match/match-history/match-history-item";

export const MatchHistoryList = () => {
  const { data: matches, isLoading, isError, error } = useMatchHistory();

  return (
    <>
      <Card className={"w-[380px] min-h-[400px]"}>
        <CardHeader>
          <CardTitle>Match History</CardTitle>
        </CardHeader>
        <CardContent
          className={"flex flex-col items-center justify-center w-full"}
        >
          {isLoading && "Loading matches..."}
          {isError && `Error while fetching matches: ${error?.message}`}
          {matches
            ? matches.map((match) => {
                return <MatchHistoryItem key={match.id} {...match} />;
              })
            : !isLoading && "No matches found."}
        </CardContent>
      </Card>
    </>
  );
};
