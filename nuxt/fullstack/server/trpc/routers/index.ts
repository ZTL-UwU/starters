import { z } from 'zod';
import { db } from '~~/server/db';
import { users } from '~~/server/db/schema';
import { publicProcedure, router } from '../trpc';

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({
      text: z.string().nullish(),
    }))
    .query(async ({ input }) => {
      const res = await db.query.users.findMany();
      return {
        greeting: input.text,
        users: res,
      };
    }),

  getUsers: publicProcedure
    .query(async () => {
      return await db.query.users.findMany();
    }),

  addUser: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
      age: z.number().int().positive(),
    }))
    .mutation(async ({ input }) => {
      const result = await db.insert(users).values({
        name: input.name,
        email: input.email,
        age: input.age,
      }).returning();
      return result[0];
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
