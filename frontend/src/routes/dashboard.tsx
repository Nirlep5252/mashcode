import { Button } from "@/components/ui/button.tsx";
import { useLeaderboard, useMatchHistory } from "@/queries/match.ts";
import { useUser } from "@/queries/auth.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { API_URL } from "@/lib/constants";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { data: matches, isLoading: isMatchHistoryLoading } = useMatchHistory();
  const { data: leaderboard, isLoading: isLeaderboardLoading } =
    useLeaderboard();

  const { data: user, isLoading: isUserLoading } = useUser();

  if (isUserLoading) {
    return "Loading...";
  }

  if (!user) {
    return (window.location.href = `${API_URL}/login?redirect=${window.location.href}`);
  }

  return (
    <div className={"w-full h-screen flex items-center justify-around"}>
      <div className="previous-matches w-1/3 flex items-center justify-center">
        <Card className={"w-[380px] min-h-[400px]"}>
          <CardHeader>
            <CardTitle>Match History</CardTitle>
          </CardHeader>
          <CardContent className={"flex items-center justify-center"}>
            {isMatchHistoryLoading
              ? "Loading matches..."
              : matches
                ? matches.length > 0
                  ? matches.map((match) => (
                      <div key={match.id}>
                        {match.id} - {match.created_at.toString()}
                      </div>
                    ))
                  : "No matches found"
                : "Error while fetching matches"}
          </CardContent>
        </Card>
      </div>
      <div className="play-btn w-1/3 flex items-center justify-center">
        <Link to={"/match/queue"}>
          <Button
            size={"lg"}
            className={
              "font-bold scale-150 text-lg flex items-center justify-center"
            }
          >
            Play
          </Button>
        </Link>
      </div>
      <div className="leaderboard w-1/3 flex items-center justify-center">
        <Card className={"w-[380px] min-h-[400px]"}>
          <CardHeader>
            <CardTitle>Leaderboard (Top 10)</CardTitle>
          </CardHeader>
          <CardContent className={"flex items-center justify-center"}>
            {isLeaderboardLoading ? (
              "Loading leaderboard..."
            ) : leaderboard ? (
              <>
                {leaderboard.map((user) => (
                  <Link key={user.id} className={"w-full"} to={`/profile`}>
                    <Button
                      className={"w-full flex items-center justify-between"}
                      variant={"ghost"}
                      key={user.id}
                    >
                      <div className={"flex justify-center items-center gap-3"}>
                        <Avatar className={"h-8 w-8"}>
                          <AvatarImage src={user.avatar_url} />
                          <AvatarFallback>
                            {user.login.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        {user.login}
                      </div>
                      <div className={"rating"}>{user.rating}</div>
                    </Button>
                  </Link>
                ))}
              </>
            ) : (
              "Error fetching leaderboard"
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
