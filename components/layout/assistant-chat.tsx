"use client";

import * as React from "react";
import {
  Bot,
  X,
  SendHorizonal,
  MessageCircle,
  User,
  LoaderCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/ui/markdown";
import { SAYAMA, waLink, WA_MESSAGES } from "@/lib/sayama";

interface Msg {
  role: "user" | "model";
  text: string;
}

const GREETING: Msg = {
  role: "model",
  text: "Assalamu'alaikum! Saya Asisten SAYAMA. Tanyakan apa saja tentang yayasan, program SAYAMA Pintar/Kreatif/Mandiri, Tahsin & Tahfidz, atau cara menyalurkan donasi ZISWAF.",
};

const QUICK_PROMPTS = [
  "Cara berdonasi?",
  "Apa itu SAYAMA Pintar?",
  "Alamat asrama?",
  "Jemput donasi",
];

/**
 * Widget Asisten AI mengambang — menggantikan bubble Frap WhatsApp.
 * AI untuk pertanyaan; WhatsApp tetap tersedia sebagai eskalasi manusia.
 */
export function AssistantChat() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Msg[]>([GREETING]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Auto-scroll ke pesan terbaru
  React.useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  // Fokus input saat dibuka
  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;

    const history = [...messages, { role: "user" as const, text: q }];
    setMessages([...history, { role: "model", text: "" }]); // placeholder balasan
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        data.reply ??
        data.error ??
        "Maaf, asisten sedang tidak dapat dihubungi. Silakan hubungi WhatsApp resmi kami.";
      setMessages([...history, { role: "model", text: reply }]);
    } catch {
      setMessages([
        ...history,
        {
          role: "model",
          text: "Koneksi terganggu. Silakan coba lagi atau hubungi WhatsApp resmi kami.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Tombol mengambang (slot Frap) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup asisten SAYAMA" : "Buka asisten SAYAMA"}
        aria-expanded={open}
        className="press fixed right-4 bottom-4 z-50 flex size-14 cursor-pointer items-center justify-center rounded-full bg-(--color-green-accent) text-white shadow-frap hover:bg-(--color-green-starbucks) md:right-6 md:bottom-6"
      >
        {open ? (
          <X className="size-6" aria-hidden />
        ) : (
          <Bot className="size-6" aria-hidden />
        )}
      </button>

      {/* Panel chat */}
      <div
        aria-hidden={!open}
        className={cn(
          "fixed right-4 bottom-20 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-(--radius-card) bg-white shadow-card transition-all duration-300 ease-(--ease-out-expo) md:right-6 md:bottom-24",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        )}
        role="dialog"
        aria-label="Asisten SAYAMA"
      >
        {/* Header */}
        <div className="on-dark bg-(--color-green-house) p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-(--color-green-accent)">
              <Bot className="size-5 text-white" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="font-semibold text-white">Asisten SAYAMA</p>
              <p className="text-xs text-(--color-text-white-soft)">
                Asisten virtual {SAYAMA.name}
              </p>
            </div>
          </div>
        </div>

        {/* Daftar pesan */}
        <div
          ref={listRef}
          className="flex max-h-80 min-h-48 flex-col gap-3 overflow-y-auto bg-(--color-ceramic) p-4"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "flex items-end gap-2",
                m.role === "user" ? "flex-row-reverse" : ""
              )}
            >
              {m.role === "model" && (
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-(--color-green-starbucks)">
                  <Bot className="size-4 text-white" aria-hidden />
                </span>
              )}
              {m.role === "model" ? (
                <div
                  className={cn(
                    "max-w-[85%] space-y-1 rounded-(--radius-card) bg-white px-3.5 py-2.5 text-sm leading-normal text-(--color-text-black) shadow-card",
                    !m.text && "flex min-h-9 items-center"
                  )}
                >
                  {m.text ? (
                    <Markdown text={m.text} />
                  ) : (
                    <LoaderCircle className="size-4 animate-spin" aria-label="Mengetik" />
                  )}
                </div>
              ) : (
                <p
                  className={cn(
                    "max-w-[85%] rounded-(--radius-card) bg-(--color-green-accent) px-3.5 py-2.5 text-sm leading-normal text-white",
                    "whitespace-pre-wrap"
                  )}
                >
                  {m.text}
                </p>
              )}
              {m.role === "user" && (
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-(--color-gold)">
                  <User className="size-4 text-white" aria-hidden />
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Prompt cepat */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 bg-(--color-ceramic) px-4 pb-3">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => send(p)}
                className="press cursor-pointer rounded-(--radius-pill) border-1 border-(--color-input-border) bg-white px-3 py-1.5 text-xs font-semibold text-(--color-text-black) hover:border-(--color-green-accent)"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Akses manusia */}
        <a
          href={waLink(SAYAMA.contacts.whatsapp[0].intl, WA_MESSAGES.info)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-t border-(--color-hairline) bg-white py-2.5 text-xs font-semibold text-(--color-green-accent) hover:bg-(--color-ceramic)"
        >
          <MessageCircle className="size-4" aria-hidden />
          Ngobrol dengan pengurus via WhatsApp
        </a>

        {/* Input */}
        <form
          className="flex items-center gap-2 border-t border-(--color-hairline) bg-white p-3"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pertanyaan…"
            aria-label="Pertanyaan untuk asisten"
            className="min-w-0 flex-1 rounded-(--radius-pill) border-1 border-(--color-input-border) px-4 py-2.5 text-sm text-(--color-text-black) placeholder:text-(--color-text-black-soft) focus:border-(--color-green-accent) focus:outline-none"
            maxLength={500}
            disabled={busy}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Kirim pertanyaan"
            className="press flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-(--color-green-accent) text-white disabled:opacity-40"
          >
            <SendHorizonal className="size-5" aria-hidden />
          </button>
        </form>
      </div>
    </>
  );
}
