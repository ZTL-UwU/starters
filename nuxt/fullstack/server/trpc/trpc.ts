import type { Context } from './context';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

const t = initTRPC.context<Context>().create({
  transformer: superjson,

  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.errors
            : null,
      },
    };
  },
});

/**
 * Unprotected procedure
 */
export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;
