# PKM Panti Asuhan

Landing page Program Kreativitas Mahasiswa (PKM) untuk panti asuhan.
Dibangun dengan Next.js 16 (App Router), React 19, TypeScript, dan
Tailwind CSS v4. Design system mengikuti [DESIGN.md](DESIGN.md)
(Starbucks-inspired) — dokumentasi detail kontribusi ada di [AGENTS.md](AGENTS.md).

## Perintah

```bash
npm install     # install dependency
npm run dev     # development (http://localhost:3000)
npm run build   # build produksi
npm run start   # jalankan hasil build
```

## Struktur

```
app/            # halaman (App Router) — Indonesia (lang=id)
components/     # layout (Navbar, Footer) + ui (Button, Card)
lib/            # cn() util
DESIGN.md       # design system — sumber kebenaran visual
AGENTS.md       # aturan development
```

## Deploy

Docker + nginx tersedia (`Dockerfile`, `docker-compose.yml`, `nginx/`).
Domain lewat env `PKM_DOMAIN` — lihat `.env.example`.
