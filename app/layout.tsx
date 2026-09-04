import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: {
    default: "Yayasan Sahabat Yatim Mandiri — Asrama Yatim & Dhu'afa",
    template: "%s | Yayasan Sahabat Yatim Mandiri",
  },
  description:
    "SAYAMA — LKSA Asrama Yatim & Dhu'afa di Tangerang Selatan. Pengasuhan, pendidikan, santunan, dan layanan ZISWAF yang amanah. Mari kita wujudkan harapan dan cita-cita mereka.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Yayasan Sahabat Yatim Mandiri",
    title: "Yayasan Sahabat Yatim Mandiri — Asrama Yatim & Dhu'afa",
    description:
      "Pengasuhan, pendidikan, santunan, dan layanan ZISWAF yang amanah. Mari kita wujudkan harapan dan cita-cita mereka.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Set kelas js sebelum paint — gerak hanya aktif bila JS jalan */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${lora.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
