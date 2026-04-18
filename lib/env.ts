import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().url('Invalid MongoDB URI'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url('Invalid app URL'),
});

type Env = z.infer<typeof envSchema>;

let validatedEnv: Env | null = null;

export function getEnv(): Env {
  if (validatedEnv) {
    return validatedEnv;
  }

  const env = envSchema.safeParse(process.env);

  if (!env.success) {
    console.error('Invalid environment variables:', env.error.format());
    throw new Error('Invalid environment variables');
  }

  validatedEnv = env.data;
  return validatedEnv;
}
