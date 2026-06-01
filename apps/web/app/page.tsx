import { rankForRating } from "@mashcode/domain";
import { Button } from "@/components/ui/button";

const queueFacts = [
  "Raw WebSocket protocol",
  "Redis-backed presence",
  "BullMQ judge jobs",
  "Custom sandbox runner"
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded-lg border border-[var(--panel-border)] bg-[var(--panel)] p-6">
          <p className="text-sm font-medium text-[var(--accent)]">MashCode</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight">
            Ranked 1v1 coding, built around a trusted live match loop.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
            This scaffold keeps the app, API, realtime protocol, match engine,
            judge core, and database schema separated so the core product rules
            stay testable.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button>Enter ranked</Button>
            <Button variant="secondary">Practice</Button>
          </div>
        </section>

        <aside className="rounded-lg border border-[var(--panel-border)] bg-[var(--panel)] p-5">
          <h2 className="text-lg font-semibold">Architecture baseline</h2>
          <div className="mt-5 grid gap-3">
            {queueFacts.map((fact) => (
              <div
                className="rounded-md border border-[var(--panel-border)] px-4 py-3 text-sm text-[var(--muted)]"
                key={fact}
              >
                {fact}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-md bg-black/20 p-4">
            <p className="text-sm text-[var(--muted)]">Default public rank</p>
            <p className="mt-1 text-2xl font-semibold">{rankForRating(1000)}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
