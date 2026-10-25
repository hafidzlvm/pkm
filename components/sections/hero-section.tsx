"use client";

import { HandHeart, Truck, BadgeCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { SAYAMA, waLink, WA_MESSAGES } from "@/lib/sayama";

/**
 * Koordinat medallion dihitung sekali di module scope lalu dibulatkan.
 * Math.cos/Math.sin bisa menghasilkan digit terakhir yang berbeda antara
 * engine server (Node) dan browser, sehingga nilai mentah memicu hydration
 * mismatch. Pembulatan 3 desimal membuat nilainya identik di kedua sisi.
 */
const MEDALLION_DOTS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * Math.PI) / 6;
  return {
    cx: Number((100 + 68 * Math.cos(angle)).toFixed(3)),
    cy: Number((100 + 68 * Math.sin(angle)).toFixed(3)),
  };
});

const MEDALLION_DIAMONDS = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * Math.PI) / 4;
  return {
    x: Number((100 + 88 * Math.cos(angle)).toFixed(3)),
    y: Number((100 + 88 * Math.sin(angle)).toFixed(3)),
  };
});

/**
 * Hero — canvas cream, medallion pola islami, heading blur-rise (Reveal),
 * tagline inti gradient wave (satu-satunya gradient di halaman), trust
 * badge legal mengambang.
 */
export function HeroSection() {
  return (
    <section className="pattern-islamic relative overflow-hidden bg-(--color-canvas-warm)">
      {/* Medallion ornamen — dekorasi berputar sangat lambat */}
      <div
        aria-hidden
        className="spin-slow pointer-events-none absolute -top-24 -right-24 size-[26rem] opacity-60 md:size-[34rem] lg:-right-10"
      >
        <svg viewBox="0 0 200 200" className="size-full" fill="none">
          <circle cx="100" cy="100" r="98" stroke="#1e3a9e" strokeOpacity="0.12" />
          <circle cx="100" cy="100" r="78" stroke="#1e3a9e" strokeOpacity="0.1" />
          <circle cx="100" cy="100" r="58" stroke="#cba258" strokeOpacity="0.18" />
          {MEDALLION_DIAMONDS.map((d, i) => (
            <rect
              key={i}
              x={d.x - 7}
              y={d.y - 7}
              width="14"
              height="14"
              transform={`rotate(45 ${d.x} ${d.y})`}
              stroke="#1e3a9e"
              strokeOpacity="0.14"
            />
          ))}
          {MEDALLION_DOTS.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r="2.5" fill="#cba258" fillOpacity="0.25" />
          ))}
        </svg>
      </div>

      <div className="container-pkm relative grid min-h-svh items-center gap-10 pt-24 pb-16 md:pt-32 lg:grid-cols-[60%_40%]">
        <div className="max-w-2xl space-y-6">
          <Reveal as="h1" className="text-4xl leading-compact tracking-[-0.16px] md:text-5xl lg:text-6xl">
            Mewujudkan Harapan &amp; Cita-Cita{" "}
            <span className="wave-text">Yatim dan Dhu&apos;afa</span>
          </Reveal>
          <Reveal
            as="p"
            delay={150}
            className="max-w-xl text-lg leading-relaxed text-(--color-text-black-soft)"
          >
            {SAYAMA.name} ({SAYAMA.short}) mengasuh, mendidik, dan membina anak-anak
            yatim dan dhu&apos;afa di dua asrama LKSA di Tangerang Selatan — menuju
            generasi yang sehat, cerdas, mandiri, dan mulia.
          </Reveal>
          <Reveal delay={300} className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <a
                href={waLink(SAYAMA.contacts.whatsapp[0].intl, WA_MESSAGES.donation)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <HandHeart className="size-5" aria-hidden />
                Tunaikan Donasi Sekarang
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href={waLink(SAYAMA.contacts.whatsapp[1].intl, WA_MESSAGES.pickup)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Truck className="size-5" aria-hidden />
                Layanan Jemput Donasi
              </a>
            </Button>
          </Reveal>
        </div>

        {/* Kolom trust badges mengambang */}
        <div className="space-y-4 lg:justify-self-end" aria-label="Legalitas resmi">
          <Reveal delay={500} className="float-y">
            <Card className="shadow-card">
              <CardContent className="flex items-center gap-4">
                <ShieldCheck className="size-9 shrink-0 text-(--color-brand-accent)" aria-hidden />
                <div>
                  <p className="text-sm font-semibold">{SAYAMA.legal.skLabel}</p>
                  <p className="text-sm text-(--color-text-black-soft)">
                    {SAYAMA.legal.sk}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={700} className="float-y-slow">
            <Card className="shadow-card">
              <CardContent className="flex items-center gap-4">
                <BadgeCheck className="size-9 shrink-0 text-(--color-brand-accent)" aria-hidden />
                <div>
                  <p className="text-sm font-semibold">NPWP Yayasan</p>
                  <p className="text-sm text-(--color-text-black-soft)">{SAYAMA.legal.npwp}</p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={900}>
            <Card className="shadow-card">
              <CardContent className="flex items-center gap-4">
                <HandHeart className="size-9 shrink-0 text-(--color-gold)" aria-hidden />
                <div>
                  <p className="text-sm font-semibold">Amil ZISWAF</p>
                  <p className="text-sm text-(--color-text-black-soft)">
                    Layanan jujur, amanah &amp; profesional
                  </p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
