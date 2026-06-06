import { initTRPC } from '@trpc/server';

/**
 * Context creation function for tRPC
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    headers: opts.headers,
  };
};

// Instância única do tRPC — reutilizada por todos os routers e procedures.
const t = initTRPC.context<Awaited<ReturnType<typeof createTRPCContext>>>().create();

// publicProcedure: sem autenticação, adequado para este protótipo sem login.
export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;