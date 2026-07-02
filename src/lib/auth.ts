import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as authSchema from "@/db/auth-schema";

/**
 * Admin-only auth. There is no public sign-up route rendered anywhere in
 * the app — accounts are created via `npm run create-admin` (see
 * scripts/create-admin.ts). Email/password is enough for a single
 * solo-operator admin panel; add a plugin here later if you need more.
 */
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true, // accounts are provisioned via script, not the UI
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});
