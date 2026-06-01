import { Worker } from "bullmq";
import { Effect } from "effect";
import { createBullMqConnection } from "@mashcode/redis";

interface ProblemGenerationJob {
  readonly requestedByUserId: string;
  readonly ratingBand: string;
  readonly tags: readonly string[];
}

const problemGenerationPlaceholder = (
  jobId: string | undefined,
  job: ProblemGenerationJob
) => {
  return Effect.fail(
    new Error(
      `Problem generation workflow is not configured for job ${jobId ?? "unavailable"} in ${job.ratingBand}.`
    )
  );
};

new Worker<ProblemGenerationJob>(
  "problem-generation",
  async (job) => {
    return Effect.runPromise(problemGenerationPlaceholder(job.id, job.data));
  },
  {
    connection: createBullMqConnection()
  }
);

console.log("MashCode AI worker listening on queue problem-generation");
