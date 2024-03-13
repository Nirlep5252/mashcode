import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLeaderboard } from "@/queries/match";
import { LeaderboardUserItem } from "./user-item";

export const Leaderboard: React.FC = () => {
  const { data: leaderboard, isLoading: isLeaderboardLoading } =
    useLeaderboard();

  return (
    <Card className={"w-[380px] min-h-[400px]"}>
      <CardHeader>
        <CardTitle>Leaderboard (Top 10)</CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col items-center justify-center"}>
        {isLeaderboardLoading ? (
          "Loading leaderboard..."
        ) : leaderboard ? (
          <>
            {leaderboard.map((user) => (
              <LeaderboardUserItem key={user.id} {...user} />
            ))}
          </>
        ) : (
          "Error fetching leaderboard"
        )}
      </CardContent>
    </Card>
  );
};
