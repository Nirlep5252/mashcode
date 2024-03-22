import { API_URL } from "@/lib/constants";
import { getGithubAccessToken } from "@/lib/utils";
import { language } from "@codemirror/language";
import { createMutation } from "react-query-kit";

export const useSubmission = createMutation({
  mutationFn: async (variable: {problem_id: number;language_id:number; source_code: string }) => {
    const ghToken = getGithubAccessToken();
    fetch(`${API_URL}/practice_questions/submission/${variable.problem_id}`, {
      method: "POST",
      body: JSON.stringify({"language_id": variable.language_id, "source_code": variable.source_code}),
      headers: {
        Authorization: `Bearer ${ghToken}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
});
