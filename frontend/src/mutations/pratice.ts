import { API_URL } from "@/lib/constants";
import { getGithubAccessToken } from "@/lib/utils";
import { createMutation } from "react-query-kit";

export const useSubmit = createMutation({
  mutationFn: async (variable: {
    problem_id: number;
    language_id: number;
    source_code: string;
    run: boolean;
  }) => {
    const ghToken = getGithubAccessToken();
    const res = await fetch(
      `${API_URL}/practice/submit/${variable.problem_id}`,
      {
        method: "POST",
        body: JSON.stringify({
          language_id: variable.language_id,
          source_code: variable.source_code,
          run: variable.run,
        }),
        headers: {
          Authorization: `Bearer ${ghToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    const data = await res.json();
    return data;
  },
});
