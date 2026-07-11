import { Fragment } from "react";

/**
 * Renders admin-authored copy that uses inline `{gold}...{/gold}` and
 * `{red}...{/red}` tags as colored <span>s. Lets non-technical editing
 * (a plain text field) produce the two-tone headline treatment seen
 * throughout the page, without a full rich-text editor.
 *
 * Example input:
 *   "In {gold}3 Simple Steps{/gold} Master High Notes {red}Live!{/red}"
 */
export function Highlight({ text }: { text: string }) {
  const pattern = /\{(gold|red|white)\}(.*?)\{\/\1\}/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>
      );
    }
    const [, tone, content] = match;
    parts.push(
      <span
        key={key++}
        className={
          tone === "gold"
            ? "text-marigold-soft"
            : tone === "white"
              ? "font-semibold text-cream"
              : "text-sindoor"
        }
      >
        {content}
      </span>
    );
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return <>{parts}</>;
}
