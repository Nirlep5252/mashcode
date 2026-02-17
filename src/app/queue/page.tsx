"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type QueueEntry = {
  id: string;
  mode: "duel_casual" | "duel_ranked";
  status: "queued" | "matched" | "cancelled";
  joinedAt: string;
};

type SessionUser = { id: string; handle: string };

export default function QueuePage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [queueEntry, setQueueEntry] = useState<QueueEntry | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    const [authRes, queueRes] = await Promise.all([
      fetch("/api/auth/local", { cache: "no-store" }),
      fetch("/api/matchmaking/queue", { cache: "no-store" }),
    ]);

    const authData = await authRes.json();
    setUser(authData.user ?? null);

    if (queueRes.ok) {
      const queueData = await queueRes.json();
      setQueueEntry(queueData.queueEntry ?? null);
    }
  }

  useEffect(() => {
    load().catch((e) => setError(e instanceof Error ? e.message : "Load failed"));
  }, []);

  async function joinQueue() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/matchmaking/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "duel_casual" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to join queue");

      setQueueEntry(data.queueEntry ?? null);
      setRoomId(data.roomId ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to join queue");
    } finally {
      setLoading(false);
    }
  }

  async function leaveQueue() {
    setLoading(true);
    setError(null);
    try {
      await fetch("/api/matchmaking/queue", { method: "DELETE" });
      setQueueEntry(null);
    } catch {
      setError("Failed to leave queue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Matchmaking</p>
          <h1 className="text-3xl font-semibold mt-2">Queue lobby skeleton</h1>
          <p className="text-neutral-400 mt-2">Auth-gated queue flow for upcoming realtime matchmaking.</p>
        </header>

        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3">
          <p className="text-sm text-neutral-300">
            Session: {user ? <span className="font-medium">@{user.handle}</span> : "Not signed in"}
          </p>

          {!user ? (
            <p className="text-sm text-amber-300">Sign in on the home page first to join matchmaking.</p>
          ) : queueEntry ? (
            <div className="space-y-2">
              <p className="text-sm">Queued in {queueEntry.mode}.</p>
              <button onClick={leaveQueue} disabled={loading} className="rounded-md px-3 py-2 bg-neutral-800 border border-neutral-700">
                Leave queue
              </button>
            </div>
          ) : (
            <button onClick={joinQueue} disabled={loading} className="rounded-md px-4 py-2 bg-cyan-500 text-black font-medium">
              {loading ? "Joining..." : "Join casual queue"}
            </button>
          )}

          {roomId ? (
            <div className="rounded-lg border border-emerald-700 bg-emerald-950/30 p-3 text-sm">
              Match found. Continue to{" "}
              <Link href={`/duel/${roomId}`} className="underline font-medium">
                duel room {roomId}
              </Link>
              .
            </div>
          ) : null}

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
        </section>

        <Link href="/" className="text-sm text-neutral-400 underline">
          Back home
        </Link>
      </div>
    </main>
  );
}
