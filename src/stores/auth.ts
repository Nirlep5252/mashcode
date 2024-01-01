import { create } from "zustand";

interface AuthState {
  github?: {
    token: string;
  };
}

interface AuthActions {}

export const useAuth = create<AuthState & AuthActions>()((set, get) => {
  const authState: AuthState = {};
  const githubTokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("gh-token="));
  if (githubTokenCookie) {
    const githubToken = githubTokenCookie.split("=")[1];
    authState.github = { token: githubToken };
  }

  return authState;
});
