"use client";

import React from "react";
import ThemeProvider from "./theme/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
