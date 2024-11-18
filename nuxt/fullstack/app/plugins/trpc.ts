import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client';
import superjson from 'superjson';
import type { AppRouter } from '~~/server/trpc/routers';

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
