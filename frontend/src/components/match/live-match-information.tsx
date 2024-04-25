import { Match } from "@/types/match";
import { ReadyState } from "react-use-websocket";

interface Props {
  websocketReadyState: ReadyState;
  match: Match;
}

export const LiveMatchInformation: React.FC<Props> = () => {
  return <div></div>;
};
