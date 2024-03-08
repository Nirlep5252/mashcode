import { createQuery } from "react-query-kit";
import { getGithubAccessToken } from "@/lib/utils.ts";
import { API_URL } from "@/lib/constants";

// TODO: convert this to infiniteQuery so we can paginate it later
export const useMatchHistory = createQuery({
  queryKey: ["matchHistory"],
  fetcher: async () => {
    const ghToken = getGithubAccessToken();
    const response = await fetch(`${API_URL}/match/history`, {
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

// TODO: convert this to infiniteQuery so we can paginate it later
export const useLeaderboard = createQuery({
  queryKey: ["leaderboard"],
  fetcher: async () => {
    const response = await fetch(`${API_URL}/match/leaderboard`, {
      headers: { Authorization: `Bearer ${getGithubAccessToken()}` },
    });
    if (!response.ok)
      throw new Error(
        `Fetch to fetch leaderboard because of error ${response.status} ${response.statusText}`
      );
    const users = (await response.json()) as DatabaseUser[];
    const githubUsers: (GithubUser & {
      rating: number;
    })[] = [];
    for (const user of users) {
      const resp = await fetch(`https://api.github.com/user/${user.id}`);
      const data = await resp.json();
      githubUsers.push({
        ...(data as GithubUser),
        rating: user.rating,
      });
    }
    return githubUsers;
  },
});
