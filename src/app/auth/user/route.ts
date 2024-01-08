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
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
