import { db } from '@/db';
import * as schema from '@/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { username } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },
  plugins: [username(), nextCookies()],
  advanced: {
    useSecureCookies: true,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
      },
      aslab_id: {
        type: 'number',
      },
    },
  },
});
