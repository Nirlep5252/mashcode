import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import React, { useEffect, useMemo } from "react";

const RootComponent: React.FC = () => {
  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.has("error")) {
      // TODO: use sonner for toast
    }
    if (url.searchParams.has("access_token")) {
      window.localStorage.setItem(
        "ghToken",
        url.searchParams.get("access_token")!
      );
      url.searchParams.delete("access_token");
      // window.history.replaceState({}, "", url.toString());
      window.location.href = url.toString();
    }
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div className="w-[70%] min-h-screen pt-4 mx-auto">
          <Navbar />
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export const Route = new RootRoute({
  component: RootComponent,
});
