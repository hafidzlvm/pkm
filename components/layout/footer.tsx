import Link from "next/link";
import { HeartHandshake, Facebook, MapPin } from "lucide-react";
import { SAYAMA, ASRAMA } from "@/lib/sayama";

/** Footer House Green (DESIGN.md §1) — bookend gelap + kredit PKM. */
export function Footer() {
  return (
    <footer className="on-dark bg-(--color-green-house)">
      <div className="container-pkm py-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Identitas */}
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-full bg-white/10">
                <HeartHandshake className="size-5 text-(--color-gold)" aria-hidden />
              </span>
              <span className="text-lg font-bold tracking-[-0.16px] text-white">
                {SAYAMA.short}
              </span>
            </p>
            <p className="text-sm leading-relaxed text-(--color-text-white-soft)">
              {SAYAMA.name} — {SAYAMA.unit}. {SAYAMA.motto}.
            </p>
            <p className="text-xs leading-relaxed text-(--color-text-white-soft)">
              {SAYAMA.legal.skLabel}: {SAYAMA.legal.sk}
              <br />
              NPWP: {SAYAMA.legal.npwp}
            </p>
          </div>

          {/* Program */}
          <nav aria-label="Program">
            <h3 className="mb-3 text-sm font-semibold tracking-(--tracking-loose) uppercase text-white">
              Program
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/#program", label: "Pengasuhan" },
                { href: "/#program", label: "Pendidikan & Qur'an" },
                { href: "/#program", label: "Santunan & Baksos" },
                { href: "/#donasi", label: "Layanan ZISWAF" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-(--color-text-white-soft) underline-offset-4 hover:text-white hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak */}
          <nav aria-label="Kontak">
            <h3 className="mb-3 text-sm font-semibold tracking-(--tracking-loose) uppercase text-white">
              Kontak
            </h3>
            <ul className="space-y-3 text-sm text-(--color-text-white-soft)">
              {SAYAMA.contacts.whatsapp.map((wa) => (
                <li key={wa.value}>
                  <a
                    className="underline-offset-4 hover:text-white hover:underline"
                    href={`tel:+${wa.intl}`}
                  >
                    {wa.value}
                  </a>
                  <span className="block text-xs">{wa.label}</span>
                </li>
              ))}
              <li>
                <a
                  className="inline-flex items-center gap-2 underline-offset-4 hover:text-white hover:underline"
                  href={SAYAMA.contacts.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="size-4" aria-hidden />
                  {SAYAMA.contacts.facebook}
                </a>
              </li>
            </ul>
          </nav>

          {/* Alamat asrama */}
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-(--tracking-loose) uppercase text-white">
              Asrama
            </h3>
            <ul className="space-y-3">
              {ASRAMA.map((a) => (
                <li key={a.id} className="flex gap-2 text-sm text-(--color-text-white-soft)">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-(--color-gold)" aria-hidden />
                  <span>
                    <span className="font-semibold text-white">{a.label}</span> — {a.address}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-(--color-text-white-soft) md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SAYAMA.name}. Semua hak dilindungi.
          </p>
          <p>
            Dikembangkan oleh tim Program Kreativitas Mahasiswa — Universitas Pamulang.
          </p>
        </div>
      </div>
    </footer>
  );
}
