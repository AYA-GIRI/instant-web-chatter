import { Link } from "react-router-dom";
import { Fragment } from "react";

// Parses {{term|search_query}} syntax and renders clickable links to /methods?search=...
// If no pipe, uses term itself as search query
export function GlossaryText({ text }: { text: string }) {
  const regex = /\{\{([^}|]+)\|?([^}]*)\}\}/g;
  const parts: (string | { term: string; query: string })[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({
      term: match[1],
      query: match[2] || match[1],
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <Link
            key={i}
            to={`/methods?search=${encodeURIComponent(part.query)}`}
            className="text-primary underline decoration-dotted underline-offset-4 hover:decoration-solid transition-all"
            title={`Открыть методичку: ${part.query}`}
          >
            {part.term}
          </Link>
        )
      )}
    </>
  );
}
