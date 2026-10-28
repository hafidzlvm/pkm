"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

type GalleryPhoto = {
  src: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
};

const PHOTOS: GalleryPhoto[] = [
  {
    src: "/gallery/kebersamaan-donatur-dan-anak.jpeg",
    caption: "Kebersamaan donatur & anak asrama",
    alt: "Foto bersama donatur dan anak asrama di ruang kegiatan",
    width: 1600,
    height: 1200,
  },
  {
    src: "/gallery/penyerahan-tas-sekolah.jpeg",
    caption: "Penyerahan tas sekolah",
    alt: "Penyerahan tas sekolah kepada anak asrama",
    width: 1600,
    height: 900,
  },
  {
    src: "/gallery/doa-di-serambi-masjid.jpeg",
    caption: "Doa di serambi masjid",
    alt: "Anak asrama berdoa di tangga serambi masjid",
    width: 1600,
    height: 720,
  },
  {
    src: "/gallery/kegiatan-bersama-relawan.jpeg",
    caption: "Kegiatan bersama relawan",
    alt: "Foto bersama relawan dan anak asrama di depan banner LKSA Sahabat Yatim Mandiri",
    width: 1600,
    height: 1200,
  },
  {
    src: "/gallery/tausiyah-generasi-beradab.jpeg",
    caption: "Tausiyah generasi beradab",
    alt: "Tausiyah kiat sukses mendampingi anak menjadi generasi beradab",
    width: 1280,
    height: 720,
  },
  {
    src: "/gallery/doa-bersama-di-ruang-kegiatan.jpeg",
    caption: "Doa bersama di ruang kegiatan",
    alt: "Doa bersama anak asrama dan donatur di ruang kegiatan",
    width: 1600,
    height: 1200,
  },
  {
    src: "/gallery/penyerahan-goodie-bag.jpeg",
    caption: "Penyerahan goodie bag",
    alt: "Anak asrama memegang goodie bag bersama donatur",
    width: 1600,
    height: 900,
  },
  {
    src: "/gallery/doa-bersama-donatur.jpeg",
    caption: "Doa bersama donatur",
    alt: "Doa bersama donatur dan anak asrama",
    width: 1600,
    height: 1200,
  },
  {
    src: "/gallery/doa-di-teras-asrama.jpeg",
    caption: "Doa di teras asrama",
    alt: "Doa bersama di teras asrama",
    width: 1600,
    height: 720,
  },
];

/**
 * Galeri dokumentasi kegiatan — masonry CSS columns + lightbox dialog native.
 * Tanpa dependency tambahan; Esc/panah/backdrop ditangani dialog + keydown.
 */
export function GallerySection() {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const photo = PHOTOS[index];

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  function go(step: -1 | 1) {
    setIndex((i) => (i + step + PHOTOS.length) % PHOTOS.length);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  }

  return (
    <section id="gallery" className="bg-white py-16 md:py-24">
      <div className="container-pkm">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl tracking-[-0.16px] md:text-4xl">Galeri Kegiatan</h2>
          <p className="text-lg leading-relaxed text-(--color-text-black-soft)">
            Momen kebersamaan donatur, relawan, dan anak asrama dalam kegiatan
            LKSA SAYAMA di Pamulang.
          </p>
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 md:gap-6 lg:columns-3">
          {PHOTOS.map((item, i) => (
            <Reveal
              key={item.src}
              delay={Math.min(i * 50, 250)}
              className="mb-4 break-inside-avoid md:mb-6"
            >
              <button
                type="button"
                onClick={() => openAt(i)}
                aria-label={`Perbesar foto: ${item.caption}`}
                className="press group block w-full overflow-hidden rounded-(--radius-card) bg-white text-left shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-accent)"
              >
                <span className="relative block overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <span className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white text-(--color-brand) opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="size-4" aria-hidden />
                  </span>
                </span>
                <span className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="text-sm font-semibold text-(--color-text-black)">
                    {item.caption}
                  </span>
                  <span className="shrink-0 text-xs font-semibold tracking-loose uppercase text-(--color-text-black-soft)">
                    Foto {i + 1}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Galeri foto kegiatan SAYAMA"
        onClose={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="m-auto w-[min(96vw,72rem)] max-w-none bg-transparent p-0 text-white backdrop:bg-black/80"
      >
        <div className="flex max-h-[92vh] flex-col">
          <div className="flex items-center justify-between gap-4 pb-3">
            <p
              className="text-sm font-semibold tracking-loose uppercase text-(--color-text-white-soft)"
              aria-live="polite"
            >
              {index + 1} / {PHOTOS.length}
            </p>
            <Button
              variant="inverted"
              size="sm"
              onClick={() => setOpen(false)}
              aria-label="Tutup galeri"
              className="size-10 px-0 shadow-card"
            >
              <X className="size-5" aria-hidden />
            </Button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            <Button
              variant="inverted"
              size="sm"
              onClick={() => go(-1)}
              aria-label="Foto sebelumnya"
              className="absolute left-2 top-1/2 z-10 size-11 -translate-y-1/2 px-0 shadow-card md:-left-4"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </Button>

            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1100px) 1100px, 96vw"
              className="h-auto max-h-[74vh] w-auto max-w-full rounded-(--radius-card) object-contain"
            />

            <Button
              variant="inverted"
              size="sm"
              onClick={() => go(1)}
              aria-label="Foto berikutnya"
              className="absolute right-2 top-1/2 z-10 size-11 -translate-y-1/2 px-0 shadow-card md:-right-4"
            >
              <ChevronRight className="size-5" aria-hidden />
            </Button>
          </div>

          <p className="pt-3 text-center text-sm text-(--color-text-white-soft)">
            {photo.caption}
          </p>
        </div>
      </dialog>
    </section>
  );
}
