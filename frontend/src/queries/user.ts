import { createQuery } from "react-query-kit";
import { getGithubAccessToken } from "@/lib/utils.ts";
import { API_URL } from "@/lib/constants";

export const useCurrentUser = createQuery({
  queryKey: ["githubUser"],
  fetcher: async () => {
    const ghToken = getGithubAccessToken();
    const response = await fetch(`${API_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${ghToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return (await response.json()) as GithubUser;
  },
  retry: false,
});

export const useAnyGithubUser = createQuery({
  queryKey: ["anyGithubUser"],
  fetcher: async (args: { id: string }) => {
    const response = await fetch(`https://api.github.com/user/${args.id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    return (await response.json()) as GithubUser;
  },
});
