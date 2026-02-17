"use client";

import { FormEvent, useEffect, useState } from "react";

type Duel = {
  id: string;
  title: string;
  status: "open" | "active" | "finished";
  rounds: number;
  createdAt: string;
};

export default function Home() {
  const [duels, setDuels] = useState<Duel[]>([]);
  const [title, setTitle] = useState("");
  const [rounds, setRounds] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/duels", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load duels");
    const data = await res.json();
    setDuels(data.duels ?? []);
  }

  useEffect(() => {
    load().catch((e) => setError(e instanceof Error ? e.message : "Load failed"));
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/duels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, rounds }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error?.formErrors?.[0] ?? "Create failed");
      }

      setTitle("");
      setRounds(1);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Create failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">MashCode v2</p>
          <h1 className="text-4xl font-semibold mt-2">1v1 coding duels, rewritten from scratch</h1>
          <p className="text-neutral-400 mt-3">
            Local-first 2026 stack: Next.js 16, TypeScript, Drizzle ORM, PostgreSQL (Docker).
          </p>
        </header>

        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <h2 className="text-xl font-medium mb-4">Create duel</h2>
          <form onSubmit={onCreate} className="grid gap-3 md:grid-cols-[1fr_120px_140px]">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Two Sum in 15 minutes"
              className="rounded-md px-3 py-2 bg-neutral-950 border border-neutral-700"
              required
              minLength={3}
            />
            <input
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
              type="number"
              min={1}
              max={10}
              className="rounded-md px-3 py-2 bg-neutral-950 border border-neutral-700"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-md px-4 py-2 bg-cyan-500 text-black font-medium disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
          {error ? <p className="text-red-400 text-sm mt-3">{error}</p> : null}
        </section>

        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <h2 className="text-xl font-medium mb-4">Recent duels</h2>
          {duels.length === 0 ? (
            <p className="text-neutral-400">No duels yet. Create the first one.</p>
          ) : (
            <ul className="space-y-2">
              {duels.map((duel) => (
                <li key={duel.id} className="border border-neutral-800 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{duel.title}</p>
                    <p className="text-xs text-neutral-400">{duel.rounds} round(s) • {new Date(duel.createdAt).toLocaleString()}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-neutral-800">{duel.status}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
