import { db, users } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const ghToken = request.headers.get("Cookie")?.split("gh-token=")?.[1];
  if (!ghToken) {
    return new Response("No gh-token cookie found", { status: 400 });
  }

  const response = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${ghToken}` },
  });
  const data = await response.json();
  if (data.message) {
    return new Response(data.message, { status: 400 });
  }
  const id = Number.parseInt(data.id);
  const user = await db.select().from(users).where(eq(users.id, id));
  if (user.length === 0) {
    await db.insert(users).values({ id, createdAt: new Date() });
  }
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
