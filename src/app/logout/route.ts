export function GET() {
  // Remove cookie `gh-token` and redirect to home page
  return new Response(null, {
    headers: {
      "Set-Cookie": "gh-token=; Path=/; HttpOnly; Max-Age=0",
      Location: "/",
    },
    status: 302,
  });
}
