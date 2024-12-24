import { createQuery } from "react-query-kit";
import { getGithubAccessToken } from "@/lib/utils.ts";
import { API_URL } from "@/lib/constants";
import { Verdict } from "@/types/submission";

interface PracticeQuestion {
  id: number;
  title: string;
}

export const usePracticeQuestions = createQuery({
  queryKey: ["practiceQuestions"],
  fetcher: async () => {
    const ghToken = getGithubAccessToken();
    const response = await fetch(`${API_URL}/practice/questions`, {
      headers: {
        Authorization: `Bearer ${ghToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch practice questions");
    }
    return (await response.json()) as PracticeQuestion[];
  },
});

interface PracticeQuestionDetails {
  problem_statement: string;
  problem_input: string;
  problem_output: string;
  problem_constraints: string;
  problem_examples: string;
  problem_title: string;
}

export const usePracticeQuestion = createQuery({
  queryKey: ["practiceQuestion"],
  fetcher: async (args: { id: string }) => {
    const ghToken = getGithubAccessToken();
    const response = await fetch(`${API_URL}/practice/question/${args.id}`, {
      headers: {
        Authorization: `Bearer ${ghToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch practice question details");
    }
    return (await response.json()) as PracticeQuestionDetails;
  },
});

interface PracticeHistoryItem {
  submission_id: number;
  problem_id: number;
  time: number;
  memory: number;
  verdict: Verdict;
}

export const usePracticeHistory = createQuery({
  queryKey: ["practiceHistory"],
  fetcher: async (args: { id: string }) => {
    const ghToken = getGithubAccessToken();
    const response = await fetch(`${API_URL}/practice/history/${args.id}`, {
      headers: {
        Authorization: `Bearer ${ghToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch practice history");
    }
    return (await response.json()) as PracticeHistoryItem[];
  },
});
