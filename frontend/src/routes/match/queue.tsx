import { API_WS_URL } from "@/lib/constants";
import { createFileRoute } from "@tanstack/react-router";
import useWebSocket from "react-use-websocket";
import { Loader2Icon, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { useCurrentUser } from "@/queries/user";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/match/queue")({
  component: Queue,
});

function Queue() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const [queueTime, setQueueTime] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

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
    },
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setQueueTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLeaveQueue = () => {
    setIsLeaving(true);
    // Add actual leave queue logic here
    setTimeout(() => navigate({ to: "/" }), 500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <Card
        className={`p-8 space-y-8 transition-all duration-300 ${isLeaving ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
      >
        {/* Queue Status */}
        <div className="text-center space-y-4">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
            <div
              className="absolute inset-0 border-4 border-primary rounded-full animate-[spin_3s_linear_infinite]"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Users className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold">Finding Match</h2>
          <p className="text-muted-foreground">
            {lastJsonMessage
              ? (lastJsonMessage as Record<string, string>)?.message
              : "Searching for opponents..."}
          </p>
        </div>

        {/* Queue Info */}
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Queue Time</span>
            <span className="font-mono">{formatTime(queueTime)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Your Rating</span>
            <span className="font-mono">{user?.rating || 1000}</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-[queue_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLeaveQueue}
            disabled={isLeaving}
          >
            <X className="h-4 w-4" />
            Leave Queue
          </Button>
        </div>
      </Card>
    </div>
  );
}
