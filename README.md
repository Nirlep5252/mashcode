# MashCode

MashCode is a ranked 1v1 competitive coding platform. The v0 architecture prioritizes the live match loop, custom judge, rating updates, and problem lifecycle.

## Setup

```sh
bun install
docker compose up -d postgres redis
bun run dev:web
bun run dev:api
```

## Useful Scripts

```sh
bun run typecheck
bun run db:generate
bun run db:migrate
```

## Architecture Docs

- [Project vision](docs/PROJECT.md)
- [Product requirements](docs/PRD.md)
- [Scope](docs/SCOPE.md)
- [Tech stack decisions](docs/TECH_STACK.md)
- [Architecture](docs/ARCHITECTURE.md)
