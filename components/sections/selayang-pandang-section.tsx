"use client";

import * as React from "react";
import { Quote, Scale, Stamp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { WordStagger } from "@/components/motion/reveal";
import { SAYAMA } from "@/lib/sayama";

const SPLAYANG =
  "Yayasan Sahabat Yatim Mandiri adalah lembaga sosial yang membantu anak-anak dengan keterbatasan sosial ekonomi, baik statusnya yatim maupun dhu'afa. Keadaan yang mereka alami sangat berat dan tidak bisa dipikul sendirian — karena itu kita wajib peduli pada keberlangsungan hidup mereka. Bersama SAYAMA, para dermawan berpartisipasi mewujudkan harapan dan cita-cita mereka, memenuhi kebutuhan hidup serta keberlangsungan pendidikan.";

const HIGHLIGHTS = ["peduli", "harapan", "cita-cita", "pendidikan"];

const VISI =
  "Terwujudnya anak-anak yatim dan dhu'afa yang terdidik, kreatif, berakhlak mulia dan mandiri.";

const MISI = [
  "Mewujudkan anak-anak yatim dan dhu'afa yang sejahtera.",
  "Menghantarkan mereka menjadi generasi yang membanggakan, dengan pendidikan berkualitas serta berakhlak mulia.",
  "Menjadi amil Zakat, Infaq, Shodaqoh, dan Wakaf dengan layanan yang jujur, amanah, dan profesional.",
];

const DASAR = [
  {
    label: "Qur'an Surat Al-Ma'un ayat 1–3",
    text: "Tahukah kamu orang-orang yang mendustakan agama? Yaitu orang-orang yang menghardik anak yatim, dan tidak mendorong untuk memberi makan anak yatim.",
  },
  {
    label: "UUD Pasal 34 ayat 1",
    text: "Faqir miskin dan anak terlantar dipelihara oleh negara.",
  },
  {
    label: "UUD No. 23 Tahun 2002",
    text: "Tentang perlindungan anak.",
  },
  {
    label: "UUD No. 6 Tahun 1974",
    text: "Tentang penyelenggaraan jaminan sosial.",
  },
];

/**
 * Selayang Pandang — putih; narasi word-stagger, callout QS Al-Ma'un
 * (momen gold), visi-misi + seal yayasan.
 */
export function SelayangPandangSection() {
  const [tab, setTab] = React.useState<"visi-misi" | "dasar">("visi-misi");

  return (
    <section id="selayang-pandang" className="bg-white py-16 md:py-24">
      <div className="container-pkm space-y-10">
        <div className="grid gap-8 lg:grid-cols-[64%_36%] lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl tracking-[-0.16px] md:text-4xl">Selayang Pandang</h2>
            <WordStagger
              text={SPLAYANG}
              highlight={HIGHLIGHTS}
              className="text-lg leading-relaxed text-(--color-text-black-soft)"
            />
          </div>

          {/* Callout QS Al-Ma'un — momen sakral gold */}
          <Card className="border border-(--color-gold)/30 bg-(--color-gold-lightest) shadow-card">
            <CardContent className="space-y-3">
              <Quote className="size-7 text-(--color-gold)" aria-hidden />
              <p className="scripture text-base text-(--color-rewards-green)">
                &ldquo;Tahukah kamu orang-orang yang mendustakan agama? Yaitu
                orang-orang yang menghardik anak yatim, dan tidak mendorong untuk
                memberi makan anak yatim.&rdquo;
              </p>
              <p className="text-xs font-semibold tracking-(--tracking-loose) uppercase text-(--color-text-black-soft)">
                QS Al-Ma&apos;un: 1–3
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Visi-Misi / Dasar Pemikiran */}
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              ["visi-misi", "Visi & Misi"],
              ["dasar", "Dasar Pemikiran"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-pressed={tab === id}
              className={`press rounded-(--radius-pill) border px-5 py-2 text-sm font-semibold cursor-pointer ${
                tab === id
                  ? "border-(--color-green-accent) bg-(--color-green-accent) text-white"
                  : "border-(--color-input-border) bg-white text-(--color-text-black) hover:border-(--color-green-accent)"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "visi-misi" ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Visi + seal */}
            <Card className="on-dark relative overflow-hidden bg-(--color-green-house) shadow-card">
              <CardContent className="space-y-4">
                <h3 className="text-sm font-semibold tracking-(--tracking-loose) uppercase text-white">
                  Visi
                </h3>
                <p className="scripture text-xl text-white">
                  {VISI.split(" ").map((w, i) =>
                    ["terdidik,", "kreatif,", "berakhlak", "mulia", "mandiri."].includes(w) ? (
                      <span key={`${w}-${i}`} className="shimmer-term-dark">
                        {w}{" "}
                      </span>
                    ) : (
                      <span key={`${w}-${i}`}>{w} </span>
                    )
                  )}
                </p>
                {/* Seal resmi yayasan */}
                <div className="flex items-center gap-3 pt-2 text-(--color-text-white-soft)">
                  <Stamp className="size-8 shrink-0 text-(--color-gold)" aria-hidden />
                  <div className="text-xs leading-relaxed">
                    <p className="font-semibold text-white">{SAYAMA.name}</p>
                    <p>
                      {SAYAMA.legal.skLabel}: {SAYAMA.legal.sk}
                    </p>
                    <p>NPWP: {SAYAMA.legal.npwp}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Misi 3 poin */}
            <div className="space-y-4">
              {MISI.map((m, i) => (
                <Card key={i} className="shadow-card">
                  <CardContent className="flex items-start gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--color-green-light) text-sm font-bold text-(--color-green-starbucks)">
                      {i + 1}
                    </span>
                    <p className="leading-relaxed text-(--color-text-black)">{m}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {DASAR.map((d) => (
              <Card key={d.label} className="shadow-card">
                <CardContent className="flex items-start gap-3">
                  <Scale className="mt-0.5 size-6 shrink-0 text-(--color-green-accent)" aria-hidden />
                  <div>
                    <p className="font-semibold">{d.label}</p>
                    <p className="text-sm leading-relaxed text-(--color-text-black-soft)">
                      {d.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
