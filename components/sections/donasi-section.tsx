"use client";

import * as React from "react";
import { Check, Copy, Landmark, Truck, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SAYAMA, BANKS, ZISWAF_TABS, waLink, WA_MESSAGES } from "@/lib/sayama";

/**
 * Donasi & ZISWAF Hub — surface kepercayaan tertinggi di canvas cream.
 * Tab ZISWAF + kartu rekening resmi (salin sekali klik) + jemput donasi.
 */
export function DonasiSection() {
  const [tab, setTab] = React.useState<string>(ZISWAF_TABS[0].id);
  const [copied, setCopied] = React.useState<string | null>(null);
  const active = ZISWAF_TABS.find((t) => t.id === tab) ?? ZISWAF_TABS[0];

  async function copyAccount(bank: string, account: string) {
    try {
      await navigator.clipboard.writeText(account.replace(/\s|-/g, ""));
      setCopied(bank);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // clipboard diblok? tidak fatal — nomor tetap terlihat untuk salin manual
      setCopied(null);
    }
  }

  return (
    <section id="donasi" className="bg-(--color-canvas-warm) py-16 md:py-24">
      <div className="container-pkm space-y-10">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl tracking-[-0.16px] md:text-4xl">
            Kanal Donasi &amp; Layanan ZISWAF
          </h2>
          <p className="text-lg leading-relaxed text-(--color-text-black-soft)">
            Menunaikan Zakat, Infaq, Shodaqoh, dan Wakaf melalui yayasan resmi —
            diterima dan didistribusikan kepada mustahik yang berhak.
          </p>
        </div>

        {/* Tab ZISWAF */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Jenis layanan ZISWAF"
        >
          {ZISWAF_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`press cursor-pointer rounded-(--radius-pill) border px-5 py-2 text-sm font-semibold ${
                tab === t.id
                  ? "border-(--color-green-accent) bg-(--color-green-accent) text-white"
                  : "border-(--color-input-border) bg-white text-(--color-text-black) hover:border-(--color-green-accent)"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="max-w-2xl text-(--color-text-black-soft)">{active.desc}</p>

        {/* Rekening + jemput donasi */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {BANKS.map((b) => (
              <Card key={b.bank} className="shadow-card">
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Landmark className="size-8 text-(--color-green-accent)" aria-hidden />
                    <div>
                      <p className="text-lg font-semibold">{b.bank}</p>
                      <p className="text-xs text-(--color-text-black-soft)">{b.bankLong}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold tracking-tight text-(--color-green-starbucks)">
                    {b.account}
                  </p>
                  <p className="text-sm text-(--color-text-black-soft)">a.n. {b.holder}</p>
                  <Button
                    variant={copied === b.bank ? "black" : "outline"}
                    size="sm"
                    onClick={() => copyAccount(b.bank, b.account)}
                    aria-live="polite"
                  >
                    {copied === b.bank ? (
                      <>
                        <Check className="size-4" aria-hidden />
                        Nomor tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" aria-hidden />
                        Salin nomor rekening
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Jemput donasi */}
          <Card className="on-dark bg-(--color-green-house) shadow-card">
            <CardContent className="flex h-full flex-col gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-(--color-green-accent)">
                <Truck className="size-6 text-white" aria-hidden />
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.16px] text-white">
                  Jemput Donasi
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-(--color-text-white-soft)">
                  Tim kami menjangkau lokasi Anda untuk menerima penunaian ZISWAF
                  dan donasi lainnya.
                </p>
              </div>
              <div className="mt-auto space-y-2">
                {SAYAMA.contacts.whatsapp.map((wa) => (
                  <Button key={wa.intl} variant="inverted" size="sm" className="w-full" asChild>
                    <a
                      href={waLink(wa.intl, WA_MESSAGES.pickup)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="size-4" aria-hidden />
                      {wa.value}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
