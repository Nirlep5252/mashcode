import { randomBytes, createHash } from "node:crypto";
import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "@/db/client";
import { authSessions, users } from "@/db/schema";

const COOKIE_NAME = "mc_session";
const SESSION_TTL_DAYS = 30;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getExpiryDate() {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_TTL_DAYS);
  return expiresAt;
}

export async function createLocalSession(handle: string) {
  const normalizedHandle = handle.trim().toLowerCase();

  const existing = await db.select().from(users).where(eq(users.handle, normalizedHandle)).limit(1);

  const user =
    existing[0] ??
    (
      await db
        .insert(users)
        .values({ handle: normalizedHandle })
        .returning()
        .then((rows) => rows[0])
    );

  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = getExpiryDate();

  await db.insert(authSessions).values({
    userId: user.id,
    tokenHash,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  return { user };
}

export async function clearSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token) {
    await db.delete(authSessions).where(eq(authSessions.tokenHash, hashToken(token)));
  }

  cookieStore.delete(COOKIE_NAME);
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const now = new Date();

  const rows = await db
    .select({
      sessionId: authSessions.id,
      userId: users.id,
      handle: users.handle,
      createdAt: users.createdAt,
    })
    .from(authSessions)
    .innerJoin(users, eq(authSessions.userId, users.id))
    .where(and(eq(authSessions.tokenHash, tokenHash), gt(authSessions.expiresAt, now)))
    .limit(1);

  const row = rows[0];

  if (!row) {
    cookieStore.delete(COOKIE_NAME);
    return null;
  }

  await db.update(authSessions).set({ lastSeenAt: now }).where(eq(authSessions.id, row.sessionId));

  return {
    id: row.userId,
    handle: row.handle,
    createdAt: row.createdAt,
  };
}
