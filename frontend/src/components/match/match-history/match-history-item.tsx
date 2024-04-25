import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAnyGithubUser, useCurrentUser } from "@/queries/user";
import { Match, MatchStatus, MatchWinner } from "@/types/match";
import { Link } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";

export const MatchHistoryItem: React.FC<Match> = (match) => {
  const { data: currentUser } = useCurrentUser();
  const { data: player2, isLoading: isPlayer2Loading } = useAnyGithubUser({
    variables: {
      id: match.player2_id.toString(),
    },
  });
  const { data: player1, isLoading: isPlayer1Loading } = useAnyGithubUser({
    variables: {
      id: match.player1_id.toString(),
    },
  });

  if (isPlayer1Loading || isPlayer2Loading) {
    return <Loader2Icon className="animate-spin" />;
  }

  if (!player1 || !player2) {
    return "Error loading players";
  }

  const isWin =
    (match.winner == MatchWinner.Player1 &&
      match.player1_id.toString() == currentUser?.id.toString()) ||
    (match.winner == MatchWinner.Player2 &&
      match.player2_id.toString() == currentUser?.id.toString());

  return (
    <div className="w-full">
      <Link
        to="/match/$id"
        params={{
          id: match.id.toString(),
        }}
        className="w-full"
      >
        <Button className="w-full h-20 flex gap-10" variant={"ghost"} size="lg">
          <div
            className={`w-1/12 ${match.status === MatchStatus.Completed ? (isWin ? "text-green-500" : "text-red-500") : ""}`}
          >
            {match.status === MatchStatus.Pending
              ? "Ongoing..."
              : isWin
                ? `+${match.rating_delta}`
                : `-${match.rating_delta}`}
          </div>
          <div className="flex gap-2 justify-around items-center w-4/5">
            <div className="w-[90px] truncate">
              <div className="flex flex-col items-center justify-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={player1.avatar_url} />
                </Avatar>
              </div>
              {player1.name || player1.login}
            </div>
            vs
            <div className="w-[90px] truncate">
              <div className="flex flex-col items-center justify-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={player2.avatar_url} />
                </Avatar>
              </div>{" "}
              {player2.name || player2.login}
            </div>
          </div>
        </Button>
      </Link>
    </div>
  );
};
