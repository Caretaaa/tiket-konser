/* Sorting manual: setiap operasi disimpan sebagai snapshot untuk visualisasi. */
(function () {
  const K = window.Karcis;
  const state = {
    steps: [], position: 0, original: null, active: false,
    playing: false, compares: 0, swaps: 0, algorithm: "bubble",
    field: "price", direction: "asc", timer: null
  };

  function clone(items) { return items.map((item) => ({ ...item })); }
  function compare(a, b, field, direction) {
    let result;
    if (field === "price" || field === "id") result = a[field === "price" ? "harga" : "id"] - b[field === "price" ? "harga" : "id"];
    else if (field === "date") result = a.tanggal < b.tanggal ? -1 : a.tanggal > b.tanggal ? 1 : 0;
    else {
      const prop = field === "provider" ? "penyedia" : "namaLayanan";
      result = a[prop].toLocaleLowerCase("id").localeCompare(b[prop].toLocaleLowerCase("id"), "id");
    }
    return direction === "desc" ? -result : result;
  }

  function makePlan(algorithm, field, direction) {
    const items = clone(K.tiket);
    const steps = [];
    let compares = 0;
    let swaps = 0;
    const add = (kind, active, pointers, message) => {
      steps.push({ kind, active, pointers, message, items: clone(items), compares, swaps });
    };

    if (algorithm === "bubble") {
      for (let i = 0; i < items.length - 1; i += 1) {
        for (let j = 0; j < items.length - i - 1; j += 1) {
          compares += 1;
          const relation = compare(items[j], items[j + 1], field, direction);
          add("compare", [j, j + 1], { i, j }, `Bandingkan indeks ${j} dan ${j + 1}.`);
          if (relation > 0) {
            const temp = items[j];
            items[j] = items[j + 1];
            items[j + 1] = temp;
            swaps += 1;
            add("swap", [j, j + 1], { i, j }, `Tukar sel ${j} ↔ ${j + 1}.`);
          }
        }
      }
    } else if (algorithm === "selection") {
      for (let i = 0; i < items.length - 1; i += 1) {
        let min = i;
        for (let j = i + 1; j < items.length; j += 1) {
          compares += 1;
          add("compare", [min, j], { i, j, min }, `Bandingkan kandidat indeks ${min} dengan ${j}.`);
          if (compare(items[j], items[min], field, direction) < 0) {
            min = j;
            add("select", [i, min], { i, j, min }, `Kandidat terkecil sekarang di indeks ${min}.`);
          }
        }
        if (min !== i) {
          const temp = items[i];
          items[i] = items[min];
          items[min] = temp;
          swaps += 1;
          add("swap", [i, min], { i, j: min, min }, `Tukar posisi ${i} ↔ ${min}.`);
        }
      }
    } else {
      for (let i = 1; i < items.length; i += 1) {
        const key = items[i];
        let j = i - 1;
        while (j >= 0) {
          compares += 1;
          const relation = compare(items[j], key, field, direction);
          add("compare", [j, j + 1], { i, j }, `Bandingkan indeks ${j} dengan kunci dari ${i}.`);
          if (relation <= 0) break;
          items[j + 1] = items[j];
          swaps += 1;
          add("move", [j, j + 1], { i, j }, `Geser isi indeks ${j} ke ${j + 1}.`);
          j -= 1;
        }
        if (j + 1 !== i) {
          items[j + 1] = key;
          swaps += 1;
          add("insert", [j + 1, i], { i, j: j + 1 }, `Letakkan kunci pada indeks ${j + 1}.`);
        }
      }
    }

    return { steps, compares, swaps };
  }

  function stopTimer() {
    if (state.timer !== null) window.clearInterval(state.timer);
    state.timer = null;
    state.playing = false;
  }

  function updateUI(step, done) {
    if (K.UI) K.UI.onSortStep(step || null, state, done);
  }

  function start(options) {
    if (state.active && state.position < state.steps.length) reset();
    else if (state.active) commit();
    state.algorithm = options.algorithm;
    state.field = options.field;
    state.direction = options.direction;
    state.original = clone(K.tiket);
    const plan = makePlan(state.algorithm, state.field, state.direction);
    state.steps = plan.steps;
    state.position = 0;
    state.compares = 0;
    state.swaps = 0;
    state.active = true;
    updateUI(null, state.steps.length === 0);
    return state;
  }

  function step(fromPlayback) {
    if (!state.active) return false;
    if (!fromPlayback) stopTimer();
    if (state.position >= state.steps.length) {
      updateUI(null, true);
      return false;
    }
    const current = state.steps[state.position];
    state.position += 1;
    state.compares = current.compares;
    state.swaps = current.swaps;
    // Array live diperbarui dari snapshot langkah agar sel ikut berubah di layar.
    K.tiket = clone(current.items);
    K.Pointers.set(current.pointers);
    const done = state.position >= state.steps.length;
    updateUI(current, done);
    return true;
  }

  function play() {
    if (!state.active) return;
    if (state.position >= state.steps.length) return;
    if (state.playing) return;
    state.playing = true;
    const delay = K.UI ? K.UI.getSortSpeed() : 420;
    state.timer = window.setInterval(() => {
      if (!step(true)) stopTimer();
      if (state.position >= state.steps.length) stopTimer();
    }, delay);
    updateUI(null, false);
  }

  function pause() {
    stopTimer();
    updateUI(null, state.active && state.position >= state.steps.length);
  }

  function reset() {
    stopTimer();
    if (state.original !== null) K.tiket = clone(state.original);
    state.steps = [];
    state.position = 0;
    state.compares = 0;
    state.swaps = 0;
    state.active = false;
    state.original = null;
    K.Pointers.clear();
    updateUI(null, false);
  }

  function commit() {
    stopTimer();
    state.steps = [];
    state.position = 0;
    state.compares = 0;
    state.swaps = 0;
    state.active = false;
    state.original = null;
    K.Pointers.clear();
    updateUI(null, false);
  }

  function complexity(algorithm) {
    return algorithm === "insertion" ? "O(n²) · best O(n)" : "O(n²)";
  }

  function isRunning() { return state.playing; }

  K.Sort = { start, step, play, pause, reset, commit, complexity, isRunning, getState: () => state };
})();
