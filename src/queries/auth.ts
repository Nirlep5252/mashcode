import { createQuery } from "react-query-kit";

export const useUser = createQuery({
  queryKey: ["githubUser"],
  fetcher: async () => {
    const githubToken = window.localStorage.getItem("gh-token");
    if (githubToken) {
      console.log(githubToken);
      const response = await fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${githubToken}` },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      return null;
    }
  },
});
