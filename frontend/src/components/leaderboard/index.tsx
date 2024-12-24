import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLeaderboard } from "@/queries/match";
import { LeaderboardUserItem } from "./user-item";
import { Loader2Icon } from "lucide-react";

export const Leaderboard: React.FC = () => {
  const { data: leaderboard, isLoading: isLeaderboardLoading } =
    useLeaderboard();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Leaderboard (Top 10)</CardTitle>
      </CardHeader>
      <CardContent>
        {isLeaderboardLoading ? (
          <div className="flex justify-center py-4">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : leaderboard ? (
          <div className="space-y-2">
            {leaderboard.map((user) => (
              <LeaderboardUserItem key={user.id} {...user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Error fetching leaderboard
          </div>
        )}
      </CardContent>
    </Card>
  );
};
