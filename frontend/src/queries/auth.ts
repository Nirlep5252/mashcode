import { createQuery } from "react-query-kit";
import { getGithubAccessToken } from "@/lib/utils.ts";

export const useUser = createQuery({
  queryKey: ["githubUser"],
  fetcher: async () => {
    const ghToken = getGithubAccessToken();
    const response = await fetch("/api/auth/user", {
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
