"use client";

import * as React from "react";
import { HomeIcon, GraduationCap, HeartHandshake } from "lucide-react";

const HADITS_PENGASUHAN =
  "Dari Anas bin Malik, Rasulullah bersabda: siapa yang memelihara dua anak gadis kecil hingga dewasa, maka aku akan datang bersamanya pada hari kiamat, seraya menunjukkan kedua jariku (sedekat dua jari).";

const PILLAR_2 = [
  {
    name: "SAYAMA Pintar",
    desc: "Gratis sekolah untuk yatim dan dhu'afa yang mukim, serta beasiswa bagi anak yatim dhu'afa non-mukim yang berprestasi.",
  },
  {
    name: "SAYAMA Kreatif",
    desc: "Pembinaan Character Building dan Life Skill bagi anak yatim & dhu'afa, mukim maupun non-mukim, yang siap belajar dan ingin mengubah Indonesia untuk lebih maju.",
  },
  {
    name: "SAYAMA Mandiri",
    desc: "Pembinaan khusus membentuk mental mandiri lewat pelatihan life skill — sembilan karakter utama di bawah.",
  },
  {
    name: "Tahsin & Tahfidzul Qur'an",
    desc: "Perbaikan bacaan Al-Qur'an sesuai tajwid, dan program hafalan dengan target yang ditetapkan yayasan.",
  },
];

const INDIKATOR_MANDIRI = [
  "Rasa tanggung jawab",
  "Mampu bekerja sendiri",
  "Sikap kreatif",
  "Menguasai keterampilan sesuai bidang kerja",
  "Menghargai waktu",
  "Terampil menyelesaikan persoalan",
  "Puas dengan pekerjaannya",
  "Percaya diri",
  "Mampu melayani diri sendiri",
];

const PILLAR_3 = [
  {
    name: "Santunan Pendidikan",
    desc: "Bantuan biaya pendidikan bagi anak yatim & dhu'afa, baik yang mukim maupun non-mukim.",
  },
  {
    name: "Santunan Janda & Lansia",
    desc: "Santunan rutin untuk janda dan lansia yang sudah tidak produktif.",
  },
  {
    name: "Bakti Sosial",
    desc: "Bantuan kemanusiaan akibat bencana alam dan musibah lainnya.",
  },
];

/**
 * Program unggulan — 3 kartu stacking sticky-scroll di atas band
 * House Green. Kartu berikutnya menimpa kartu sebelumnya.
 */
export function ProgramSection() {
  return (
    <section id="program" className="on-dark bg-(--color-green-house) py-16 md:py-24">
      <div className="container-pkm">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl tracking-[-0.16px] md:text-4xl">Pilar Program Unggulan</h2>
          <p className="text-lg leading-relaxed text-(--color-text-white-soft)">
            Mewujudkan visi dan misi SAYAMA melalui tiga pilar — pengasuhan,
            pendidikan &amp; Qur&apos;an, serta santunan dan bakti sosial.
          </p>
        </div>

        <div className="mt-10 space-y-8 md:space-y-12">
          <StackCard
            icon={<HomeIcon className="size-8 text-white" aria-hidden />}
            kicker="Pilar 1"
            title="Pengasuhan"
            desc="Asrama LKSA Yatim & Dhu'afa — anak-anak di asuh, dididik, dan dibina untuk membentuk pribadi yang cerdas, kreatif, jujur, mandiri, dan berakhlak mulia."
          >
            <blockquote className="scripture border-l-1 border-(--color-gold) pl-4 text-base text-white">
              {HADITS_PENGASUHAN}
              <footer className="mt-2 text-xs font-semibold tracking-(--tracking-loose) uppercase not-italic text-(--color-gold)">
                HR. Muslim — keutamaan mengasuh anak yatim
              </footer>
            </blockquote>
          </StackCard>

          <StackCard
            icon={<GraduationCap className="size-8 text-white" aria-hidden />}
            kicker="Pilar 2"
            title="Pendidikan & Qur'an"
            desc="Menjunjung nilai pendidikan umum dan agama sebagai dasar pribadi dinamis dan berbudi luhur."
          >
            <ul className="grid gap-3 md:grid-cols-2">
              {PILLAR_2.map((p) => (
                <li
                  key={p.name}
                  className="rounded-(--radius-card) bg-white/10 p-4 ring-1 ring-white/15"
                >
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-(--color-text-white-soft)">
                    {p.desc}
                  </p>
                </li>
              ))}
            </ul>
            <CardMandiri />
          </StackCard>

          <StackCard
            icon={<HeartHandshake className="size-8 text-white" aria-hidden />}
            kicker="Pilar 3"
            title="Santunan & Baksos"
            desc="Menjangkau dhu'afa di luar asrama: santunan pendidikan, janda & lansia, dan tanggap bencana."
          >
            <ul className="space-y-3">
              {PILLAR_3.map((p) => (
                <li
                  key={p.name}
                  className="rounded-(--radius-card) bg-white/10 p-4 ring-1 ring-white/15"
                >
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-(--color-text-white-soft)">
                    {p.desc}
                  </p>
                </li>
              ))}
            </ul>
          </StackCard>
        </div>
      </div>
    </section>
  );
}

function StackCard({
  icon,
  kicker,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode;
  kicker: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <article className="stack-item">
      <div className="rounded-(--radius-card) bg-(--color-green-uplift) p-6 shadow-card md:p-10">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-full bg-(--color-green-accent)">
            {icon}
          </span>
          <div>
            <p className="text-xs font-semibold tracking-(--tracking-loose) uppercase text-(--color-gold)">
              {kicker}
            </p>
            <h3 className="text-2xl font-semibold tracking-[-0.16px] text-white">{title}</h3>
          </div>
        </div>
        <p className="mt-4 max-w-3xl leading-relaxed text-(--color-text-white-soft)">{desc}</p>
        <div className="mt-6 space-y-6">{children}</div>
      </div>
    </article>
  );
}

/** 9 indikator life skill mandiri — grid chips */
function CardMandiri() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="rounded-(--radius-card) bg-white/10 p-4 ring-1 ring-white/15 md:p-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="press flex w-full cursor-pointer items-center justify-between gap-4 text-left"
      >
        <span>
          <span className="font-semibold text-white">
            SAYAMA Mandiri — 9 indikator karakter
          </span>
          <span className="block text-sm text-(--color-text-white-soft)">
            Ciri pribadi mandiri yang dibentuk pelatihan life skill
          </span>
        </span>
        <span className="shrink-0 text-sm font-semibold text-(--color-gold)">
          {open ? "Tutup" : "Lihat 9 indikator"}
        </span>
      </button>
      <div className={`expander mt-4 ${open ? "open" : ""}`}>
        <div>
          <ul className="grid gap-2 pb-4 md:grid-cols-3">
            {INDIKATOR_MANDIRI.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-(--radius-field) bg-(--color-green-house) px-3 py-2 text-sm text-white"
              >
                <span className="text-xs font-bold text-(--color-gold)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
