import { API_URL } from "@/lib/constants";
import { getGithubAccessToken } from "@/lib/utils";
import { Submission, SubmissionVerdict } from "@/types/submission";
import { createQuery } from "react-query-kit";

export const useSubmission = createQuery({
  queryKey: ["submission"],
  fetcher: async (args: { id: string }) => {
    const ghToken = getGithubAccessToken();
    const response = await fetch(`${API_URL}/submission/${args.id}`, {
      headers: {
        Authorization: `Bearer ${ghToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch submission");
    }
    return (await response.json()) as Submission;
  },
});

export const useVerdicts = createQuery({
  queryKey: ["verdicts"],
  fetcher: async (args: { submission_id: string }) => {
    const ghToken = getGithubAccessToken();
    const response = await fetch(
      `${API_URL}/submission/${args.submission_id}/verdicts`,
      {
        headers: {
          Authorization: `Bearer ${ghToken}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch verdicts");
    }
    return (await response.json()) as SubmissionVerdict[];
  },
});
