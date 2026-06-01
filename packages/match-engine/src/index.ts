import type { JudgeVerdict, MatchStatus } from "@mashcode/domain";
import { Effect } from "effect";

export type PlayerId = string;

export interface MatchSnapshot {
  readonly id: string;
  readonly status: MatchStatus;
  readonly version: number;
  readonly playerIds: readonly [PlayerId, PlayerId];
  readonly readyPlayerIds: readonly PlayerId[];
  readonly acceptedSubmissionId?: string;
}

export type MatchCommand =
  | { readonly type: "player-ready"; readonly playerId: PlayerId }
  | {
      readonly type: "submission-verdict";
      readonly playerId: PlayerId;
      readonly submissionId: string;
      readonly verdict: JudgeVerdict;
    };

export const createMatchSnapshot = (
  id: string,
  playerIds: readonly [PlayerId, PlayerId]
): MatchSnapshot => ({
  id,
  playerIds,
  readyPlayerIds: [],
  status: "pending_ready",
  version: 0
});

export const reduceMatchCommand = (
  snapshot: MatchSnapshot,
  command: MatchCommand
): Effect.Effect<MatchSnapshot> => {
  return Effect.sync(() => {
    switch (command.type) {
      case "player-ready": {
        const readyPlayerIds = snapshot.readyPlayerIds.includes(command.playerId)
          ? snapshot.readyPlayerIds
          : [...snapshot.readyPlayerIds, command.playerId];
        const status = readyPlayerIds.length === 2 ? "live" : snapshot.status;

        return {
          ...snapshot,
          readyPlayerIds,
          status,
          version: snapshot.version + 1
        };
      }

      case "submission-verdict": {
        if (command.verdict !== "accepted" || snapshot.status !== "live") {
          return {
            ...snapshot,
            version: snapshot.version + 1
          };
        }

        return {
          ...snapshot,
          acceptedSubmissionId: command.submissionId,
          status: "completed",
          version: snapshot.version + 1
        };
      }
    }
  });
};
