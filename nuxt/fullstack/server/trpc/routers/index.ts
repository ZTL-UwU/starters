import { z } from 'zod';
import { db } from '~~/server/db';
import { publicProcedure, router } from '../trpc';

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
