/* Operasi array tiket. Penghapusan menyalin isi sel berikutnya ke kiri manual. */
(function () {
  const K = window.Karcis;

  K.Array = {
    tampilkan() {
      return K.tiket;
    },

    tambah(tiket) {
      // push menambahkan satu objek baru ke ujung array.
      K.tiket.push(tiket);
      return K.tiket.length - 1;
    },

    hapus(indeks) {
      if (!Number.isInteger(indeks) || indeks < 0 || indeks >= K.tiket.length) return null;
      const terhapus = K.tiket[indeks];
      // Geser setiap elemen setelah indeks satu posisi ke kiri.
      for (let i = indeks; i < K.tiket.length - 1; i += 1) {
        K.tiket[i] = K.tiket[i + 1];
      }
      K.tiket.length = K.tiket.length - 1;
      return terhapus;
    },

    ubah(indeks, dataBaru) {
      if (!Number.isInteger(indeks) || indeks < 0 || indeks >= K.tiket.length) return null;
      K.tiket[indeks] = { ...K.tiket[indeks], ...dataBaru };
      return K.tiket[indeks];
    }
  };
})();
