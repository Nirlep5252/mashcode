import { Verdict } from "@/types/submission";
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

export function verdictToString(verdict: Verdict) {
  switch (verdict) {
    case Verdict.InQueue:
      return "In Queue";
    case Verdict.Processing:
      return "Processing";
    case Verdict.Accepted:
      return "Accepted";
    case Verdict.WrongAnswer:
      return "Wrong Answer";
    case Verdict.TLE:
      return "Time Limit Exceeded";
    case Verdict.CompilationError:
      return "Compilation Error";
    case Verdict.RuntimeErrorSIGSEGV:
      return "Runtime Error (SIGSEGV)";
    default:
      return "Unknown";
  }
}
