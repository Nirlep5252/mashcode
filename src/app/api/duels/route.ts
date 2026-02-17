import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/client";
import { duels } from "@/db/schema";

const createDuelSchema = z.object({
  title: z.string().min(3).max(120),
  rounds: z.number().int().min(1).max(10).default(1),
});

export async function GET() {
  const rows = await db.select().from(duels).orderBy(desc(duels.createdAt)).limit(20);
  return NextResponse.json({ duels: rows });
}

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = createDuelSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [created] = await db
    .insert(duels)
    .values({
      title: parsed.data.title,
      rounds: parsed.data.rounds,
      status: "open",
    })
    .returning();

  return NextResponse.json({ duel: created }, { status: 201 });
}
