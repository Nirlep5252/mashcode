import type { JudgeLanguage, JudgeVerdict } from "@mashcode/domain";
import { Data, Effect } from "effect";

export interface JudgeLimits {
  readonly cpuMs: number;
  readonly wallMs: number;
  readonly memoryMb: number;
  readonly outputKb: number;
}

export interface JudgeRequest {
  readonly submissionId: string;
  readonly problemId: string;
  readonly language: JudgeLanguage;
  readonly source: string;
  readonly limits: JudgeLimits;
}

export interface JudgeResult {
  readonly submissionId: string;
  readonly verdict: JudgeVerdict;
  readonly passedTestCount: number;
  readonly totalTestCount: number;
  readonly compileOutput?: string;
  readonly rankedFeedback?: string;
}

export class JudgeConfigurationError extends Data.TaggedError(
  "JudgeConfigurationError"
)<{
  readonly message: string;
}> {}

export class JudgeSandboxError extends Data.TaggedError("JudgeSandboxError")<{
  readonly message: string;
}> {}

export type JudgeError = JudgeConfigurationError | JudgeSandboxError;

export interface JudgeAdapter {
  readonly judge: (
    request: JudgeRequest
  ) => Effect.Effect<JudgeResult, JudgeError>;
}
