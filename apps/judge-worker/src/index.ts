import { Worker } from "bullmq";
import { Effect } from "effect";
import { JudgeConfigurationError, type JudgeRequest } from "@mashcode/judge-core";
import { createBullMqConnection } from "@mashcode/redis";

const judgePlaceholder = (
  request: JudgeRequest
): Effect.Effect<never, JudgeConfigurationError> => {
  return Effect.fail(
    new JudgeConfigurationError({
      message: `Judge runner is not configured for submission ${request.submissionId}.`
    })
  );
};

new Worker<JudgeRequest>(
  "judge-submissions",
  async (job) => {
    return Effect.runPromise(judgePlaceholder(job.data));
  },
  {
    connection: createBullMqConnection()
  }
);

console.log("MashCode judge worker listening on queue judge-submissions");
