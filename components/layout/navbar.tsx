"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, HeartHandshake, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SAYAMA, waLink, WA_MESSAGES } from "@/lib/sayama";

const NAV_LINKS = [
  { href: "/#selayang-pandang", label: "Tentang" },
  { href: "/#program", label: "Program" },
  { href: "/#donasi", label: "Donasi" },
  { href: "/#kontak", label: "Kontak" },
];

/** Navbar ala Starbucks (DESIGN.md §4) — putih, fixed, shadow 3-layer. */
export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-nav">
      <nav className="container-pkm flex h-16 items-center justify-between md:h-20 lg:h-24">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
          aria-label="Beranda Yayasan Sahabat Yatim Mandiri"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-(--color-green-starbucks)">
            <HeartHandshake className="size-5 text-white" aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-[-0.16px] text-(--color-green-starbucks)">
              {SAYAMA.short}
            </span>
            <span className="text-[11px] text-(--color-text-black-soft)">
              Yatim &amp; Dhu&apos;afa
            </span>
          </span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-(--color-text-black) underline-offset-4 hover:text-(--color-green-accent) hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="primary" size="sm" asChild>
            <a
              href={waLink(SAYAMA.contacts.whatsapp[0].intl, WA_MESSAGES.donation)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Donasi
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href={waLink(SAYAMA.contacts.whatsapp[1].intl, WA_MESSAGES.info)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden />
              Tanya Kami
            </a>
          </Button>
        </div>

        {/* Hamburger mobile */}
        <button
          type="button"
          className="flex size-11 items-center justify-center lg:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="size-6" aria-hidden />
          ) : (
            <Menu className="size-6" aria-hidden />
          )}
        </button>
      </nav>

      {/* Drawer mobile */}
      <div className={cn("expander bg-white lg:hidden", open && "open")}>
        <div>
          <ul className="container-pkm flex flex-col gap-1 border-t border-(--color-hairline) py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-(--radius-pill) px-4 py-3 text-(--color-text-black) hover:bg-(--color-ceramic)"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex gap-3">
              <Button variant="primary" size="sm" className="flex-1" asChild>
                <a
                  href={waLink(SAYAMA.contacts.whatsapp[0].intl, WA_MESSAGES.donation)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Donasi
                </a>
              </Button>
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <a
                  href={waLink(SAYAMA.contacts.whatsapp[1].intl, WA_MESSAGES.info)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tanya Kami
                </a>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
