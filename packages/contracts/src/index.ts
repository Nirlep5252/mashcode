import { Schema } from "effect";
import {
  judgeLanguages,
  judgeVerdicts,
  matchStatuses,
  rankedReactions
} from "@mashcode/domain";

export const MatchStatusSchema = Schema.Literal(...matchStatuses);
export const JudgeVerdictSchema = Schema.Literal(...judgeVerdicts);
export const JudgeLanguageSchema = Schema.Literal(...judgeLanguages);
export const RankedReactionSchema = Schema.Literal(...rankedReactions);

type MatchEventDefinition<
  Type extends string,
  Payload extends Schema.Schema.AnyNoContext
> = readonly [type: Type, payload: Payload];

const defineMatchEvents = <
  const Definitions extends readonly [
    MatchEventDefinition<string, Schema.Schema.AnyNoContext>,
    ...Array<MatchEventDefinition<string, Schema.Schema.AnyNoContext>>
  ]
>(
  definitions: Definitions
) => definitions;

export const matchEventDefinitions = defineMatchEvents([
  [
    "match.created",
    Schema.Struct({
      playerIds: Schema.Tuple(Schema.String, Schema.String),
      problemId: Schema.String
    })
  ],
  [
    "player.ready",
    Schema.Struct({
      playerId: Schema.String
    })
  ],
  [
    "problem.revealed",
    Schema.Struct({
      problemId: Schema.String
    })
  ],
  [
    "submission.received",
    Schema.Struct({
      playerId: Schema.String,
      submissionId: Schema.String
    })
  ],
  [
    "submission.verdict",
    Schema.Struct({
      playerId: Schema.String,
      submissionId: Schema.String,
      verdict: JudgeVerdictSchema,
      passedTestCount: Schema.Number,
      totalTestCount: Schema.Number
    })
  ],
  [
    "reaction.sent",
    Schema.Struct({
      playerId: Schema.String,
      reaction: RankedReactionSchema
    })
  ],
  [
    "match.completed",
    Schema.Struct({
      result: Schema.Literal("accepted", "timeout", "draw", "forfeit")
    })
  ],
  [
    "match.cancelled",
    Schema.Struct({
      reason: Schema.Literal("ready_timeout", "inventory_empty", "admin")
    })
  ],
  [
    "player.disconnected",
    Schema.Struct({
      playerId: Schema.String
    })
  ],
  [
    "player.reconnected",
    Schema.Struct({
      playerId: Schema.String
    })
  ]
] as const);

type MatchEventTypes<
  Definitions extends ReadonlyArray<
    MatchEventDefinition<string, Schema.Schema.AnyNoContext>
  >
> = {
  readonly [Index in keyof Definitions]: Definitions[Index] extends MatchEventDefinition<
    infer Type,
    Schema.Schema.AnyNoContext
  >
    ? Type
    : never;
};

type MatchEventFromDefinitions<
  Definitions extends ReadonlyArray<
    MatchEventDefinition<string, Schema.Schema.AnyNoContext>
  >
> = {
  [Index in keyof Definitions]: Definitions[Index] extends MatchEventDefinition<
    infer Type,
    infer Payload
  >
    ? {
        readonly type: Type;
        readonly payload: Schema.Schema.Type<Payload>;
      }
    : never;
}[number];

const getMatchEventTypes = <
  const Definitions extends readonly [
    MatchEventDefinition<string, Schema.Schema.AnyNoContext>,
    ...Array<MatchEventDefinition<string, Schema.Schema.AnyNoContext>>
  ]
>(
  definitions: Definitions
): MatchEventTypes<Definitions> => {
  return definitions.map(([type]) => type) as MatchEventTypes<Definitions>;
};

const createMatchEventSchema = ([
  type,
  payload
]: MatchEventDefinition<string, Schema.Schema.AnyNoContext>): Schema.Schema.AnyNoContext => {
  return Schema.Struct({
    type: Schema.Literal(type),
    payload
  });
};

const getMatchEventSchemas = <
  const Definitions extends readonly [
    MatchEventDefinition<string, Schema.Schema.AnyNoContext>,
    ...Array<MatchEventDefinition<string, Schema.Schema.AnyNoContext>>
  ]
>(
  definitions: Definitions
): [Schema.Schema.AnyNoContext, ...Array<Schema.Schema.AnyNoContext>] => {
  const [firstDefinition, ...remainingDefinitions] = definitions;

  return [
    createMatchEventSchema(firstDefinition),
    ...remainingDefinitions.map(createMatchEventSchema)
  ];
};

export const matchEventTypes = getMatchEventTypes(matchEventDefinitions);

const matchEventSchemas = getMatchEventSchemas(matchEventDefinitions);

export type MatchEvent = MatchEventFromDefinitions<typeof matchEventDefinitions>;

export const MatchEvent: Schema.Schema<MatchEvent> = Schema.Union(
  ...matchEventSchemas
) as Schema.Schema<MatchEvent>;

export type MatchEventPayload = MatchEvent["payload"];

export const HealthResponse = Schema.Struct({
  ok: Schema.Boolean,
  service: Schema.String,
  time: Schema.String
});

export type HealthResponse = Schema.Schema.Type<typeof HealthResponse>;

export const EnqueueSubmissionRequest = Schema.Struct({
  matchId: Schema.String,
  problemId: Schema.String,
  submissionId: Schema.String,
  userId: Schema.String
});

export type EnqueueSubmissionRequest = Schema.Schema.Type<
  typeof EnqueueSubmissionRequest
>;
