# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Audiens utama (inferred, belum dikonfirmasi):** dermawan / donatur / muzaki — individu yang ingin menyalurkan Zakat, Infaq, Sedekah, Wakaf (ZISWAF) atau donasi lain, serta publik yang mencari informasi yayasan dan cara memberi. Situasinya: sedang berniat beramal, butuh kepercayaan (identitas legal + kanal resmi) dan kemudahan akses informasi.
- **Audiensek pendukung:** calon relawan, wali/keluarga anak asuh, dan warga sekitar Pamulang yang ingin tahu program.
- **Audiensek evaluasi (konteks PKM):** reviewer Program Kreativitas Mahasiswa — situs ini juga merupakan luaran/deliverable proposal yang membuktikan konsep digitalisasi; kebutuhan mereka adalah kelayakan, keaslian data, dan kualitas.

## Product Purpose

Digitalisasi profil publik Yayasan Sahabat Yatim Mandiri (SAYAMA) — LKSA Asrama Yatim & Dhu'afa — melalui web interaktif yang menyajikan identitas, program, dan layanan yayasan secara resmi, dengan integrasi AI assistant untuk mendukung layanan informasi dan donasi digital. Tujuan: memperluas jangkauan, menumbuhkan kepercayaan dermawan, dan mempermudah penyaluran donasi ke kanal resmi yayasan.

## Positioning

Situs ini adalah "front desk digital + loket donasi" milik yayasan yatim & dhu'afa yang asli dan punya badan hukum — bukan platform donasi pihak ketiga. Perbedaan yang tidak bisa ditiru situs lain: identitas legal resmi (SK Kemenkumham, NPWP), dua asrama nyata, rekening atas nama yayasan, dan layanan ZISWAF lengkap, yang dipertemukan dalam satu tempat interaktif. AI assistant adalah mekanisme pembeda: menjembatani pengunjung dengan informasi dan panduan donasi tanpa harus antre tanya manual.

## Operating Context

- Saat ini layanan informasi & donasi yayasan berjalan lewat telepon/WhatsApp (0812-1273-4620 / 0812-9420-9443), Facebook "Yayasan Sahabat Yatim Mandiri", dan kantor pelayanan donasi di tiap asrama, plus layanan "jemput donasi".
- Penyaluran donasi aktual menuju rekening yayasan atas nama resmi: BSI (Bank Syariah Indonesia) dan BRI.
- Situs dibangun sebagai proyek PKM mahasiswa Universitas Pamulang (semester 5); proposal berjudul *"Digitalisasi Profil Yayasan Yatim Berbasis Web Interaktif dengan Integrasi AI Assistant untuk Mendukung Layanan Informasi dan Donasi Digital"*.
- Bahasa konten: Indonesia (`lang="id"`).

## Capabilities and Constraints

- **Saat ini (terbangun):** landing page statis multi-halaman (App Router Next.js 16 + React 19 + Tailwind v4), halaman `/` dan `/kontak`, tanpa backend/API/database/autentikasi. Semua konten statis.
- **Copy saat ini masih placeholder** — akan diganti dengan bahan resmi dari brosur yayasan (lihat Evidence on Hand).
- **Direncanakan di proposal (belum dibangun, detail belum diputuskan):** web interaktif + integrasi AI assistant + dukungan donasi digital. Status ini sengaja tidak diputuskan di sini — belum ada keputusan platform AI, bentuk donasi online, maupun apakah ada portal donor.
- **Terminologi yang wajib dipakai benar:** LKSA (Lembaga Kesejahteraan Sosial Anak), mukim / non-mukim, ZISWAF, tahsin / tahfidzul Qur'an, santunan (pendidikan, janda & lansia), bakti sosial, SAYAMA Pintar / Kreatif / Mandiri.
- Tombol "Masuk / Gabung Sekarang" di navbar adalah warisan placeholder dari template Starbucks — belum ada sistem akun; status masa depan (portal donor sungguhan) belum diputuskan.

## Brand Commitments

- **Nama:** Yayasan Sahabat Yatim Mandiri — dikenal sebagai **SAYAMA**; unit pengasuhan: Asrama/LKSA Yatim & Dhu'afa.
- **Legal:** SK Menteri AHU-0014418.AH.01.04. Tahun 2019; NPWP 93.074.959.3.453.000.
- **Moto:** "Sehat, Cerdas, Mandiri, dan Mulia". Tagline ajakan: "Mari kita wujudkan harapan dan cita-cita mereka."
- **Dasar nilai:** wawasan Islam — situs mengangkat tema yatim & dhu'afa (rujukan QS Al-Ma'un, hadits) dan menyalurkan ZISWAF; nada komunikasi hangat, resmi, dan religius, bukan sekuler-corporate.
- **Alamat:** Asrama 1 — Jl. Ketapang 3 No.1B, RT 006 RW 006, Kel. Pamulang Barat, Kec. Pamulang, Kota Tangerang Selatan, Banten. Asrama 2 — Jl. Bali Raya Blok S7 No.12, RT 06 RW 06, Kel. Pondok Benda, Pamulang, Tangerang Selatan.
- **Kontak resmi:** Telepon/WhatsApp 0812-1273-4620 / 0812-9420-9443; Facebook "Yayasan Sahabat Yatim Mandiri".
- **Rekening donasi resmi (atas nama Yayasan Sahabat Yatim Mandiri):** BSI 161252208-4; BRI 1127 0100 0628 308.

## Evidence on Hand

- **Transkripsi brosur resmi yayasan** (diberikan pemilik proyek, verbatim): `docs/brosur-sayama.md` — sumber kebenaran untuk visi/misi, program, hadits/rujukan, kontak, dan data donasi.
- **Belum ada:** foto dokumentasi kegiatan/asrama, logo asli, testimoni donatur, data jumlah anak asuh, atau laporan keuangan nyata. Pekerjaan mendatang tidak boleh mengarang aset semacam ini; angka statistik di halaman saat ini (50+ anak, 12 program, dst.) adalah placeholder.

## Product Principles

1. **Kepercayaan sebelum meminta.** Tampilkan identitas legal dan kanal resmi (rekening atas nama yayasan, kontak, alamat) sebagai fondasi konversi donasi — jangan pernah mengarahkan dana ke kanal yang bukan milik yayasan.
2. **Cerita yayasan dibawakan setia.** Nama program, rujukan Islami, dan klaim berasal dari materi asli yayasan; jangan menambah/mengubah program atau statistik.
3. **Satu sumber kebenaran.** Data (alamat, rekening, kontak, SK) harus persis sama dengan brosur; setiap perubahan diverifikasi ke pemilik proyek.
4. **Digitalisasi = layanan, bukan gimmick.** AI assistant dan alur donasi harus memangkas gesekan menuju kontak/donasi nyata, selaras tujuan digitalisasi pada judul proposal.
5. **Kesopanan penanganan dana.** Donasi & ZISWAF sensitif secara agama dan hukum — situs hanya memfasilitasi informasi, penyaluran tetap melalui kanal resmi yayasan.

## Accessibility & Inclusion

Belum ada kebutuhan atau standar khusus yang ditetapkan untuk produk ini.
