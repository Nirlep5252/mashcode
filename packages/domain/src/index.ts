export const rankLadder = [
  { name: "Newbie", minRating: Number.NEGATIVE_INFINITY, maxRating: 799 },
  { name: "Apprentice", minRating: 800, maxRating: 999 },
  { name: "Coder", minRating: 1000, maxRating: 1199 },
  { name: "Specialist", minRating: 1200, maxRating: 1399 },
  { name: "Strategist", minRating: 1400, maxRating: 1599 },
  { name: "Mindbender", minRating: 1600, maxRating: 1799 },
  { name: "Genius", minRating: 1800, maxRating: 2099 },
  { name: "Prodigy", minRating: 2100, maxRating: 2399 },
  { name: "Sage", minRating: 2400, maxRating: Number.POSITIVE_INFINITY }
] as const;

export type RankName = (typeof rankLadder)[number]["name"];

export const rankForRating = (rating: number): RankName => {
  const rank = rankLadder.find((candidate) => {
    return rating >= candidate.minRating && rating <= candidate.maxRating;
  });

  if (!rank) {
    throw new Error(`No rank configured for rating ${rating}`);
  }

  return rank.name;
};

export const judgeVerdicts = [
  "accepted",
  "wrong_answer",
  "time_limit_exceeded",
  "memory_limit_exceeded",
  "runtime_error",
  "compile_error",
  "internal_error"
] as const;

export type JudgeVerdict = (typeof judgeVerdicts)[number];

export const judgeLanguages = [
  "cpp17",
  "cpp20",
  "python3",
  "java17",
  "javascript",
  "typescript",
  "go",
  "rust",
  "csharp",
  "kotlin"
] as const;

export type JudgeLanguage = (typeof judgeLanguages)[number];

export const checkerTypes = ["exact", "custom_cpp"] as const;

export type CheckerType = (typeof checkerTypes)[number];

export const userRoles = ["user", "problem_manager", "admin", "owner"] as const;

export type UserRole = (typeof userRoles)[number];

export const problemLifecycleStates = [
  "generated_candidate",
  "auto_verified",
  "needs_review",
  "approved_for_practice",
  "approved_for_ranked",
  "rejected",
  "retired"
] as const;

export type ProblemLifecycleState = (typeof problemLifecycleStates)[number];

export const matchStatuses = [
  "pending_ready",
  "live",
  "completed",
  "cancelled",
  "forfeited"
] as const;

export type MatchStatus = (typeof matchStatuses)[number];

export const rankedReactions = ["glhf", "nice", "gg", "oops"] as const;

export type RankedReaction = (typeof rankedReactions)[number];
