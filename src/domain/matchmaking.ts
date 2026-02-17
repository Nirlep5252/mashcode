import { z } from "zod";

export const queueModeSchema = z.enum(["duel_casual", "duel_ranked"]);
export type QueueMode = z.infer<typeof queueModeSchema>;

export const queueStatusSchema = z.enum(["queued", "matched", "cancelled"]);
export type QueueStatus = z.infer<typeof queueStatusSchema>;

export type QueueCandidate = {
  entryId: string;
  userId: string;
  mode: QueueMode;
  joinedAt: Date;
};

export function pickMatchPair(queue: QueueCandidate[]): [QueueCandidate, QueueCandidate] | null {
  if (queue.length < 2) return null;

  const byMode = new Map<QueueMode, QueueCandidate[]>();

  for (const candidate of queue) {
    const modeQueue = byMode.get(candidate.mode) ?? [];
    modeQueue.push(candidate);
    byMode.set(candidate.mode, modeQueue);
  }

  for (const mode of queueModeSchema.options) {
    const candidates = byMode.get(mode);
    if (!candidates || candidates.length < 2) continue;

    const sorted = [...candidates].sort((a, b) => a.joinedAt.getTime() - b.joinedAt.getTime());
    return [sorted[0], sorted[1]];
  }

  return null;
}
