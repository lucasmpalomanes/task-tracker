import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './routers/_app';

// Cliente tRPC para componentes "use client".
// Diferente do getTRPC() no servidor, aqui as chamadas vão via HTTP
// ao route handler /api/trpc, pois rodam no navegador.
export const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: '/api/trpc',
        }),
    ],
});
