import { createQuery } from "react-query-kit";
import { getGithubAccessToken } from "@/lib/utils.ts";

enum MatchWinner {
  Player1,
  Player2,
}

enum MatchStatus {
  Pending,
  Completed,
}

interface Match {
  id: number;
  created_at: Date;
  winner: MatchWinner;
  status: MatchStatus;
  problem_id: number;
  player1_id: number;
  player2_id: number;
}

export const useMatchHistory = createQuery({
  queryKey: ["matchHistory"],
  fetcher: async () => {
    const ghToken = getGithubAccessToken();
    const response = await fetch("/api/match/history", {
      headers: {
        Authorization: `Bearer ${ghToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch match history");
    }
    return (await response.json()) as Match[];
  },
});

export const useLeaderboard = createQuery({
  queryKey: ["leaderboard"],
  fetcher: async () => {
    const response = await fetch("/api/match/leaderboard", {
      headers: { Authorization: `Bearer ${getGithubAccessToken()}` },
    });
    if (!response.ok)
      throw new Error(
        `Fetch to fetch leaderboard because of error ${response.status} ${response.statusText}`,
      );
    return (await response.json()) as DatabaseUser[];
  },
});
