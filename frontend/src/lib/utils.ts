import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
 Moving this into a separate function so that
 we can refactor the way we store GitHub access token
*/
export function getGithubAccessToken() {
  return localStorage.getItem("ghToken");
}
