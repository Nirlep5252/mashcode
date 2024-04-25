import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/queries/user";
import { createFileRoute, Link } from "@tanstack/react-router";
import AuthError from "@/components/auth-error";
import { MatchHistoryList } from "@/components/match/match-history/match-history-list";
import { Leaderboard } from "@/components/leaderboard";
import { Loader2Icon } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();

  if (isUserLoading) {
    return <Loader2Icon className="aniamte-spin" />;
  }

  if (!user) {
    return <AuthError />;
  }

  return (
    <div className={"w-full h-screen flex items-center justify-around"}>
      <div className="previous-matches w-1/3 flex items-center justify-center">
        <MatchHistoryList />
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
        <Leaderboard />
      </div>
    </div>
  );
}
