/**
 * One border/focus/invalid treatment shared by input, textarea and select so a
 * form never mixes two field looks.
 */
export const fieldBase =
  "w-full rounded-lg border border-stage-line bg-stage px-3.5 py-2.5 text-sm text-cream placeholder:text-cream-faint outline-none transition-[color,background-color,border-color,box-shadow] " +
  "hover:border-stage-line/80 " +
  "focus:border-marigold focus:ring-4 focus:ring-marigold/15 " +
  "aria-[invalid=true]:border-sindoor aria-[invalid=true]:focus:ring-sindoor/15 " +
  "disabled:cursor-not-allowed disabled:opacity-50";
