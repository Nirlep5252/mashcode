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
        sendJsonMessage({
          type: "auth",
          token: localStorage.getItem("ghToken"),
        });
      },
      onMessage: (event) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "redirect":
            window.location.href = data.to;
            break;
        }
      },
    }
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
