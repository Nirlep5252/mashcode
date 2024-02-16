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


interface PracticeQuestionDetails {
    problem_statement: string;
    problem_input: string;
    problem_output: string;
    problem_constraints: string;
    problem_examples: string;
    problem_title: string;
}

export const usePracticeQuestionDetails = createQuery({
    queryKey: ["practiceQuestionDetails"],
    fetcher: async (id: number) => {
        const ghToken = getGithubAccessToken();
        const response = await fetch(`/api/practice_questions/get_question/1`, {
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
