import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePracticeHistory } from "@/queries/practice";

export const PracticeHistory = ({ user_id }: { user_id: string }) => {
  const {
    data: practices,
    isLoading,
    isError,
    error,
  } = usePracticeHistory({
    variables: { id: user_id },
  });

  console.log(practices);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submission History</CardTitle>
      </CardHeader>
      <CardContent
        className={"flex flex-col items-center justify-center w-full"}
      >
        {isLoading && <Loader2Icon className="animate-spin" />}
        {isError && `Error while fetching matches: ${error?.message}`}
        <ScrollArea className="w-[380px] h-[400px] pr-4">
          {/* {practices
            ? matches.map((match) => {
                return <MatchHistoryItem key={match.id} {...match} />;
              })
            : !isLoading && !isError && "No matches found."} */}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
