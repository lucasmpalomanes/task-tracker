import { createCallerFactory, createTRPCContext } from './init';
import { appRouter } from './routers/_app';
import { headers } from 'next/headers';

const createCaller = createCallerFactory(appRouter);

/**
 * Helper to get a type-safe tRPC caller on the server.
 * This is used inside Server Components, Server Actions, and Route Handlers.
 */
export const getTRPC = async () => {
  const heads = await headers();
  const context = await createTRPCContext({ headers: heads });
  return createCaller(context);
};
