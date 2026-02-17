import { and, asc, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/client";
import { duelRoomPlayers, duelRooms, matchmakingQueueEntries } from "@/db/schema";
import { pickMatchPair, queueModeSchema } from "@/domain/matchmaking";
import { getSessionUser } from "@/lib/auth/session";

const joinQueueSchema = z.object({
  mode: queueModeSchema.default("duel_casual"),
});

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db
    .select()
    .from(matchmakingQueueEntries)
    .where(and(eq(matchmakingQueueEntries.userId, user.id), eq(matchmakingQueueEntries.status, "queued")))
    .limit(1);

  return NextResponse.json({ queueEntry: rows[0] ?? null });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await request.json().catch(() => ({}));
  const parsed = joinQueueSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await db
    .select()
    .from(matchmakingQueueEntries)
    .where(and(eq(matchmakingQueueEntries.userId, user.id), eq(matchmakingQueueEntries.status, "queued")))
    .limit(1);

  if (existing[0]) {
    return NextResponse.json({ queueEntry: existing[0], roomId: null });
  }

  const [entry] = await db
    .insert(matchmakingQueueEntries)
    .values({
      userId: user.id,
      mode: parsed.data.mode,
      status: "queued",
    })
    .returning();

  const queued = await db
    .select()
    .from(matchmakingQueueEntries)
    .where(and(eq(matchmakingQueueEntries.mode, parsed.data.mode), eq(matchmakingQueueEntries.status, "queued")))
    .orderBy(asc(matchmakingQueueEntries.joinedAt))
    .limit(10);

  const pair = pickMatchPair(
    queued.map((item) => ({
      entryId: item.id,
      userId: item.userId,
      mode: item.mode,
      joinedAt: item.joinedAt,
    })),
  );

  if (!pair) {
    return NextResponse.json({ queueEntry: entry, roomId: null }, { status: 201 });
  }

  const [room] = await db
    .insert(duelRooms)
    .values({
      createdByUserId: pair[0].userId,
      state: "waiting",
    })
    .returning();

  await db.insert(duelRoomPlayers).values([
    { roomId: room.id, userId: pair[0].userId, slot: 1 },
    { roomId: room.id, userId: pair[1].userId, slot: 2 },
  ]);

  await db
    .update(matchmakingQueueEntries)
    .set({ status: "matched", matchedRoomId: room.id, matchedAt: new Date() })
    .where(inArray(matchmakingQueueEntries.id, [pair[0].entryId, pair[1].entryId]));

  const matchedSelf = pair.find((p) => p.userId === user.id);

  return NextResponse.json(
    {
      queueEntry: matchedSelf ? null : entry,
      roomId: room.id,
      matched: Boolean(matchedSelf),
    },
    { status: 201 },
  );
}

export async function DELETE() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db
    .update(matchmakingQueueEntries)
    .set({ status: "cancelled", cancelledAt: new Date() })
    .where(and(eq(matchmakingQueueEntries.userId, user.id), eq(matchmakingQueueEntries.status, "queued")));

  return NextResponse.json({ ok: true });
}
