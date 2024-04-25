import { useAnyGithubUser, useCurrentUser } from "@/queries/user";
import { Match } from "@/types/match";
import { Loader2Icon } from "lucide-react";
import { ReadyState } from "react-use-websocket";
import { Button } from "../ui/button";

interface Props {
  websocketReadyState: ReadyState;
  match: Match;
}

const wsConnectionMessages = {
  [ReadyState.CONNECTING]: "Connecting...",
  [ReadyState.OPEN]: "Connected",
  [ReadyState.CLOSING]: "Disconnecting...",
  [ReadyState.CLOSED]: "Disconnected",
  [ReadyState.UNINSTANTIATED]: "Uninstantiated",
};

export const LiveMatchInformation: React.FC<Props> = (props) => {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  const { data: opponent, isLoading: isOpponentLoading } = useAnyGithubUser({
    variables: {
      id:
        currentUser?.id == props.match.player1_id.toString()
          ? props.match.player2_id.toString()
          : props.match.player1_id.toString(),
    },
  });

  if (isUserLoading || isOpponentLoading) {
    return <Loader2Icon className="animate-spin" />;
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <div className="flex gap-2 items-center absolute bottom-2 left-2">
        Connection Status:{" "}
        <div className="flex items-center justify-center gap-2">
          {props.websocketReadyState === ReadyState.OPEN ? (
            <div className="bg-green-500 w-4 h-4 rounded-full"></div>
          ) : props.websocketReadyState === ReadyState.CONNECTING ? (
            <div className="bg-orange-500 w-4 h-4 rounded-full"></div>
          ) : (
            <div className="bg-red-500 w-4 h-4 rounded-full"></div>
          )}{" "}
          {wsConnectionMessages[props.websocketReadyState]}
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <Button
          variant={"ghost"}
          className="flex items-center gap-2 text-xl font-bold h-20"
        >
          <img
            className="w-16 h-16 rounded-full"
            src={currentUser?.avatar_url}
          />
          <div>{currentUser?.login}</div>
        </Button>
        <div>v/s</div>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-xl font-bold h-20"
        >
          <img className="w-16 h-16 rounded-full" src={opponent?.avatar_url} />
          <div>{opponent?.login}</div>
        </Button>
      </div>
    </div>
  );
};
