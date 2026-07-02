/**
 * Usage: npm run create-admin -- "Your Name" you@example.com "a-strong-password"
 *
 * `disableSignUp: true` in src/lib/auth.ts blocks signUpEmail
 * unconditionally, including this server-side call — so this script
 * builds its own one-off auth instance with sign-up re-enabled, used only
 * here and never exposed over HTTP. Run it once after your first deploy /
 * DB migration.
 */
import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as authSchema from "@/db/auth-schema";

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});

async function main() {
  const [name, email, password] = process.argv.slice(2);

  if (!name || !email || !password) {
    console.error(
      'Usage: npm run create-admin -- "Your Name" you@example.com "a-strong-password"'
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  await auth.api.signUpEmail({
    body: { name, email, password },
  });

  console.log(`✅ Admin account created for ${email}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed to create admin account:", err);
  process.exit(1);
});
