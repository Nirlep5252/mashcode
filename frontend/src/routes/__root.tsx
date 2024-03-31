import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import React, { useEffect, useMemo } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const RootComponent: React.FC = () => {
  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.has("error")) {
      toast.error(url.searchParams.get("error")!);
    }
    if (url.searchParams.has("access_token")) {
      window.localStorage.setItem(
        "ghToken",
        url.searchParams.get("access_token")!
      );
      url.searchParams.delete("access_token");
      window.location.href = url.toString();
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <div className="w-[70%] min-h-screen pt-4 mx-auto">
          <Navbar />
          <Outlet />
          <Toaster />
          <TanStackRouterDevtools />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
