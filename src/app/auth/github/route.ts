export async function GET(request: Request) {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const code = searchParams.get("code");
  if (!code) return new Response("No code provided", { status: 400 });

  // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
  const url = new URL("https://github.com/login/oauth/access_token");
  url.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID!);
  url.searchParams.set("client_secret", process.env.GITHUB_CLIENT_SECRET!);
  url.searchParams.set("code", code);
  url.searchParams.set("redirect_uri", request.url.split("?")[0]);
  const response = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  const data = await response.json();

  // store the access token in a cookie
  if (data.access_token) {
    return new Response("Redirecting...", {
      status: 302,
      headers: { Location: "/auth/github/after?token=" + data.access_token },
    });
  } else {
    return new Response("No access token received", { status: 400 });
  }
}
