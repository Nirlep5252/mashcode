import { Button } from "@/components/ui/button";
import { useAnyGithubUser, useCurrentUser } from "@/queries/user";
import { Link } from "@tanstack/react-router";

export const MatchHistoryItem: React.FC<Match> = (match) => {
  const { data: user } = useCurrentUser();

  const opponentId =
    match.player1_id.toString() === user?.id
      ? match.player2_id
      : match.player1_id;

  const { data: opponent, isLoading: opponentIsLoading } = useAnyGithubUser({
    variables: {
      id: opponentId.toString(),
    },
  });

  if (!user) {
    return "Loading...";
  }

  return (
    <>
      <Link
        to="/match/$id"
        params={{
          id: match.id.toString(),
        }}
      >
        <Button variant={"ghost"} size="lg"></Button>
      </Link>
    </>
  );
};
