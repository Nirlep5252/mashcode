export interface Submission {
  id: number;
  source_code: string;
  language_id: number;
  problem_id: number;
  time: Date;
  user_id: number;
}

export enum Verdict {
  InQueue = 1,
  Processing = 2,
  Accepted = 3,
  WrongAnswer = 4,
  TLE = 5,
  CompilationError = 6,
  RuntimeErrorSIGSEGV = 7,
}

export interface SubmissionVerdict {
  id: number;
  verdict: Verdict;
  test_case: number;
  submission_id: number;
  execution_time: number;
  memory_used: number;
  output: string;
  is_pretest: boolean;
}
