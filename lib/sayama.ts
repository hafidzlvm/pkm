/**
 * Sumber kebenaran tunggal data Yayasan Sahabat Yatim Mandiri (SAYAMA).
 * Semua nilai verbatim dari docs/brosur-sayama.md — jangan diubah tanpa
 * verifikasi ke pemilik proyek.
 */

export const SAYAMA = {
  name: "Yayasan Sahabat Yatim Mandiri",
  short: "SAYAMA",
  unit: "Asrama (LKSA) Yatim & Dhu'afa",
  motto: "Sehat, Cerdas, Mandiri, dan Mulia",
  invitation: "Mari kita wujudkan Harapan dan cita-cita mereka",
  legal: {
    sk: "AHU-0014418.AH.01.04. Tahun 2019",
    skLabel: "SK Menteri Hukum dan HAM",
    npwp: "93.074.959.3.453.000",
  },
  contacts: {
    phone1: "0812-1273-4620",
    phone2: "0812-9420-9443",
    facebook: "Yayasan Sahabat Yatim Mandiri",
    facebookUrl: "https://www.facebook.com/people/Yayasan-Sahabat-Yatim-Mandiri/100076269524498/",
    whatsapp: [
      { label: "WhatsApp 1", value: "0812-1273-4620", intl: "6281212734620" },
      { label: "WhatsApp 2", value: "0812-9420-9443", intl: "6281294209443" },
    ],
  },
} as const;

export const ASRAMA = [
  {
    id: "asrama-1",
    label: "Asrama 1",
    address:
      "Jl. Ketapang 3 No.1B, RT 006 RW 006, Kel. Pamulang Barat, Kec. Pamulang, Kota Tangerang Selatan, Banten",
    area: "Pamulang Barat",
  },
  {
    id: "asrama-2",
    label: "Asrama 2",
    address:
      "Jl. Bali Raya Blok S7 No.12, RT 06 RW 06, Kel. Pondok Benda, Pamulang, Tangerang Selatan",
    area: "Pondok Benda",
  },
] as const;

export const BANKS = [
  {
    bank: "BSI",
    bankLong: "Bank Syariah Indonesia",
    account: "161252208-4",
    holder: "Yayasan Sahabat Yatim Mandiri",
  },
  {
    bank: "BRI",
    bankLong: "Bank Rakyat Indonesia",
    account: "1127 0100 0628 308",
    holder: "Yayasan Sahabat Yatim Mandiri",
  },
] as const;

export const ZISWAF_TABS = [
  {
    id: "zakat",
    label: "Zakat",
    desc: "Menunaikan zakat mal dan zakat fitrah; kami terima dan salurkan kepada mustahik yang berhak.",
  },
  {
    id: "infaq",
    label: "Infaq",
    desc: "Persembahan sukarela untuk membiayai pengasuhan, pendidikan, dan kebutuhan harian anak asuh.",
  },
  {
    id: "shodaqoh",
    label: "Shodaqoh",
    desc: "Sedekah umum yang menopang operasional asrama dan santunan janda, lansia, serta dhu'afa.",
  },
  {
    id: "wakaf",
    label: "Wakaf",
    desc: "Wakaf produktif dan non-produktif untuk keberlanjutan aset dan layanan yayasan.",
  },
] as const;

export function waLink(intl: string, message: string) {
  return `https://wa.me/${intl}?text=${encodeURIComponent(message)}`;
}

export const WA_MESSAGES = {
  donation:
    "Assalamu'alaikum, saya ingin menanyakan cara berdonasi ke Yayasan Sahabat Yatim Mandiri.",
  pickup:
    "Assalamu'alaikum, saya ingin menggunakan layanan Jemput Donasi Yayasan Sahabat Yatim Mandiri.",
  info: "Assalamu'alaikum, saya ingin bertanya tentang program Yayasan Sahabat Yatim Mandiri.",
} as const;
