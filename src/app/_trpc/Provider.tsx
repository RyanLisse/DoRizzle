"use client";

import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import { baseUrl } from "@/lib/utils";
import { trpc } from "@/app/_trpc/client";

const url = baseUrl();

export function Provider({ children, ...props }: ThemeProviderProps) {
  const [queryClient] = useState(() => new QueryClient({}));

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${url}/api/trpc`,
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider {...props}>
          {children}
          <Toaster />
        </NextThemesProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
