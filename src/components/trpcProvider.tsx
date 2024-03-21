"use client";
import { trpc } from "../server/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/trpc`,
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}``

export default Provider;
