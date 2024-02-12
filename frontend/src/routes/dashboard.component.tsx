import { Button } from "@/components/ui/button.tsx";
import { useLeaderboard, useMatchHistory } from "@/queries/match.ts";

export const component = function Dashboard() {
  const { data: matches, isLoading: isMatchHistoryLoading } = useMatchHistory();
  const { data: leaderboard, isLoading: isLeaderboardLoading } =
    useLeaderboard();

  return (
    <div className={"w-full h-screen flex items-center justify-around"}>
      <div className="previous-matches w-1/3 flex items-center justify-center">
        {isMatchHistoryLoading ? "Loading matches..." : JSON.stringify(matches)}
      </div>
      <div className="play-btn w-1/3 flex items-center justify-center">
        <Button
          size={"lg"}
          className={
            "font-bold scale-150 text-lg flex items-center justify-center"
          }
        >
          Play
        </Button>
      </div>
      <div className="leaderboard w-1/3 flex items-center justify-center">
        {isLeaderboardLoading
          ? "Loading leaderboard..."
          : JSON.stringify(leaderboard)}
      </div>
    </div>
  );
};
