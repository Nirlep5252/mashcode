# MashCode Tech Stack Decisions

This document records the current implementation choices for MashCode so future agents do not need to re-litigate the foundational stack. Revisit these decisions only when a requirement or operating constraint materially changes.

## Chosen Stack

| Area | Choice | Why |
| --- | --- | --- |
| Monorepo and tooling | Bun workspaces, TypeScript | One language across web, API, workers, contracts, and domain packages. Bun is the required package manager for this repo. |
| Web app | Next.js latest, React, TypeScript | Supports the public app, authenticated app, admin surfaces, and server-rendered data-heavy pages without adding a separate web framework. |
| UI | Tailwind CSS, Radix Primitives, owned components | Tailwind keeps styling local and explicit. Radix provides accessible unstyled primitives while preserving a MashCode-owned component API. |
| API | Hono on Bun | Lightweight HTTP/WebSocket adapter with low ceremony and good fit for TypeScript services. |
| Application services | Effect | Typed errors, dependency layers, resource safety, retries, scheduling, and observability for the risky parts of the product. |
| Database | PostgreSQL, Drizzle ORM | Postgres is the source of truth. Drizzle keeps schema and migrations typed without hiding SQL. |
| Realtime/session state | Raw WebSocket via Hono, Redis coordination | The match protocol is product-specific and server-authoritative. Redis handles ephemeral presence, matchmaking windows, fanout, rate limits, and TTLs. |
| Jobs | BullMQ, Redis | Submission judging, match timers, disconnect grace, verification, emails, and generation jobs need concurrency, retries, and delayed execution. |
| Auth | Better Auth | Covers email/password, email verification, GitHub auth, TypeScript integration, and extensible user fields/roles. |
| Judge | Custom judge runner | MashCode needs Codeforces-style checker semantics, hidden-test protection, and strict ranked feedback rules. Judge0 is not the foundation. |

## Important Non-Choices

- Do not add shadcn/ui. Build owned components around Radix primitives instead.
- Do not rely on Socket.IO for v0. Raw WebSocket is acceptable because the protocol is simple and server-owned.
- Do not use Judge0 for ranked judging. A custom runner is required for checker semantics and hidden-test handling.
- Do not introduce NATS, Temporal, or Firecracker in the initial stack. They remain valid future upgrades if the system pressure justifies them.
- Do not use npm, pnpm, yarn, or their lockfiles.

## Effect Usage Boundary

Effect should be used heavily in backend and worker code:

- match engine
- matchmaking
- rating updates
- problem lifecycle transitions
- judge orchestration
- verification and AI generation workflows
- external service boundaries

Effect should not be forced into routine React component state. Use normal React and Next.js patterns in the frontend unless a specific client workflow benefits from Effect.

## Revisit Points

Reconsider the stack when one of these becomes true:

- Redis coordination becomes too fragile or high-volume for the match event stream. Consider NATS JetStream.
- AI generation workflows become long-running and operationally complex. Consider Temporal.
- The custom sandbox threat model requires VM-level isolation. Consider Firecracker.
- Radix primitives stop covering needed accessible UI behavior. Consider Base UI behind the owned component layer.
