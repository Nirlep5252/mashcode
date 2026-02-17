import Link from "next/link";
import { LocalAuthCard } from "@/components/local-auth-card";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">MashCode v2</p>
          <h1 className="text-4xl font-semibold mt-2">Modern 2026 rewrite in progress</h1>
          <p className="text-neutral-400 mt-3">
            Next.js 16 + React 19 + Drizzle + Dockerized PostgreSQL. This phase adds local auth and duel
            matchmaking skeletons.
          </p>
        </header>

        <LocalAuthCard />

        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3">
          <h2 className="text-xl font-medium">Matchmaking flow</h2>
          <p className="text-sm text-neutral-400">Use these pages to validate browser-visible scaffolding.</p>
          <div className="flex flex-wrap gap-3">
            <Link className="rounded-md px-4 py-2 bg-cyan-500 text-black font-medium" href="/queue">
              Open Queue Page
            </Link>
            <Link className="rounded-md px-4 py-2 bg-neutral-800 border border-neutral-700" href="/duel/demo-room">
              Open Duel Room Skeleton
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
