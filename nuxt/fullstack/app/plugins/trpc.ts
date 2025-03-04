import type { AppRouter } from '~~/server/trpc/routers';
import superjson from 'superjson';
import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client';

export default defineNuxtPlugin(() => {
  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
        maxURLLength: 4000,
      }),
    ],
    transformer: superjson,
  });

  return {
    provide: {
      trpc,
    },
  };
});
