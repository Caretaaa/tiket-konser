/* Pencarian manual. Linear memeriksa tiap objek; binary memakai low/mid/high. */
(function () {
  const K = window.Karcis;

  function contains(text, query) {
    return text.toLocaleLowerCase("id").indexOf(query.toLocaleLowerCase("id")) !== -1;
  }

  function linear(query) {
    const steps = [];
    const needle = query.trim();
    if (!needle) return { steps, found: -1, empty: true };
    for (let i = 0; i < K.tiket.length; i += 1) {
      const tiket = K.tiket[i];
      const cocok = contains(tiket.namaLayanan, needle) || contains(tiket.penyedia, needle);
      steps.push({
        pointers: { i }, active: [i], found: cocok ? i : -1,
        message: `i = ${i}, periksa “${tiket.namaLayanan}” / ${tiket.penyedia}${cocok ? " — cocok" : " — belum cocok"}.`
      });
      if (cocok) return { steps, found: i };
    }
    return { steps, found: -1 };
  }

  function isAscending(key) {
    for (let i = 1; i < K.tiket.length; i += 1) {
      if (K.tiket[i - 1][key] > K.tiket[i][key]) return false;
    }
    return true;
  }

  function isDescending(key) {
    for (let i = 1; i < K.tiket.length; i += 1) {
      if (K.tiket[i - 1][key] < K.tiket[i][key]) return false;
    }
    return true;
  }

  function binary(field, rawTarget) {
    const key = field === "price" ? "harga" : "id";
    const target = Number(rawTarget);
    if (!Number.isFinite(target)) return { steps: [], found: -1, invalid: true };
    const ascending = isAscending(key);
    const descending = !ascending && isDescending(key);
    if (!ascending && !descending) return { steps: [], found: -1, sorted: false, key };

    const steps = [];
    let low = 0;
    let high = K.tiket.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const value = K.tiket[mid][key];
      let relation = 0;
      if (value < target) relation = -1;
      else if (value > target) relation = 1;
      const cocok = relation === 0;
      let message = `mid = ${mid}, ${formatValue(value, field)} ${cocok ? "=" : relation < 0 ? "<" : ">"} ${formatValue(target, field)}.`;
      if (!cocok) {
        const moveLow = ascending ? relation < 0 : relation > 0;
        if (moveLow) message += ` Geser low ke ${mid + 1}.`;
        else message += ` Geser high ke ${mid - 1}.`;
      } else {
        message += " Nilai ditemukan.";
      }
      steps.push({ pointers: { low, mid, high }, active: [mid], found: cocok ? mid : -1, message });
      if (cocok) return { steps, found: mid, ascending, descending };
      const moveLow = ascending ? relation < 0 : relation > 0;
      if (moveLow) low = mid + 1;
      else high = mid - 1;
    }
    steps.push({ pointers: { low, high }, active: [], found: -1, message: `low (${low}) melewati high (${high}). Nilai tidak ada.` });
    return { steps, found: -1, ascending, descending };
  }

  function formatValue(value, field) {
    if (field === "price") return `Rp${new Intl.NumberFormat("id-ID").format(value)}`;
    return String(value);
  }

  K.Search = { linear, binary };
})();
