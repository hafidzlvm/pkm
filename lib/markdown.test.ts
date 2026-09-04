import { parseMarkdown, tokenizeInline } from "./markdown";
import assert from "node:assert";

// tokenize: bold **
assert.deepStrictEqual(tokenizeInline("hubungi **0812-9420-9443** ini"), [
  { type: "text", text: "hubungi " },
  { type: "bold", text: "0812-9420-9443" },
  { type: "text", text: " ini" },
]);

// tokenize: italic
assert.deepStrictEqual(tokenizeInline("ini *miring*"), [
  { type: "text", text: "ini " },
  { type: "italic", text: "miring" },
]);

// tokenize: link + teks sekitar
assert.deepStrictEqual(tokenizeInline("lihat https://example.com oke"), [
  { type: "text", text: "lihat " },
  { type: "link", text: "https://example.com" },
  { type: "text", text: " oke" },
]);

// parse: paragraf + list bullet + paragraf
const blocks = parseMarkdown(
  "Kami siap membantu.\n\n- Zakat\n- Infaq\n- Shodaqoh\n\nHubungi kami."
);
assert.strictEqual(blocks.length, 3);
assert.deepStrictEqual(blocks[0], { kind: "p", text: "Kami siap membantu." });
assert.deepStrictEqual(blocks[1], {
  kind: "list",
  ordered: false,
  items: ["Zakat", "Infaq", "Shodaqoh"],
});
assert.deepStrictEqual(blocks[2], { kind: "p", text: "Hubungi kami." });

// parse: list bernomor
const ordered = parseMarkdown("1. Pertama\n2. Kedua");
assert.deepStrictEqual(ordered[0], {
  kind: "list",
  ordered: true,
  items: ["Pertama", "Kedua"],
});

// parse: list item berisi bold → tetap satu item (inline diproses terpisah)
const boldItem = parseMarkdown("- layanan **Jemput Donasi**");
assert.deepStrictEqual(boldItem[0], {
  kind: "list",
  ordered: false,
  items: ["layanan **Jemput Donasi**"],
});

console.log("markdown parser: semua cek lolos");
