import { NextRequest, NextResponse } from "next/server";
import { askAssistant, AssistantError, type ChatMessage } from "@/lib/assistant";

export const runtime = "nodejs";

/** Rate limit sederhana per IP (memori, cukup untuk skala yayasan). */
const WINDOW_MS = 60_000;
const MAX_REQ = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_REQ) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

function parseHistory(body: unknown): ChatMessage[] | null {
  if (typeof body !== "object" || body === null) return null;
  const { messages } = body as { messages?: unknown };
  if (!Array.isArray(messages) || messages.length === 0) return null;
  if (messages.length > 40) return null;

  const history: ChatMessage[] = [];
  for (const m of messages) {
    if (typeof m !== "object" || m === null) return null;
    const role = (m as { role?: unknown }).role;
    const text = (m as { text?: unknown }).text;
    if (typeof text !== "string" || text.length > 2000) return null;
    if (role !== "user" && role !== "model") return null;
    history.push({ role, text });
  }
  return history;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Asisten belum dikonfigurasi (API key tidak tersedia)." },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "lokal";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Mohon tunggu sebentar." },
      { status: 429 }
    );
  }

  let history: ChatMessage[] | null;
  try {
    history = parseHistory(await req.json());
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }
  if (!history) {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }

  try {
    const reply = await askAssistant(history, apiKey);
    return NextResponse.json({ reply });
  } catch (err) {
    if (err instanceof AssistantError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("chat route error:", err);
    return NextResponse.json(
      {
        error:
          "Maaf, terjadi kendala. Silakan coba lagi atau hubungi WhatsApp resmi kami.",
      },
      { status: 500 }
    );
  }
}
