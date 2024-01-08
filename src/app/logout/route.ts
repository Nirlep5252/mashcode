export default function GET() {
  return {
    headers: {
      "Set-Cookie": "gh-token=; Path=/; HttpOnly; Max-Age=0",
    },
    body: {
      success: true,
    },
  };
}
