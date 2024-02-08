import { Button } from "@/components/ui/button.tsx";
import { useMatchHistory } from "@/queries/match.ts";

export const component = function Dashboard() {
  const { data: matches, isLoading } = useMatchHistory();

  return (
    <div className={"h-screen"}>
      <div className="previous-matches">
        {isLoading ? "Loading matches..." : JSON.stringify(matches)}
      </div>
      <div className="play-btn">
        <Button>Play</Button>
      </div>
      <div className="leaderboard"></div>
    </div>
  );
};
