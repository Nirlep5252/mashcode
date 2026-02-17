import { NextResponse } from "next/server";
import { z } from "zod";
import { clearSession, createLocalSession, getSessionUser } from "@/lib/auth/session";

const signInSchema = z.object({
  handle: z
    .string()
    .trim()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, "Handle can only contain letters, numbers, and underscores"),
});

export async function GET() {
  const user = await getSessionUser();
  return NextResponse.json({ user });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = signInSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { user } = await createLocalSession(parsed.data.handle);
  return NextResponse.json({ user }, { status: 201 });
}

export async function DELETE() {
  await clearSession();
  return NextResponse.json({ ok: true });
}
