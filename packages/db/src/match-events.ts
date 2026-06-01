import type { MatchEvent } from "@mashcode/contracts";
import type { matchEvents } from "./schema";

export interface MatchEventInsertInput {
  readonly matchId: string;
  readonly version: number;
  readonly event: MatchEvent;
}

export type MatchEventInsert = typeof matchEvents.$inferInsert;

export const toMatchEventInsert = ({
  event,
  matchId,
  version
}: MatchEventInsertInput): MatchEventInsert => {
  return {
    matchId,
    version,
    type: event.type,
    payload: event.payload
  };
};
