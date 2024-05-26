"use client";
 
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
 
 
export function ReactQueryProvider({ children }: {children:React.ReactNode}) {
  const [client] = useState(
    () => 
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000,
            refetchInterval: 60 *1000,
            gcTime: 3 * 1000          
          }
        }
      })
  );
 
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}