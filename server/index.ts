import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './appRouter';

const server = createHTTPServer({
    router: appRouter,
});

server.listen(3000);

console.log('Server running on http://localhost:3000');