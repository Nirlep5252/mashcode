"use client";

import { FormEvent, useEffect, useState } from "react";

type SessionUser = {
  id: string;
  handle: string;
  createdAt: string;
};

export function LocalAuthCard() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshSession() {
    const res = await fetch("/api/auth/local", { cache: "no-store" });
    if (!res.ok) throw new Error("Could not load auth session");
    const data = await res.json();
    setUser(data.user ?? null);
  }

  useEffect(() => {
    refreshSession().catch((e) => setError(e instanceof Error ? e.message : "Auth load failed"));
  }, []);

  async function onSignIn(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error?.fieldErrors?.handle?.[0] ?? "Sign-in failed");
      }

      setHandle("");
      await refreshSession();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  async function onSignOut() {
    setLoading(true);
    setError(null);
    try {
      await fetch("/api/auth/local", { method: "DELETE" });
      await refreshSession();
    } catch {
      setError("Sign-out failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3">
      <h2 className="text-lg font-medium">Local-first auth scaffold</h2>
      {user ? (
        <div className="space-y-2">
          <p className="text-sm text-neutral-300">
            Signed in as <span className="font-semibold">@{user.handle}</span>
          </p>
          <button
            onClick={onSignOut}
            disabled={loading}
            className="rounded-md px-3 py-2 bg-neutral-800 border border-neutral-700 text-sm"
          >
            {loading ? "Signing out..." : "Sign out"}
          </button>
        </div>
      ) : (
        <form onSubmit={onSignIn} className="flex flex-col gap-2 sm:flex-row">
          <input
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="pick_handle"
            className="rounded-md px-3 py-2 bg-neutral-950 border border-neutral-700"
            minLength={3}
            maxLength={20}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-md px-4 py-2 bg-cyan-500 text-black font-medium disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in locally"}
          </button>
        </form>
      )}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </section>
  );
}
