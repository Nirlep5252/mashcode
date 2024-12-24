import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAnyGithubUser, useCurrentUser } from "@/queries/user";
import { Match, MatchStatus, MatchWinner } from "@/types/match";
import { Link } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { format } from "date-fns";

export const MatchHistoryItem: React.FC<Match> = (match) => {
  const { data: currentUser } = useCurrentUser();
  const { data: player2, isLoading: isPlayer2Loading } = useAnyGithubUser({
    variables: { id: match.player2_id.toString() },
  });
  const { data: player1, isLoading: isPlayer1Loading } = useAnyGithubUser({
    variables: { id: match.player1_id.toString() },
  });

  if (isPlayer1Loading || isPlayer2Loading) {
    return (
      <TableRow>
        <TableCell colSpan={3} className="text-center">
          <Loader2Icon className="animate-spin mx-auto" />
        </TableCell>
      </TableRow>
    );
  }

  if (!player1 || !player2) {
    return (
      <TableRow>
        <TableCell colSpan={3} className="text-center text-red-500">
          Error loading players
        </TableCell>
      </TableRow>
    );
  }

  const isWin =
    (match.winner == MatchWinner.Player1 &&
      match.player1_id.toString() == currentUser?.id.toString()) ||
    (match.winner == MatchWinner.Player2 &&
      match.player2_id.toString() == currentUser?.id.toString());

  const formattedDate = format(
    new Date(match.created_at),
    "MMM d, yyyy 'at' h:mm a",
  );

  return (
    <TableRow className="hover:bg-muted/50 cursor-pointer transition-colors">
      <TableCell>
        <Link
          to="/match/$id"
          params={{ id: match.id.toString() }}
          className="block w-full"
        >
          {match.status === MatchStatus.Pending ? (
            <span className="text-yellow-500">Ongoing</span>
          ) : (
            <span className={isWin ? "text-green-500" : "text-red-500"}>
              {isWin ? "Won" : "Lost"}
            </span>
          )}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          to="/match/$id"
          params={{ id: match.id.toString() }}
          className="block w-full"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={player1.avatar_url} />
              </Avatar>
              <span className="font-medium">
                {player1.name || player1.login}
              </span>
            </div>
            <span className="text-muted-foreground">vs</span>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={player2.avatar_url} />
              </Avatar>
              <span className="font-medium">
                {player2.name || player2.login}
              </span>
            </div>
          </div>
        </Link>
      </TableCell>
      <TableCell>
        <Link
          to="/match/$id"
          params={{ id: match.id.toString() }}
          className="block w-full text-muted-foreground"
        >
          {formattedDate}
        </Link>
      </TableCell>
      <TableCell className="text-right">
        <Link
          to="/match/$id"
          params={{ id: match.id.toString() }}
          className="block w-full"
        >
          {match.status === MatchStatus.Completed && (
            <span className={isWin ? "text-green-500" : "text-red-500"}>
              {isWin ? `+${match.rating_delta}` : `-${match.rating_delta}`}
            </span>
          )}
        </Link>
      </TableCell>
    </TableRow>
  );
};
