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
npm run db:generate
npm run db:migrate
npm run db:studio
```

## Current scope

- Create/list duel lobbies via `/api/duels`
- Health endpoint via `/api/health`
- Browser-tested local flow with dockerized Postgres

Next: auth, matchmaking, problem pipeline, submissions + judge workers.
