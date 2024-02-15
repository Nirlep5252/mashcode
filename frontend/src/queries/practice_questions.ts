import { createQuery } from "react-query-kit";
import { getGithubAccessToken } from "@/lib/utils.ts";

interface PracticeQuestion {
    id: number;
    title: string;
}

export const usePracticeQuestions = createQuery({
    queryKey: ["practiceQuestions"],
    fetcher: async () => {
        const ghToken = getGithubAccessToken();
        const response = await fetch("/api/practice_questions/question_list", {
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

