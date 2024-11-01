import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { db } from '~~/server/db';

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({
      text: z.string().nullish(),
    }))
    .query(async () => {
      const res = await db.query.users.findMany();
      return {
        greeting: res,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
