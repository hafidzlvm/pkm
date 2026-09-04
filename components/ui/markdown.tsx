"use client";

import * as React from "react";
import { parseMarkdown, tokenizeInline } from "@/lib/markdown";

function inlineNodes(text: string, keyBase: string) {
  const parts = text.split("\n");
  const out: React.ReactNode[] = [];
  parts.forEach((part, pi) => {
    if (pi > 0) out.push(<br key={`${keyBase}-br-${pi}`} />);
    tokenizeInline(part).forEach((t, ti) => {
      const key = `${keyBase}-${pi}-${ti}`;
      if (t.type === "bold") out.push(<strong key={key}>{t.text}</strong>);
      else if (t.type === "italic") out.push(<em key={key}>{t.text}</em>);
      else if (t.type === "link")
        out.push(
          <a
            key={key}
            href={t.text}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-(--color-green-accent) underline-offset-2"
          >
            {t.text}
          </a>
        );
      else out.push(<React.Fragment key={key}>{t.text}</React.Fragment>);
    });
  });
  return out;
}

/**
 * Renderer markdown ringan untuk balasan AI. Bukan HTML user — output
 * model yang terkendali; teks dirender sebagai node React (otomatis
 * di-escape, tanpa dangerouslySetInnerHTML).
 */
export function Markdown({ text }: { text: string }) {
  const blocks = React.useMemo(() => parseMarkdown(text), [text]);
  return (
    <>
      {blocks.map((b, bi) => {
        const k = `b-${bi}`;
        if (b.kind === "p") {
          return <p key={k}>{inlineNodes(b.text, k)}</p>;
        }
        return b.ordered ? (
          <ol key={k}>
            {b.items.map((it, ii) => (
              <li key={`${k}-${ii}`} className="ml-4 list-decimal">
                {inlineNodes(it, `${k}-${ii}`)}
              </li>
            ))}
          </ol>
        ) : (
          <ul key={k}>
            {b.items.map((it, ii) => (
              <li key={`${k}-${ii}`} className="ml-4 list-disc">
                {inlineNodes(it, `${k}-${ii}`)}
              </li>
            ))}
          </ul>
        );
      })}
    </>
  );
}
