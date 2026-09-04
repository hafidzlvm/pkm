import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AssistantChat } from "@/components/layout/assistant-chat";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Facebook, Clock } from "lucide-react";
import { SAYAMA, ASRAMA } from "@/lib/sayama";

export const metadata: Metadata = {
  title: "Kontak & Lokasi",
  description:
    "Hubungi Yayasan Sahabat Yatim Mandiri — telepon/WhatsApp, Facebook, alamat asrama Pamulang, dan layanan Jemput Donasi.",
};

const CARDS = [
  {
    icon: Phone,
    title: "Telepon / WhatsApp",
    lines: [SAYAMA.contacts.phone1, SAYAMA.contacts.phone2],
  },
  {
    icon: Facebook,
    title: "Facebook",
    lines: [SAYAMA.contacts.facebook],
  },
  {
    icon: Clock,
    title: "Layanan Donasi",
    lines: [
      "Kantor pelayanan ZISWAF di setiap asrama",
      "Jemput donasi — hubungi WhatsApp",
    ],
  },
];

export default function KontakPage() {
  return (
    <>
      <Navbar />
      <main className="bg-(--color-canvas-warm) pt-16 pb-16 md:pt-24 md:pb-24 lg:pt-24">
        <div className="container-pkm max-w-4xl space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl tracking-[-0.16px] md:text-5xl">Kontak &amp; Lokasi</h1>
            <p className="text-lg leading-relaxed text-(--color-text-black-soft)">
              Ada pertanyaan seputar program, donasi, atau kerja sama? Hubungi
              kami melalui kanal resmi di bawah ini.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {CARDS.map((c) => (
              <Card key={c.title} className="shadow-card">
                <CardContent className="space-y-2">
                  <c.icon className="size-7 text-(--color-green-accent)" aria-hidden />
                  <h2 className="text-lg font-semibold tracking-[-0.16px]">{c.title}</h2>
                  {c.lines.map((l) => (
                    <p key={l} className="text-sm leading-relaxed text-(--color-text-black-soft)">
                      {l}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl tracking-[-0.16px]">Alamat Asrama</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {ASRAMA.map((a) => (
                <Card key={a.id} className="shadow-card">
                  <CardContent className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-6 shrink-0 text-(--color-green-accent)" aria-hidden />
                    <div className="space-y-1">
                      <h3 className="font-semibold">{a.label}</h3>
                      <p className="text-sm leading-relaxed text-(--color-text-black-soft)">
                        {a.address}
                      </p>
                      <a
                        className="inline-block text-sm font-semibold text-(--color-green-accent) underline-offset-4 hover:underline"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buka di Google Maps
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <p className="text-sm text-(--color-text-black-soft)">
            Legalitas: {SAYAMA.legal.skLabel} {SAYAMA.legal.sk} — NPWP{" "}
            {SAYAMA.legal.npwp}.
          </p>
        </div>
      </main>
      <Footer />
      <AssistantChat />
    </>
  );
}
