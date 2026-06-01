import { Schema } from "effect";
import {
  MatchEvent,
  MatchStatusSchema,
  RankedReactionSchema
} from "@mashcode/contracts";

export const ClientMessage = Schema.Union(
  Schema.Struct({
    type: Schema.Literal("heartbeat"),
    clientTime: Schema.String
  }),
  Schema.Struct({
    type: Schema.Literal("match.ready"),
    matchId: Schema.String
  }),
  Schema.Struct({
    type: Schema.Literal("match.reaction"),
    matchId: Schema.String,
    reaction: RankedReactionSchema
  }),
  Schema.Struct({
    type: Schema.Literal("match.resync"),
    matchId: Schema.String
  })
);

export type ClientMessage = Schema.Schema.Type<typeof ClientMessage>;

export const ServerMessage = Schema.Union(
  Schema.Struct({
    type: Schema.Literal("connection.accepted"),
    serverTime: Schema.String
  }),
  Schema.Struct({
    type: Schema.Literal("system.heartbeat_ack"),
    clientTime: Schema.String,
    serverTime: Schema.String
  }),
  Schema.Struct({
    type: Schema.Literal("match.snapshot"),
    matchId: Schema.String,
    version: Schema.Number,
    status: MatchStatusSchema
  }),
  Schema.Struct({
    type: Schema.Literal("match.event"),
    matchId: Schema.String,
    version: Schema.Number,
    event: MatchEvent
  }),
  Schema.Struct({
    type: Schema.Literal("match.error"),
    code: Schema.String,
    message: Schema.String
  })
);

export type ServerMessage = Schema.Schema.Type<typeof ServerMessage>;

const decodeUnknownClientMessage = Schema.decodeUnknownSync(ClientMessage);

export const decodeClientMessage = (payload: string): ClientMessage => {
  return decodeUnknownClientMessage(JSON.parse(payload));
};

export const encodeServerMessage = (message: ServerMessage): string => {
  return JSON.stringify(message);
};
