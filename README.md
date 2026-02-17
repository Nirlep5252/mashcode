# MashCode v2 (Rewrite)

Fresh rewrite of MashCode focused on modern 2026 DX and local-first development.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Drizzle ORM + PostgreSQL
- Docker Compose for local database

## Local setup

```bash
cp .env.example .env.local
npm install
docker compose up -d
npm run db:generate
npm run db:migrate
npm run dev
```

App runs at `http://localhost:3000`.

## Useful scripts

```bash
npm run dev
npm run lint
npm run test
npm run db:generate
npm run db:migrate
npm run db:studio
```

## Phase 2 scope (matchmaking + auth scaffold)

- Local-first auth scaffold (`/api/auth/local`) with cookie sessions + handle-based local sign-in
- Matchmaking domain model + queue API (`/api/matchmaking/queue`)
- Duel room scaffold model/API (`/api/duel-rooms/:roomId`)
- Browser pages:
  - `/` — rewrite status + local auth card
  - `/queue` — queue join/leave + match handoff
  - `/duel/[roomId]` — duel room skeleton

Next: realtime transport, round lifecycle orchestration, judge workers.
