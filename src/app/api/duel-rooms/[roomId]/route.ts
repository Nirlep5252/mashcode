import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { duelRoomPlayers, duelRooms, users } from "@/db/schema";

type RouteContext = {
  params: Promise<{ roomId: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { roomId } = await context.params;

  const roomRows = await db.select().from(duelRooms).where(eq(duelRooms.id, roomId)).limit(1);
  const room = roomRows[0];

  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  const players = await db
    .select({
      userId: duelRoomPlayers.userId,
      slot: duelRoomPlayers.slot,
      ready: duelRoomPlayers.ready,
      handle: users.handle,
    })
    .from(duelRoomPlayers)
    .innerJoin(users, eq(duelRoomPlayers.userId, users.id))
    .where(and(eq(duelRoomPlayers.roomId, roomId)));

  return NextResponse.json({ room, players });
}
