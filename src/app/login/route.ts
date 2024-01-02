export async function GET() {
  const loginUrl = new URL("https://github.com/login/oauth/authorize");
  loginUrl.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID!);
  loginUrl.searchParams.set(
    "redirect_uri",
    "http://localhost:3000/auth/github",
  );

  return new Response("Redirecting...", {
    status: 302,
    headers: { Location: loginUrl.toString() },
  });
}
