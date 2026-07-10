import { z } from "zod";

/**
 * Next.js replaces a thrown Server Action error's message with a generic string
 * before it reaches the browser, so a thrown error can never explain itself to
 * the admin. Expected failures travel back as values instead.
 */
export type ActionResult =
  | { ok: true; redirectTo?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/** Postgres SQLSTATE codes we can explain better than the driver does. */
const PG_MESSAGES: Record<string, string> = {
  "23505": "That value is already taken. Pick a different one.",
  "23503": "This is still referenced by another record, so it can't be changed.",
  "23502": "A required field was left empty.",
  "22001": "One of the values is too long for its field.",
  "22P02": "A number field received something that isn't a number.",
};

function pgCode(err: unknown): string | null {
  if (typeof err !== "object" || err === null) return null;
  const code = (err as { code?: unknown }).code;
  return typeof code === "string" ? code : null;
}

/**
 * True when the driver never reached Postgres — a suspended Neon project, a bad
 * DATABASE_URL, or no network. These arrive with no SQLSTATE to interpret.
 */
function isConnectionError(err: unknown): boolean {
  for (let cur: unknown = err, depth = 0; cur && depth < 5; depth++) {
    if (typeof cur !== "object") break;
    const message = (cur as { message?: unknown }).message;
    if (
      typeof message === "string" &&
      (message.includes("fetch failed") || message.includes("Error connecting to database"))
    ) {
      return true;
    }
    cur = (cur as { cause?: unknown }).cause ?? (cur as { sourceError?: unknown }).sourceError;
  }
  return false;
}

/** Names the offending column when Postgres tells us which constraint tripped. */
function constraintField(err: unknown): string | null {
  if (typeof err !== "object" || err === null) return null;
  const constraint = (err as { constraint?: unknown }).constraint;
  if (typeof constraint !== "string") return null;
  // Drizzle/Postgres names unique constraints `<table>_<column>_unique`.
  const match = constraint.match(/^.+?_(.+)_(?:unique|key)$/);
  return match ? match[1] : null;
}

export function fieldErrorsOf(error: z.ZodError): Record<string, string[]> {
  const flat: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (!path) continue;
    (flat[path] ??= []).push(issue.message);
  }
  return flat;
}

/**
 * Turns whatever a query threw into something an admin can act on. Anything we
 * can't explain is logged server-side and reported with its own message rather
 * than a blanket "something went wrong".
 */
export function toActionError(err: unknown, context: string): ActionResult {
  const code = pgCode(err);

  if (code && PG_MESSAGES[code]) {
    const field = constraintField(err);
    const message = PG_MESSAGES[code];
    return {
      ok: false,
      error: field && code === "23505" ? `That ${field} is already in use.` : message,
      fieldErrors: field ? { [field]: [message] } : undefined,
    };
  }

  console.error(`[admin] ${context} failed:`, err);

  if (isConnectionError(err)) {
    return {
      ok: false,
      error: "Can't reach the database. Nothing was saved — check the connection and retry.",
    };
  }

  // Never echo the driver's message: Drizzle embeds the full SQL statement and
  // every bound parameter in it, and this string is sent to the browser.
  const name = err instanceof Error ? err.name : "Error";
  return { ok: false, error: `${context} failed (${name}). The server log has the details.` };
}

/** For mutations with nothing to validate — deletes, active toggles. */
export async function runMutation(
  context: string,
  mutate: () => Promise<void>
): Promise<ActionResult> {
  try {
    await mutate();
    return { ok: true };
  } catch (err) {
    return toActionError(err, context);
  }
}

/**
 * Validates, runs the mutation, and normalises both failure modes. `redirectTo`
 * is returned rather than passed to `redirect()` so the client can show a
 * success toast before it navigates.
 */
export async function runAction<T>(
  schema: z.ZodType<T>,
  values: unknown,
  context: string,
  mutate: (parsed: T) => Promise<{ redirectTo?: string } | void>
): Promise<ActionResult> {
  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Some fields need fixing before this can be saved.",
      fieldErrors: fieldErrorsOf(parsed.error),
    };
  }

  try {
    const result = await mutate(parsed.data);
    return { ok: true, redirectTo: result?.redirectTo };
  } catch (err) {
    return toActionError(err, context);
  }
}
