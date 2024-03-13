import { API_WS_URL } from "@/lib/constants";
import { createFileRoute } from "@tanstack/react-router";
import useWebSocket from "react-use-websocket";

export const Route = createFileRoute("/match/queue")({
  component: Queue,
});

function Queue() {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${API_WS_URL}/match/queue`,
    {
      onOpen: () => {
        console.log("ws connected");
        sendJsonMessage({
          type: "auth",
          token: localStorage.getItem("ghToken"),
        });
      },
    },
  );

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        {lastJsonMessage
          ? ((lastJsonMessage as Record<string, string | undefined>)
              ?.message as string)
          : "Queueing..."}
      </div>
    </>
  );
}
