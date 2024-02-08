import { createQuery } from "react-query-kit";
import { getGithubAccessToken } from "@/lib/utils.ts";

type GithubUser = {
  login: string;
  id: string;
  node_id: string;
  avatar_url: string;
  gravatar_id?: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: null;
  type: string;
  site_admin: boolean;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  hireable?: boolean;
  bio?: string;
  twitter_username?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  plan: {
    collaborators: number;
    name: string;
    space: number;
    private_repos: number;
  };
  suspended_at?: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
};

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
