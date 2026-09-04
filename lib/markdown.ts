/**
 * Markdown minimal untuk balasan Asisten AI — cukup mendukung yang
 * dikeluarkan model: **tebal**, *miring*, paragraf, list (-/1.), link.
 * SENG AJA tanpa library: output AI terkendali (system prompt), bukan
 * HTML user — jadi tidak butuh sanitizer DOM penuh.
 *
 * Fungsi-fungsi murni (tanpa JSX) agar mudah diuji.
 */

export interface InlineToken {
  type: "text" | "bold" | "italic" | "link";
  text: string;
}

const INLINE_RE = /\*\*(.+?)\*\*|\*(.+?)\*|(https?:\/\/[^\s)]+)/g;

/**
 * Tokenisasi satu baris: pisahkan teks biasa vs **tebal** / *miring* / link.
 */
export function tokenizeInline(input: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let last = 0;
  for (const m of input.matchAll(INLINE_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) tokens.push({ type: "text", text: input.slice(last, idx) });
    if (m[1] !== undefined) tokens.push({ type: "bold", text: m[1] });
    else if (m[2] !== undefined) tokens.push({ type: "italic", text: m[2] });
    else tokens.push({ type: "link", text: m[3] });
    last = idx + m[0].length;
  }
  if (last < input.length) tokens.push({ type: "text", text: input.slice(last) });
  return tokens;
}

export type MarkdownBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] };

const ORDERED_RE = /^\s*\d+[.)]\s+(.*)$/;
const BULLET_RE = /^\s*[-*]\s+(.*)$/;
const LIST_START_RE = /^\s*(\d+[.)]|[-*])\s+/;

/** Parsing paragraf + list dari teks balasan model. */
export function parseMarkdown(input: string): MarkdownBlock[] {
  const lines = input.replace(/\r/g, "").split("\n");
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }

    const orderedM = line.match(ORDERED_RE);
    const bulletM = orderedM ? null : line.match(BULLET_RE);

    if (orderedM || bulletM) {
      const ordered = !!orderedM;
      const re = ordered ? ORDERED_RE : BULLET_RE;
      const items: string[] = [];
      while (i < lines.length && re.test(lines[i])) {
        const m = lines[i].match(re);
        if (m) items.push(m[1].trim());
        i++;
      }
      blocks.push({ kind: "list", ordered, items });
    } else {
      const para: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() &&
        !LIST_START_RE.test(lines[i])
      ) {
        para.push(lines[i].trim());
        i++;
      }
      blocks.push({ kind: "p", text: para.join("\n") });
    }
  }

  return blocks;
}
