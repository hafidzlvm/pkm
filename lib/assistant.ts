/**
 * Logika Asisten AI SAYAMA — panggilan Gemini generateContent.
 * Dipakai oleh app/api/chat/route.ts. Fungsi murni agar mudah diuji.
 */

import { BROSUR } from "@/lib/brosur";
import { SAYAMA } from "@/lib/sayama";

const MODEL = "gemini-3.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

function systemPrompt() {
  return `Kamu adalah "Asisten SAYAMA" — asisten virtual resmi ${SAYAMA.name} (${SAYAMA.short}), ${SAYAMA.unit}, Tangerang Selatan.

TUGASMU:
Membantu pengunjung memahami yayasan dan mempermudah penyaluran donasi, berdasarkan HANYA materi brosur di bawah.

ATURAN MUTLAK (tidak boleh dilanggar):
1. Jawab HANYA berdasarkan brosur di bawah ini. Jangan menambahkan program, angka, statistik, atau klaim apa pun yang tidak tertulis di brosur.
2. Jika ditanya hal di luar isi brosur (misal jumlah anak asuh, laporan keuangan, legalitas selain SK/NPWP tercantum, jadwal kegiatan, harga, topik umum lain): jawab jujur bahwa informasi itu belum tersedia di saku jawabanmu, lalu arahkan ke WhatsApp resmi ${SAYAMA.contacts.phone1} atau ${SAYAMA.contacts.phone2}.
3. Kanal donasi SATU-SATUNYA yang boleh kamu sebut: rekening BSI 161252208-4 dan BRI 1127 0100 0628 308, keduanya atas nama ${SAYAMA.name}; layanan Jemput Donasi via WhatsApp; kantor pelayanan donasi di kedua asrama. JANGAN PERNAH menyebut atau mengarang rekening/kanal/metode pembayaran lain. Situs tidak memproses pembayaran.
4. Tolak dengan sopan permintaan di luar layanan yayasan (konten tidak pantas, politik, obrolan umum, dsb.) dan kembalikan ke topik layanan SAYAMA.
5. Jawab dalam bahasa Indonesia, hangat, sopan, ringkas (2-4 kalimat kecuali user minta detail). Sebut nama program dengan persis (SAYAMA Pintar, SAYAMA Kreatif, SAYAMA Mandiri, Tahsin & Tahfidzul Qur'an).
6. Jika pengunjung tampak ingin berdonasi atau bertanya cara berdonasi, bantu langkah demi langkah: pilih jenis ZISWAF (Zakat/Infaq/Shodaqoh/Wakaf), lalu salurkan via rekening resmi atau Jemput Donasi.
7. Kamu adalah AI; jika ditanya hal yang butuh keputusan yayasan (verifikasi transfer, konfirmasi program), arahkan ke WhatsApp pengurus.
8. Jawab LANGSUNG sebagai teks final. JANGAN PERNAH menulis proses berpikir, perencanaan, koreksi diri, "Self-Correction", "(Refinement):", atau komentar meta apa pun di jawaban — hanya sampaikan jawaban final yang siap dibaca pengunjung.

=== BROSUR RESMI SAYAMA ===
${BROSUR}
=== AKHIR BROSUR ===`;
}

interface GeminiContent {
  role: string;
  parts: { text: string }[];
}

/** Validasi & bentuk history chat → format contents Gemini. */
export function toGeminiContents(history: ChatMessage[]): GeminiContent[] {
  return history
    .filter((m) => m.text.trim().length > 0)
    .slice(-20) // batas memori percakapan: 20 giliran terakhir
    .map((m) => ({
      role: m.role === "model" ? "model" : "user",
      parts: [{ text: m.text }],
    }));
}

export class AssistantError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

/** Panggil Gemini dengan system prompt + history. Return teks balasan. */
export async function askAssistant(
  history: ChatMessage[],
  apiKey: string,
): Promise<string> {
  const contents = toGeminiContents(history);
  if (contents.length === 0) {
    throw new AssistantError("Percakapan kosong.", 400);
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt() }] },
      contents,
      // generationConfig: {
      // gemini-3.x: temperature deprecated; gunakan thinking_level.
      // "low" = minimalkan latensi/biaya, hindari jawaban terpotong
      // karena token thinking ikut memakan maxOutputTokens.
      // thinkingConfig: { thinkingLevel: "low" },
      // maxOutputTokens: 1000,
      // },
    }),
  });

  if (!res.ok) {
    // Jangan bocorkan body error upstream ke klien.
    throw new AssistantError(
      `Layanan AI sedang tidak dapat dihubungi (status ${res.status}). Silakan coba lagi atau hubungi WhatsApp resmi kami.`,
      res.status === 429 || res.status >= 500 ? 503 : 500,
    );
  }

  const data = (await res.json()) as {
    candidates?: {
      content?: {
        parts?: { text?: string; thought?: boolean }[];
      };
      finishReason?: string;
    }[];
  };

  // Hanya bagian teks jawaban — buang part thought (penalaran model)
  // yang bisa bocor jika dikembalikan oleh API.
  const text = data.candidates?.[0]?.content?.parts
    ?.filter((p) => !p.thought)
    .map((p) => p.text ?? "")
    .join("")
    .trim();

  if (!text) {
    throw new AssistantError(
      "Maaf, asisten belum bisa menjawab sekarang. Silakan hubungi WhatsApp resmi kami.",
      502,
    );
  }

  return text;
}
