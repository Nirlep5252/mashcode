# MashCode Architecture

MashCode is built around one critical loop: two users enter ranked matchmaking, receive the same fresh problem, submit code to a trusted judge, and receive a fair result with a rating update. The architecture keeps that loop server-owned and auditable.

## Monorepo Layout

```text
apps/web          Next.js application
apps/api          Hono HTTP and raw WebSocket gateway
apps/judge-worker BullMQ worker for submission judging
apps/ai-worker    BullMQ worker for future problem generation and verification
packages/contracts shared schemas for HTTP and worker boundaries
packages/db        Drizzle schema, client, and migrations
packages/domain    pure domain constants and helpers
packages/judge-core judge request/result contracts and adapter interfaces
packages/match-engine server-owned match state transitions
packages/realtime-protocol WebSocket message schemas and codecs
```

## Source Of Truth

PostgreSQL is authoritative for durable state:

- users and roles
- profiles and ratings
- problems and lifecycle state
- matches and match events
- submissions and private source
- judge results
- reports, audit logs, and admin actions

Redis is for ephemeral coordination:

- matchmaking sorted sets
- connection and presence TTLs
- WebSocket server fanout
- reaction and command rate limits
- match timer and disconnect grace coordination
- BullMQ queues

If Redis loses ephemeral state, clients and workers must recover from Postgres snapshots and append-only events.

## Realtime Model

The browser uses raw WebSocket through the Hono API service. Clients send commands; the server sends snapshots and events.

Client commands:

- `heartbeat`
- `match.ready`
- `match.reaction`
- `match.resync`

Server messages:

- `connection.accepted`
- `match.snapshot`
- `match.event`
- `match.error`

The client is never authoritative for match state, timers, opponent status, verdicts, or results. On reconnect, the client requests a fresh snapshot and resumes from server state.

## Match Flow

1. User enters ranked queue.
2. API checks account eligibility and ranked inventory.
3. Matchmaking uses Redis sorted sets and widening rating windows.
4. When two users match, Postgres creates a match and appends initial match events.
5. Ready screen starts. Failure to ready cancels without rating change.
6. Problem reveal occurs only after both users are ready.
7. Submissions create durable rows and enqueue BullMQ judge jobs.
8. Judge worker compiles/runs code in isolated disposable sandboxes.
9. Match engine consumes normalized verdicts and decides win, progress, timeout, forfeit, or draw.
10. Rating service writes the rating update transactionally.
11. Consumed ranked problems become unavailable for future ranked matches and can become available for upsolving/practice.

## Judge Architecture

The judge is custom because MashCode needs hidden-test protection and Codeforces-style custom C++ checker semantics.

Core constraints:

- user code runs only in disposable Linux sandboxes
- no network access from submitted code
- CPU, wall-time, memory, process, and filesystem limits are enforced
- hidden inputs and expected outputs are not mounted into the user program filesystem
- checker execution is separate from user program execution
- judge output is normalized before it crosses into match state
- ranked feedback remains intentionally limited

The first runner can use `isolate` or `nsjail`. Firecracker remains a future hardening option.

## Package Boundaries

- `packages/domain` contains pure rules such as ranks and verdict names.
- `packages/contracts` contains cross-service schemas.
- `packages/realtime-protocol` owns WebSocket message validation.
- `packages/match-engine` owns match state transitions and should be testable without Redis, Hono, or Postgres.
- `packages/judge-core` owns judge contracts and adapter interfaces, not the concrete sandbox implementation.
- `packages/db` owns Drizzle schema and database client setup.

Applications compose these packages. They should not duplicate domain rules.

## Testing Priorities

Tests should focus first on external product rules:

- rank thresholds and rating movement
- matchmaking widening and inventory-empty behavior
- ready timeout, problem reveal, accepted win, timeout tie-breaks, disconnect grace, and forfeits
- problem lifecycle transitions and re-verification gates
- judge verdict normalization
- hidden-test and source visibility rules

Private implementation details are secondary to these product contracts.
