import { MapPin, Navigation, Facebook, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ASRAMA, SAYAMA } from "@/lib/sayama";

const MARQUEE_ITEMS = [
  "Sehat",
  "Cerdas",
  "Mandiri",
  "Mulia",
  "Amanah",
  "Berakhlak Mulia",
  "Amil ZISWAF",
  "Pengasuhan Yatim & Dhu'afa",
  "Pendidikan & Tahfidz Qur'an",
  "Santunan Janda & Lansia",
  "Bakti Sosial",
  "Jemput Donasi",
];

/** Lokasi asrama (section putih) — kartu interaktif + pin peta. */
export function LokasiSection() {
  return (
    <section id="kontak" className="bg-white py-16 md:py-24">
      <div className="container-pkm">
        <h2 className="text-3xl tracking-[-0.16px] md:text-4xl">Lokasi &amp; Kontak</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-(--color-text-black-soft)">
          Dua asrama LKSA sekaligus kantor pelayanan donasi ZISWAF di Pamulang,
          Tangerang Selatan.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {ASRAMA.map((a) => (
            <Card key={a.id} className="group shadow-card">
              <CardContent className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-(--color-green-light) transition-colors group-hover:bg-(--color-green-accent)">
                  <MapPin className="size-6 text-(--color-green-starbucks) transition-colors group-hover:text-white" aria-hidden />
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold tracking-[-0.16px]">{a.label}</h3>
                  <p className="text-sm leading-relaxed text-(--color-text-black-soft)">
                    {a.address}
                  </p>
                  <a
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-(--color-green-accent) underline-offset-4 hover:underline"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="size-4" aria-hidden />
                    Buka di Google Maps
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Kontak cepat */}
        <div className="mt-6 flex flex-wrap gap-3">
          {SAYAMA.contacts.whatsapp.map((wa) => (
            <a
              key={wa.intl}
              href={`tel:+${wa.intl}`}
              className="press inline-flex items-center gap-2 rounded-(--radius-pill) border-1 border-(--color-input-border) bg-white px-5 py-2.5 text-sm font-semibold text-(--color-text-black) hover:border-(--color-green-accent)"
            >
              <Phone className="size-4 text-(--color-green-accent)" aria-hidden />
              {wa.value}
            </a>
          ))}
        </div>

        {/* Marquee nilai yayasan */}
        <div className="marquee mt-10 border-y border-(--color-hairline) py-4" aria-hidden>
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center">
                {MARQUEE_ITEMS.map((item, i) => (
                  <span
                    key={`${dup}-${i}`}
                    className="flex items-center gap-6 px-6 text-sm font-semibold tracking-(--tracking-loose) uppercase whitespace-nowrap text-(--color-text-black-soft)"
                  >
                    {item}
                    <span className="size-1.5 rounded-full bg-(--color-gold)" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-(--color-text-black-soft)">
          <Facebook className="size-4" aria-hidden />
          Ikuti kami di Facebook:{" "}
          <a
            className="font-semibold text-(--color-green-accent) underline-offset-4 hover:underline"
            href={SAYAMA.contacts.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SAYAMA.contacts.facebook}
          </a>
        </p>
      </div>
    </section>
  );
}
