import { createCallerFactory, createTRPCContext } from './init';
import { appRouter } from './routers/_app';
import { headers } from 'next/headers';

const createCaller = createCallerFactory(appRouter);

/**
 * Caller tRPC para o servidor.
 * Usado em Server Components para chamar procedures diretamente,
 * sem passar pelo endpoint HTTP /api/trpc.
 */
export const getTRPC = async () => {
  const heads = await headers();
  const context = await createTRPCContext({ headers: heads });
  return createCaller(context);
};
