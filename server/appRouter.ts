import { publicProcedure, router } from './trpc';
import { z } from 'zod';

export const appRouter = router({
    greeting: publicProcedure
        .input(z.object({ name: z.string().min(3, 'Name must be at least 3 characters long') }))
        .query((opts) => {
            return { message: `Hello, ${opts.input.name}!` };
        })
});

export type AppRouter = typeof appRouter;