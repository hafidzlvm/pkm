import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store/StoreProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PKMN-LUXE | The Collector's Archive",
  description:
    "PKMN-LUXE — A curated high-fidelity digital repository of elite-tier Pokemon specimens. Search, discover, and explore detailed Pokemon information with a brutalist luxury design.",
  keywords: [
    "Pokedex",
    "Pokemon",
    "Pokemon Search",
    "Pokemon Database",
    "Pokemon Explorer",
    "Pokemon Archive",
    "PKMN-LUXE",
    "Pokemon Collection",
    "Pokemon Stats",
    "Pokemon Abilities",
    "Pokemon Evolution",
  ],
  authors: [{ name: "Muhammad Hafidz" }],
  creator: "PKMN-LUXE",
  publisher: "PKMN-LUXE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "https://pkmn-luxe.hafidzlvm.org",
    title: "PKMN-LUXE — The Collector's Archive",
    description:
      "A curated high-fidelity digital repository of elite-tier Pokemon specimens. Explore detailed Pokemon information with brutalist luxury design.",
    siteName: "PKMN-LUXE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Movie Explorer - Discover Movies",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PKMN-LUXE | The Collector's Archive",
    description: "Explore elite-tier Pokemon specimens. Search, discover, and collect Pokemon with brutalist luxury design.",
    creator: "@hafidzlvm",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/shortcut-icon.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://pkmn-luxe.hafidzlvm.org"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} antialiased`}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
