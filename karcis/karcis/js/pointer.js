/*
 * Pointer simulasi. Di JavaScript variabel menyimpan referensi ke objek, bukan
 * alamat memori mentah. head dan tail menunjuk node pada linked list antrian.
 */
(function () {
  const K = window.Karcis;

  class LinkedQueue {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
      this.serial = 1;
    }

    enqueue(data) {
      const node = { id: this.serial, data, next: null };
      this.serial += 1;
      if (this.tail === null) {
        // Antrian kosong: head dan tail sama-sama menunjuk node pertama.
        this.head = node;
        this.tail = node;
      } else {
        // tail.next menjadi referensi ke node baru, lalu tail maju.
        this.tail.next = node;
        this.tail = node;
      }
      this.length += 1;
      return node;
    }

    dequeue() {
      if (this.head === null) return null;
      const nodeLama = this.head;
      // head berpindah mengikuti referensi next node yang dilayani.
      this.head = nodeLama.next;
      nodeLama.next = null;
      this.length -= 1;
      if (this.head === null) this.tail = null;
      return nodeLama.data;
    }
  }

  K.Queue = new LinkedQueue();

  K.Pointers = {
    // Simpan posisi indeks bernama agar UI dapat menggambar label di atas sel.
    set(penanda) {
      K.pointers = penanda || {};
    },
    clear() {
      K.pointers = {};
    }
  };
})();
