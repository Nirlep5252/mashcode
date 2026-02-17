import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { duelRoomPlayers, duelRooms, users } from "@/db/schema";

type Params = Promise<{ roomId: string }>;

async function getRoom(roomId: string) {
  const roomRows = await db.select().from(duelRooms).where(eq(duelRooms.id, roomId)).limit(1);
  const room = roomRows[0] ?? null;

  const players = room
    ? await db
        .select({
          userId: duelRoomPlayers.userId,
          slot: duelRoomPlayers.slot,
          ready: duelRoomPlayers.ready,
          handle: users.handle,
        })
        .from(duelRoomPlayers)
        .innerJoin(users, eq(duelRoomPlayers.userId, users.id))
        .where(eq(duelRoomPlayers.roomId, roomId))
    : [];

  return { room, players };
}

export default async function DuelRoomPage({ params }: { params: Params }) {
  const { roomId } = await params;
  const data = await getRoom(roomId);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Duel Room</p>
          <h1 className="text-3xl font-semibold mt-2">Room {roomId}</h1>
          <p className="text-neutral-400 mt-2">Pre-game room skeleton for realtime coding duels.</p>
        </header>

        <section className="grid md:grid-cols-2 gap-4">
          <article className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-2">
            <h2 className="font-medium">Players</h2>
            {data.players.length ? (
              <ul className="space-y-2 text-sm">
                {data.players.map((player) => (
                  <li key={player.userId} className="flex items-center justify-between rounded-md border border-neutral-800 px-3 py-2">
                    <span>
                      Slot {player.slot}: @{player.handle}
                    </span>
                    <span className="text-neutral-400">{player.ready ? "ready" : "not ready"}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-neutral-400">Waiting for players...</p>
            )}
          </article>

          <article className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-2">
            <h2 className="font-medium">Round panel (coming next)</h2>
            <ul className="text-sm text-neutral-400 space-y-1 list-disc list-inside">
              <li>Shared prompt + constraints</li>
              <li>Round timer with anti-stall watchdog</li>
              <li>Submission pipeline + live verdict stream</li>
            </ul>
            <p className="text-xs text-neutral-500 pt-1">Current room state: {data.room?.state ?? "mock"}</p>
          </article>
        </section>

        <Link href="/queue" className="text-sm text-neutral-400 underline">
          Back to queue
        </Link>
      </div>
    </main>
  );
}
