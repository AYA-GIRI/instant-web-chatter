import { useMemo } from "react";
import { Link } from "react-router-dom";

// Renders markdown-like content with support for:
// - Headings (# ## ###)
// - Bold (**text**)
// - Inline code (`code`)
// - Code blocks (```lang ... ```)
// - Blockquotes (> text)
// - Lists (- item, 1. item)
// - Glossary links ({{term|query}})

function parseGlossaryLinks(text: string): (string | { term: string; query: string })[] {
  const regex = /\{\{([^}|]+)\|?([^}]*)\}\}/g;
  const parts: (string | { term: string; query: string })[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({ term: match[1], query: match[2] || match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

function InlineContent({ text }: { text: string }) {
  const glossaryParts = parseGlossaryLinks(text);

  return (
    <>
      {glossaryParts.map((part, i) => {
        if (typeof part !== "string") {
          return (
            <Link
              key={i}
              to={`/methods?search=${encodeURIComponent(part.query)}`}
              className="text-primary underline decoration-dotted underline-offset-4 hover:decoration-solid transition-all"
            >
              {part.term}
            </Link>
          );
        }

        // Bold, inline code
        const segments = part.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
        return segments.map((seg, j) => {
          if (seg.startsWith("**") && seg.endsWith("**")) {
            return <strong key={`${i}-${j}`}>{seg.slice(2, -2)}</strong>;
          }
          if (seg.startsWith("`") && seg.endsWith("`")) {
            return (
              <code key={`${i}-${j}`} className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">
                {seg.slice(1, -1)}
              </code>
            );
          }
          return <span key={`${i}-${j}`}>{seg}</span>;
        });
      })}
    </>
  );
}

export function MarkdownContent({ content }: { content: string }) {
  const elements = useMemo(() => {
    const lines = content.split("\n");
    const result: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks
      if (line.trimStart().startsWith("```")) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        result.push(
          <pre key={result.length} className="bg-muted/80 rounded-lg p-4 overflow-x-auto my-3">
            <code className="text-sm font-mono text-foreground">
              {codeLines.join("\n")}
            </code>
          </pre>
        );
        continue;
      }

      // Headings
      if (line.startsWith("# ")) {
        result.push(
          <h1 key={result.length} className="text-2xl font-bold text-foreground mt-6 mb-3 font-heading">
            <InlineContent text={line.slice(2)} />
          </h1>
        );
        i++;
        continue;
      }
      if (line.startsWith("## ")) {
        result.push(
          <h2 key={result.length} className="text-xl font-bold text-foreground mt-5 mb-2 font-heading">
            <InlineContent text={line.slice(3)} />
          </h2>
        );
        i++;
        continue;
      }
      if (line.startsWith("### ")) {
        result.push(
          <h3 key={result.length} className="text-lg font-semibold text-foreground mt-4 mb-2 font-heading">
            <InlineContent text={line.slice(4)} />
          </h3>
        );
        i++;
        continue;
      }

      // Blockquotes
      if (line.startsWith("> ")) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].startsWith("> ")) {
          quoteLines.push(lines[i].slice(2));
          i++;
        }
        result.push(
          <blockquote
            key={result.length}
            className="border-l-4 border-primary/40 pl-4 py-2 my-3 text-muted-foreground italic"
          >
            <InlineContent text={quoteLines.join(" ")} />
          </blockquote>
        );
        continue;
      }

      // Unordered lists
      if (line.match(/^- /)) {
        const items: string[] = [];
        while (i < lines.length && lines[i].match(/^- /)) {
          items.push(lines[i].slice(2));
          i++;
        }
        result.push(
          <ul key={result.length} className="list-disc list-inside space-y-1 my-2 text-foreground">
            {items.map((item, idx) => (
              <li key={idx}>
                <InlineContent text={item} />
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Ordered lists
      if (line.match(/^\d+\.\s/)) {
        const items: string[] = [];
        while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
          items.push(lines[i].replace(/^\d+\.\s/, ""));
          i++;
        }
        result.push(
          <ol key={result.length} className="list-decimal list-inside space-y-1 my-2 text-foreground">
            {items.map((item, idx) => (
              <li key={idx}>
                <InlineContent text={item} />
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // Empty lines
      if (line.trim() === "") {
        i++;
        continue;
      }

      // Regular paragraph
      result.push(
        <p key={result.length} className="text-foreground leading-relaxed my-2">
          <InlineContent text={line} />
        </p>
      );
      i++;
    }

    return result;
  }, [content]);

  return <div className="space-y-1">{elements}</div>;
}
