# AGENTS.md — Panduan Agent untuk Project SAYAMA (PKM Panti Asuhan)

Project ini adalah hasil refactor dari template lama (Pokedex "PKMN-LUXE" +
portfolio brutalist). Semua code lama sudah dihapus; sejarahnya masih bisa
dilihat di git commit `d13c085` kalau perlu referensi.

## Konteks Project

- **Project:** Landing page Program Kreativitas Mahasiswa (PKM) Universitas
  Pamulang untuk **Yayasan Sahabat Yatim Mandiri (SAYAMA)** — LKSA Asrama
  Yatim & Dhu'afa, Pamulang, Tangerang Selatan.
- **Bahasa konten:** Indonesia (`lang="id"`).
- **Jenis situs:** Landing page satu halaman (`/`) + halaman `/kontak`,
  plus **Route Handler `/api/chat`** sebagai backend Asisten AI (Gemini).
  Tidak ada database; state chat disimpan client-side.
- **Asisten AI:** Gemini Flash via REST `generateContent`. Brosur di-inline
  penuh sebagai system prompt (context stuffing — BUKAN RAG, cukup untuk
  1 dokumen ±2K token). Rantai: widget `components/layout/assistant-chat.tsx`
  → `POST /api/chat` → `lib/assistant.ts` (`askAssistant`) → Gemini.
  API key lewat env `GEMINI_API_KEY` (lihat `.env.example`) — JANGAN pernah
  hardcode key atau panggil Gemini dari client.
- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4
  (konfigurasi lewat CSS `@theme` di `app/globals.css`, TANPA
  `tailwind.config.js`) + node (npm).
- **Produk & desain:** baca `PRODUCT.md` (konteks produk) dan `DESIGN.md`
  (design system Starbucks-inspired) sebelum mengerjakan apapun.

## Perintah

```bash
npm run dev     # server development (http://localhost:3000)
npm run build   # build produksi — WAJIB lolos sebelum selesai
npm run start   # jalankan hasil build
npm run test    # tes mandiri markdown parser (lib/markdown.test.ts)
```

## Sumber Kebenaran Data

`lib/sayama.ts` adalah **satu-satunya** sumber data fakta yayasan (nama,
SK, NPWP, kontak, rekening bank, alamat asrama, link WhatsApp). Semua nilai
verbatim dari `docs/brosur-sayama.md`. Aturan:

- Jangan pernah hardcode fakta yayasan di komponen — selalu import dari
  `lib/sayama.ts`.
- Perubahan data fakta wajib diverifikasi ke brosur/pemilik proyek dulu.
- **Jangan mengarang data** (jumlah anak, statistik, testimoni, foto
  dokumentasi) — jika belum ada, jangan ditampilkan.

## Aturan Wajib

### 1. Design system — ikuti `DESIGN.md` (Starbucks-inspired)

Ringkasan token yang sudah ada di `app/globals.css`:

- **Canvas halaman = cream `#f2f0eb`** (`bg-(--color-canvas-warm)`), BUKAN
  putih murni. Card yang berwarna putih, bukan halaman.
- **4 tier hijau, masing-masing punya peran — jangan dicampur:**
  - `green-starbucks #006241` → judul/heading (H1).
  - `green-accent #00754A` → tombol CTA terisi, ikon Frap.
  - `green-house #1E3932` → band gelap (section unggulan, footer, surface gelap).
  - `green-uplift #2b5148` → surface kartu program stacking.
- **Gold `#cba258`** HANYA untuk momen sakral/penghargaan (quote Al-Qur'an,
  apresiasi donatur, seal). Dilarang jadi aksen umum.
- **Semua tombol pill `radius 50px`** pakai komponen `Button`
  (`components/ui/button.tsx`) — jangan bikin tombol manual. Active state =
  `scale(0.95)` otomatis (utility `press`).
- **Card** pakai `Card` (`components/ui/card.tsx`) — radius 12px, shadow ganda
  low-alpha.
- **H1 vs H2:** beda di weight (600 vs 400) + warna, bukan ukuran.
- **Teks:** `text-(--color-text-black)` (0.87) utama, `soft` (0.58) sekunder;
  di surface gelap pakai `text-white` + `text-(--color-text-white-soft)`.
- **Shadow:** layer 2–3 low-alpha. Dilarang satu drop shadow berat.
- **Gradient HANYA di** `wave-text` (tagline hero) dan `shimmer-term` (kata
  kunci visi). Seluruh sistem lain color-block solid — jangan tambah gradient
  baru tanpa izin.
- **Font:** Inter (substitusi SoDoSans) + Lora (substitusi serif kontekstual —
  hanya untuk quote kitab/hadits via utility `scripture`).
- **Ritme halaman (§1 DESIGN.md):** cream hero → putih → band House Green →
  cream → putih → footer House Green.

### 2. Motion (tanpa library animasi)

Animasi dibangun murni CSS + IntersectionObserver — **dilarang menambah
library animasi/3D** (three.js, gsap, framer-motion, dll. sengaja dihapus).

Pola motion yang ada:

- `Reveal` (`components/motion/reveal.tsx`) — blur-rise on scroll.
- `WordStagger` — kata-per-kata, highlight istilah lewat `shimmer-term`.
- `.stack-item` (sticky) — kartu stacking: kartu berikut menimpa kartu sebelumnya.
- Utility CSS: `wave-text`, `shimmer-term`, `marquee-track`, `spin-slow`,
  `float-y`, `pattern-islamic`, `expander`, `press`.

Aturan gerak:

- Semua efek gerak digerakkan kelas `html.js` + `prefers-reduced-motion:
  no-preference` — tanpa JS / reduced-motion, konten wajib tetap terlihat.
- Halaman harus tetap sempurna dibaca tanpa animasi apa pun.

### 3. Struktur file

```
app/
  layout.tsx          # Inter+Lora, lang=id, metadata, kelas js
  globals.css         # tokens design system + utilities motion
  page.tsx            # landing (hero→selayang→program→donasi→lokasi)
  kontak/page.tsx     # halaman kontak & lokasi
  api/chat/route.ts   # backend Asisten AI (validasi + rate limit + Gemini)
components/
  layout/             # Navbar, Footer, AssistantChat (widget AI mengambang)
  motion/             # Reveal, WordStagger
  sections/           # Hero, SelayangPandang, Program, Donasi, Lokasi
  ui/                 # primitives: Button, Card
lib/
  sayama.ts           # SEMUA fakta yayasan (sumber tunggal)
  brosur.ts           # brosur verbatim — grounding system prompt AI
  assistant.ts        # logika panggilan Gemini (fungsi murni)
  utils.ts            # cn()
docs/
  brosur-sayama.md    # transkrip brosur resmi (verifikasi konten)
```

- Komponen baru: fungsional + hooks, PascalCase, file per komponen.
- Halaman baru: folder `app/<nama>/page.tsx` + update `NAV_LINKS` (navbar)
  & link footer.
- Section baru di landing: komponen di `components/sections/` + rakit di
  `app/page.tsx`.

### 4. Kanal donasi & kepercayaan

- Situs **tidak memproses pembayaran** — hanya menampilkan kanal resmi
  (rekening BSI/BRI atas nama yayasan, WhatsApp, alamat kantor).
- Jangan pernah mengarahkan dana ke kanal selain milik yayasan.
- Legality badges (SK, NPWP) wajib akurat — ambil dari `lib/sayama.ts`.

### 5. Deploy

Docker + nginx + docker-compose dikonfigurasi untuk `pkm-panti-*`.
Domain via env `PKM_DOMAIN` (lihat `.env.example`). Output Next standalone.
Jangan mengubah konfigurasi network `solusi-khatulistiwa-digital`.

### 6. Kebersihan code

- Hapus `console.log` sebelum commit.
- Tanpa emoji di code.
- Konvensi Tailwind v4: pakai token `@theme` — `bg-(--color-...)`,
  `rounded-(--radius-...)`, `shadow-card`, `container-pkm`. Dilarang nilai
  arbitrer kecuali tidak ada token (contoh sah: `tracking-[-0.16px]`).
  CATATAN: kurung `()` hanya untuk CSS var — `tracking-(0.1em)` SALAH,
  pakai token `tracking-loose` atau arbitrary `tracking-[0.1em]`.
- Setelah edit file TS/TSX, jalankan `npx tsc --noEmit` & `npm run build`.

## Pelajaran dari Template Lama (Kenapa Refactor Ini Dilakukan)

1. **Dua template numpuk** (portfolio brutalist + Pokedex) menghasilkan
   ratusan baris dead-code: `app/portfolio-backup.tsx` (760 baris, 0
   referensi) & seluruh pohon `components/effects|experimental|sections`
   hanya hidup dari file backup itu. Jangan menyimpan file "backup" di
   `app/` — setiap file di `app/` otomatis jadi route.
2. **Dependency animasi/3D berat** (three.js, gsap, react-spring, lenis,
   locomotive-scroll, split-type, use-gesture) tidak pernah dipakai bareng
   secara efektif. Prinsip: jangan tambah dependency sebelum benar-benar
   dibutuhkan — semua motion situs ini murni CSS + IntersectionObserver.
3. **Redux Toolkit 4 slice** untuk situs konten statis = over-engineering.
   State lokal `useState` sudah cukup.
4. **Branding contamination:** metadata, README, Dockerfile, nginx, env masih
   bawaan template sebelumnya (bahkan ada sisa TMDB dari template movie).
   Saat mengganti template, audit SEMUA file config — bukan cuma `app/`.
5. **Barrel `index.ts`** yang mengekspor komponen tak dipakai membuat
   dead-code terlihat hidup. Ekspor hanya yang benar-benar digunakan.
6. **Tailwind v4 diam-diam mengabaikan kelas tak dikenal** — build tetap
   "sukses" walau kelas salah sintaks tidak ter-generate. Setelah menulis
   kelas custom, verifikasi di CSS output (`.next/static/chunks/*.css`).
