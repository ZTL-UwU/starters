import process from 'node:process';
import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error('[ERROR] Invalid environment variables:', JSON.stringify(envParse.error.format(), null, 4));
  process.exit(1);
}
export const env = envParse.data;
