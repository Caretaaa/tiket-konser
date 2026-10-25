/* Data perjalanan dan penginapan. Semua layanan disimpan dalam satu array object. */
window.Karcis = {
  tiket: [
    { id: 2401, namaLayanan: "Jakarta — Yogyakarta", penyedia: "Kereta Argo Lawu", kota: "Yogyakarta", tanggal: "2026-10-24", kategori: "Kereta", harga: 430000, kuota: 27 },
    { id: 2402, namaLayanan: "Jakarta — Denpasar", penyedia: "Garuda Indonesia", kota: "Denpasar", tanggal: "2026-10-25", kategori: "Pesawat", harga: 1680000, kuota: 18 },
    { id: 2403, namaLayanan: "Surabaya — Malang", penyedia: "Rosalia Indah", kota: "Malang", tanggal: "2026-10-31", kategori: "Bus", harga: 180000, kuota: 0 },
    { id: 2404, namaLayanan: "Braga Permai", penyedia: "Kamar Deluxe · 2 malam", kota: "Bandung", tanggal: "2026-11-01", kategori: "Hotel", harga: 1450000, kuota: 6 },
    { id: 2405, namaLayanan: "Jakarta — Makassar", penyedia: "Citilink", kota: "Makassar", tanggal: "2026-11-07", kategori: "Pesawat", harga: 1330000, kuota: 56 },
    { id: 2406, namaLayanan: "Bandung — Surabaya", penyedia: "Kereta Argo Wilis", kota: "Surabaya", tanggal: "2026-11-08", kategori: "Kereta", harga: 510000, kuota: 17 },
    { id: 2407, namaLayanan: "Kota Lama Semarang", penyedia: "Kamar Standard · 1 malam", kota: "Semarang", tanggal: "2026-11-14", kategori: "Hotel", harga: 640000, kuota: 12 },
    { id: 2408, namaLayanan: "Medan — Jakarta", penyedia: "Batik Air", kota: "Jakarta", tanggal: "2026-11-15", kategori: "Pesawat", harga: 1090000, kuota: 32 },
    { id: 2409, namaLayanan: "Denpasar — Banyuwangi", penyedia: "Gunung Harta", kota: "Banyuwangi", tanggal: "2026-11-21", kategori: "Bus", harga: 320000, kuota: 210 },
    { id: 2410, namaLayanan: "Prawirotaman", penyedia: "Kamar Superior · 2 malam", kota: "Yogyakarta", tanggal: "2026-11-22", kategori: "Hotel", harga: 870000, kuota: 64 },
    { id: 2411, namaLayanan: "Bandung — Yogyakarta", penyedia: "Kereta Lodaya Pagi", kota: "Yogyakarta", tanggal: "2026-11-28", kategori: "Kereta", harga: 395000, kuota: 39 },
    { id: 2412, namaLayanan: "Cikini Heritage", penyedia: "Kamar Queen · 1 malam", kota: "Jakarta", tanggal: "2026-11-29", kategori: "Hotel", harga: 1150000, kuota: 142 },
    { id: 2413, namaLayanan: "Medan — Denpasar", penyedia: "Lion Air", kota: "Denpasar", tanggal: "2026-12-05", kategori: "Pesawat", harga: 1850000, kuota: 28 },
    { id: 2414, namaLayanan: "Makassar — Toraja", penyedia: "Bintang Prima", kota: "Tana Toraja", tanggal: "2026-12-06", kategori: "Bus", harga: 225000, kuota: 72 },
    { id: 2415, namaLayanan: "Tugu Surabaya", penyedia: "Kamar Deluxe · 2 malam", kota: "Surabaya", tanggal: "2026-12-12", kategori: "Hotel", harga: 1290000, kuota: 165 },
    { id: 2416, namaLayanan: "Jakarta — Malang", penyedia: "Kereta Brawijaya", kota: "Malang", tanggal: "2026-12-13", kategori: "Kereta", harga: 560000, kuota: 43 },
    { id: 2417, namaLayanan: "Taman Sari Bogor", penyedia: "Kamar Garden · 1 malam", kota: "Bogor", tanggal: "2026-12-19", kategori: "Hotel", harga: 940000, kuota: 0 },
    { id: 2418, namaLayanan: "Semarang — Jakarta", penyedia: "Super Air Jet", kota: "Jakarta", tanggal: "2026-12-20", kategori: "Pesawat", harga: 890000, kuota: 88 },
    { id: 2419, namaLayanan: "Malang — Yogyakarta", penyedia: "Kereta Gajayana", kota: "Yogyakarta", tanggal: "2026-12-26", kategori: "Kereta", harga: 480000, kuota: 31 },
    { id: 2420, namaLayanan: "Sanur Coast", penyedia: "Kamar Poolside · 2 malam", kota: "Denpasar", tanggal: "2026-12-27", kategori: "Hotel", harga: 1750000, kuota: 120 }
  ],
  selectedId: null,
  nextId: 2421,
  pointers: {},
  toastTimer: null
};
