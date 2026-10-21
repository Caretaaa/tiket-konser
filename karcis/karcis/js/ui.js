/* Tampilan dan interaksi Karcis. Semua teks data dimasukkan sebagai teks aman. */
(function () {
  const K = window.Karcis;
  const $ = (id) => document.getElementById(id);
  const UI = { activeCells: [], foundIndex: -1, stepKind: "", searchTimer: null, debounceTimer: null, toastTimer: null, searchAfterSort: false };

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function rupiah(amount) { return `Rp${new Intl.NumberFormat("id-ID").format(amount)}`; }
  function dateLabel(value, withYear) {
    const bits = value.split("-").map(Number);
    const date = new Date(bits[0], bits[1] - 1, bits[2]);
    const options = { day: "numeric", month: "short" };
    if (withYear) options.year = "numeric";
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  }
  function findTicketIndex(id) {
    for (let i = 0; i < K.tiket.length; i += 1) if (K.tiket[i].id === Number(id)) return i;
    return -1;
  }
  function findTicket(id) {
    const index = findTicketIndex(id);
    return index < 0 ? null : K.tiket[index];
  }
  function announce(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(UI.toastTimer);
    UI.toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }
  function prepareMutation() {
    const state = K.Sort.getState();
    if (state.active && state.position < state.steps.length) K.Sort.reset();
    else if (state.active) K.Sort.commit();
  }

  function refreshCityFilter() {
    const select = $("city-filter");
    const prior = select.value;
    const cities = [];
    for (let i = 0; i < K.tiket.length; i += 1) {
      let exists = false;
      for (let j = 0; j < cities.length; j += 1) if (cities[j] === K.tiket[i].kota) exists = true;
      if (!exists) cities.push(K.tiket[i].kota);
    }
    let options = '<option value="">Semua kota</option>';
    for (let i = 0; i < cities.length; i += 1) options += `<option value="${escapeHTML(cities[i])}">${escapeHTML(cities[i])}</option>`;
    select.innerHTML = options;
    let hasPrior = prior === "";
    for (let i = 0; i < cities.length; i += 1) if (cities[i] === prior) hasPrior = true;
    select.value = hasPrior ? prior : "";
  }

  function renderTicketList(suppressArrival) {
    const query = $("search-mode").value === "binary" ? "" : $("search-input").value.trim().toLocaleLowerCase("id");
    const city = $("city-filter").value;
    const category = $("category-filter").value;
    const matches = [];
    // Filter tampilan dilakukan dengan loop, sedangkan pencarian inti ada di search.js.
    for (let i = 0; i < K.tiket.length; i += 1) {
      const ticket = K.tiket[i];
      const text = `${ticket.namaLayanan} ${ticket.penyedia}`.toLocaleLowerCase("id");
      if (query && text.indexOf(query) === -1) continue;
      if (city && ticket.kota !== city) continue;
      if (category && ticket.kategori !== category) continue;
      matches.push(ticket);
    }
    const list = $("ticket-list");
    list.classList.toggle("no-animate", Boolean(suppressArrival));
    if (matches.length === 0) {
      list.innerHTML = '<div class="empty-list">Tidak ada layanan yang cocok.</div>';
    } else {
      let cards = "";
      for (let i = 0; i < matches.length; i += 1) {
        const ticket = matches[i];
        const sold = ticket.kuota <= 0;
        const selected = ticket.id === K.selectedId;
        cards += `<button type="button" class="ticket-card${sold ? " is-sold" : ""}${selected ? " is-selected" : ""}" data-ticket-id="${ticket.id}" aria-pressed="${selected}" style="animation-delay:${suppressArrival ? 0 : Math.min(i * 28, 280)}ms">
          <span class="ticket-top"><span class="ticket-category">${escapeHTML(ticket.kategori)}</span><span>NO. ${ticket.id}</span></span>
          <h3>${escapeHTML(ticket.namaLayanan)}</h3><p class="ticket-provider">${escapeHTML(ticket.penyedia)}</p>
          <span class="ticket-bottom"><span class="ticket-place"><span>${escapeHTML(ticket.kota)} · ${escapeHTML(dateLabel(ticket.tanggal, false))}</span><span>${sold ? "PENUH" : `${ticket.kuota} ${ticket.kategori === "Hotel" ? "KAMAR" : "KURSI"}`}</span></span><span class="ticket-price">${rupiah(ticket.harga)}</span></span><span class="ticket-barcode" aria-hidden="true"></span>
        </button>`;
      }
      list.innerHTML = cards;
    }
    $("visible-count").textContent = `${matches.length} layanan`;
    $("event-count").textContent = String(K.tiket.length);
    $("array-length").textContent = `${K.tiket.length} ELEMEN`;
    list.querySelectorAll(".ticket-card").forEach((button) => button.addEventListener("click", () => selectTicket(Number(button.dataset.ticketId))));
  }

  function selectTicket(id) {
    K.selectedId = id;
    renderTicketList(true);
    renderDetail();
  }

  function renderDetail() {
    const panel = $("detail-panel");
    const ticket = findTicket(K.selectedId);
    if (!ticket) {
      panel.innerHTML = '<div class="detail-placeholder"><span class="detail-number">LAYANAN — —</span><p>Pilih perjalanan atau hotel untuk melihat rinciannya.</p></div>';
      return;
    }
    const sold = ticket.kuota <= 0;
    panel.innerHTML = `<div class="detail-content">
      <div><p class="detail-overline">NO. ${ticket.id} / ${escapeHTML(ticket.kategori)} / ${escapeHTML(ticket.kota)}</p><h3>${escapeHTML(ticket.namaLayanan)}</h3><p class="ticket-provider">${escapeHTML(ticket.penyedia)}</p><div class="detail-facts"><span>${ticket.kategori === "Hotel" ? "Check-in" : "Berangkat"} · ${escapeHTML(dateLabel(ticket.tanggal, true))}</span><span>${sold ? "Penuh" : `${ticket.kuota} ${ticket.kategori === "Hotel" ? "kamar tersedia" : "kursi tersedia"}`}</span></div></div>
      <div class="detail-actions"><span class="detail-price">${rupiah(ticket.harga)}</span><div class="detail-buttons"><button type="button" class="button-outline" id="edit-selected">Ubah</button><button type="button" class="button-ink" id="buy-selected" ${sold ? "disabled" : ""}>${sold ? "Penuh" : "Pesan →"}</button></div></div>
    </div>`;
    $("buy-selected").addEventListener("click", openBuyerDialog);
    $("edit-selected").addEventListener("click", () => openServiceDialog(ticket));
  }

  function pointerNamesAt(index) {
    const names = [];
    const pointers = K.pointers || {};
    for (const name in pointers) if (pointers[name] === index) names.push(name);
    return names;
  }

  function renderArray() {
    const memory = $("array-memory");
    const priorPositions = {};
    memory.querySelectorAll(".array-cell").forEach((cell) => { priorPositions[cell.dataset.ticketId] = cell.getBoundingClientRect().left; });
    let cells = "";
    for (let i = 0; i < K.tiket.length; i += 1) {
      const ticket = K.tiket[i];
      const pointers = pointerNamesAt(i);
      const isActive = UI.activeCells.indexOf(i) !== -1;
      const found = UI.foundIndex === i;
      let label = "";
      if (pointers.length) label = `<span class="pointer-flag">${escapeHTML(pointers.join("·"))}</span>`;
      let activityClass = "";
      if (isActive && UI.stepKind === "compare") activityClass = "compare";
      else if (isActive && UI.stepKind === "select") activityClass = "selected";
      else if (isActive) activityClass = "current";
      const classNames = ["array-cell"];
      if (activityClass) classNames.push(activityClass);
      if (found) classNames.push("found");
      const classes = classNames.join(" ");
      cells += `<div role="listitem" data-ticket-id="${ticket.id}" class="${classes}" aria-label="Indeks ${i}, ID ${ticket.id}, ${escapeHTML(ticket.namaLayanan)}">${label}<span class="array-index">[${i}]</span><span class="array-id">#${ticket.id}</span><span class="array-value">${escapeHTML(ticket.namaLayanan)}</span></div>`;
    }
    memory.innerHTML = cells || '<p class="array-caption">Array belum memiliki elemen.</p>';
    // FLIP sederhana: sel yang pindah indeks meluncur dari posisi sebelumnya.
    memory.querySelectorAll(".array-cell").forEach((cell) => {
      const oldLeft = priorPositions[cell.dataset.ticketId];
      if (oldLeft === undefined) return;
      const delta = oldLeft - cell.getBoundingClientRect().left;
      if (Math.abs(delta) < 1) return;
      cell.style.transition = "none";
      cell.style.transform = `translateX(${delta}px)`;
      cell.getBoundingClientRect();
      window.requestAnimationFrame(() => { cell.style.transition = ""; cell.style.transform = ""; });
    });
    const legend = $("pointer-legend");
    const activeNames = [];
    for (const name in K.pointers) activeNames.push(name);
    if (activeNames.length) {
      let text = "";
      for (let i = 0; i < activeNames.length; i += 1) text += `<span class="pointer-chip chip-${escapeHTML(activeNames[i])}">${escapeHTML(activeNames[i])}</span> indeks ${K.pointers[activeNames[i]]} `;
      legend.innerHTML = text;
    } else {
      legend.innerHTML = '<span class="pointer-chip chip-i">i</span> indeks <span class="pointer-chip chip-j">j</span> banding <span class="pointer-chip chip-mid">mid</span> tengah';
    }
  }

  function renderQueue() {
    const queue = K.Queue;
    $("queue-head").textContent = queue.head ? `node#${queue.head.id}` : "null";
    $("queue-tail").textContent = queue.tail ? `node#${queue.tail.id}` : "null";
    $("queue-length").textContent = String(queue.length);
    $("dequeue-button").disabled = queue.length === 0;
    let node = queue.head;
    let html = "";
    let index = 0;
    while (node !== null) {
      const data = node.data;
      html += `<div class="queue-node${index === 0 ? " is-head" : ""}"><small>node#${node.id}${index === 0 ? " · head" : ""}</small><strong>${escapeHTML(data.pembeli)}</strong><small>#${data.tiketId} · ${escapeHTML(data.namaLayanan)}</small></div>`;
      node = node.next;
      index += 1;
    }
    $("queue-track").innerHTML = html || '<span class="queue-empty">Belum ada pemesan.</span>';
  }

  function renderAll() {
    refreshCityFilter();
    renderTicketList(true);
    renderDetail();
    renderArray();
    renderQueue();
  }

  function openBuyerDialog() {
    const ticket = findTicket(K.selectedId);
    if (!ticket || ticket.kuota <= 0) return;
    $("buyer-ticket-id").value = String(ticket.id);
    $("buyer-ticket-summary").textContent = `${ticket.namaLayanan} · ${ticket.kota} · ${rupiah(ticket.harga)}`;
    $("buyer-name").value = "";
    $("buyer-email").value = "";
    $("buyer-dialog").showModal();
    $("buyer-name").focus();
  }

  function openServiceDialog(ticket) {
    const editing = Boolean(ticket);
    $("event-form").reset();
    $("event-id").value = editing ? String(ticket.id) : "";
    $("event-dialog-kicker").textContent = editing ? `UBAH DATA / NO. ${ticket.id}` : "DATA LAYANAN / ARRAY.PUSH";
    $("event-dialog-title").textContent = editing ? "Ubah layanan" : "Tambah layanan";
    $("event-name").value = editing ? ticket.namaLayanan : "";
    $("event-artist").value = editing ? ticket.penyedia : "";
    $("event-city").value = editing ? ticket.kota : "";
    $("event-date").value = editing ? ticket.tanggal : "2026-11-01";
    $("event-category").value = editing ? ticket.kategori : "Kereta";
    $("event-price").value = editing ? String(ticket.harga) : "";
    $("event-quota").value = editing ? String(ticket.kuota) : "100";
    $("save-event").textContent = editing ? "Simpan perubahan →" : "Simpan ke array →";
    $("event-dialog").showModal();
    $("event-name").focus();
  }

  function updateComplexity() {
    $("complexity").textContent = K.Sort.complexity($("sort-algorithm").value);
    if ($("sort-algorithm").value === "insertion") $("swap-count").parentElement.querySelector("small").textContent = "GESER / TULIS";
    else $("swap-count").parentElement.querySelector("small").textContent = "PERTUKARAN";
  }

  function updateSortStats(state) {
    $("compare-count").textContent = String(state.compares);
    $("swap-count").textContent = String(state.swaps);
    $("complexity").textContent = K.Sort.complexity(state.algorithm || $("sort-algorithm").value);
  }

  function sortMessage(state, step, done) {
    const fieldNames = { price: "harga", date: "tanggal", name: "nama layanan", provider: "penyedia", id: "ID" };
    if (done) return `Selesai — ${state.position} langkah. Array kini urut menurut ${fieldNames[state.field] || state.field} (${state.direction === "asc" ? "naik" : "turun"}).`;
    if (step) return `${step.message} Langkah ${state.position} / ${state.steps.length}.`;
    if (state.playing) return "Visualisasi berjalan…";
    if (state.position > 0) return `Dijeda pada langkah ${state.position} / ${state.steps.length}.`;
    return "Pilih algoritma, lalu tekan putar atau satu langkah.";
  }

  function onSortStep(step, state, done) {
    UI.activeCells = step ? step.active : [];
    UI.stepKind = step ? step.kind : "";
    UI.foundIndex = -1;
    if (!step && !state.active) K.Pointers.clear();
    updateSortStats(state);
    $("algorithm-status").textContent = sortMessage(state, step, done);
    renderTicketList(true);
    renderDetail();
    renderArray();
    if (done && UI.searchAfterSort) {
      UI.searchAfterSort = false;
      window.setTimeout(runSearch, 80);
    }
  }

  function selectedSortOptions() {
    return { algorithm: $("sort-algorithm").value, field: $("sort-field").value, direction: $("sort-direction").value };
  }

  function beginSort() {
    window.clearInterval(UI.searchTimer);
    UI.searchTimer = null;
    UI.activeCells = [];
    UI.foundIndex = -1;
    UI.stepKind = "";
    K.Pointers.clear();
    K.Sort.start(selectedSortOptions());
  }

  function animateSearch(result, type) {
    window.clearInterval(UI.searchTimer);
    UI.activeCells = [];
    UI.foundIndex = -1;
    UI.stepKind = "";
    K.Pointers.clear();
    if (result.unsorted) {
      const field = result.key === "harga" ? "price" : "id";
      const label = field === "price" ? "harga" : "ID";
      $("search-hint").textContent = `Binary search perlu array yang sudah urut menurut ${label}.`;
      $("search-log").innerHTML = `<p class="log-warning">Array belum terurut. Urutkan dulu, lalu pencarian berjalan otomatis.</p><button class="button-text" id="sort-for-search" type="button">Urutkan ${label} dulu ↗</button>`;
      $("sort-for-search").addEventListener("click", () => {
        if (K.Sort.isRunning()) K.Sort.pause();
        $("sort-field").value = field;
        $("sort-direction").value = "asc";
        UI.searchAfterSort = true;
        beginSort();
        K.Sort.play();
      });
      renderArray();
      return;
    }
    if (result.invalid || result.empty) {
      $("search-log").innerHTML = `<p class="log-warning">${result.empty ? "Masukkan kata atau angka yang ingin dicari." : "Masukkan angka yang valid."}</p>`;
      renderArray();
      return;
    }
    if (result.steps.length === 0) {
      $("search-log").innerHTML = '<p class="log-warning">Array kosong, belum ada yang bisa dicari.</p>';
      renderArray();
      return;
    }
    let cursor = 0;
    const log = $("search-log");
    log.innerHTML = "";
    const advance = () => {
      if (cursor >= result.steps.length) {
        window.clearInterval(UI.searchTimer);
        const found = result.found;
        UI.activeCells = [];
        UI.foundIndex = found;
        UI.stepKind = "";
        K.Pointers.clear();
        if (found >= 0) {
          const ticket = K.tiket[found];
          log.insertAdjacentHTML("beforeend", `<p class="log-success">Ditemukan di indeks ${found}: ${escapeHTML(ticket.namaLayanan)}.</p>`);
          K.selectedId = ticket.id;
          renderTicketList(true);
          renderDetail();
        } else {
          log.insertAdjacentHTML("beforeend", '<p class="log-warning">Tidak ditemukan di dalam array.</p>');
        }
        renderArray();
        return;
      }
      const current = result.steps[cursor];
      cursor += 1;
      const searchPointers = { ...current.pointers };
      const cursorIndex = current.active.length ? current.active[0] : (current.pointers.mid !== undefined ? current.pointers.mid : current.pointers.low);
      if (cursorIndex !== undefined) searchPointers.cursor = cursorIndex;
      K.Pointers.set(searchPointers);
      UI.activeCells = current.active;
      UI.stepKind = "search";
      UI.foundIndex = current.found >= 0 ? current.found : -1;
      log.insertAdjacentHTML("beforeend", `<p class="${current.found >= 0 ? "log-success" : ""}">${escapeHTML(current.message)}</p>`);
      log.scrollTop = log.scrollHeight;
      renderArray();
      if (cursor >= result.steps.length) {
        window.clearInterval(UI.searchTimer);
        UI.searchTimer = window.setTimeout(advance, 240);
      }
    };
    advance();
    if (result.steps.length > 1) UI.searchTimer = window.setInterval(advance, 570);
    $("search-hint").textContent = type === "binary" ? "Low, mid, dan high menutup ruang pencarian di tiap langkah." : "Linear search memeriksa nama layanan dan penyedia dari kiri ke kanan.";
  }

  function runSearch() {
    if (K.Sort.isRunning()) K.Sort.pause();
    const mode = $("search-mode").value;
    const input = $("search-input").value.trim();
    if (!input) {
      animateSearch({ steps: [], found: -1, empty: true }, mode);
      return;
    }
    if (mode === "linear") {
      animateSearch(K.Search.linear(input), "linear");
    } else {
      const field = $("binary-field").value;
      const target = input.replace(/[Rp.\s]/gi, "").replace(/,/g, "");
      const result = K.Search.binary(field, target);
      if (result.sorted === false) {
        result.unsorted = true;
        result.key = field === "price" ? "harga" : "id";
      }
      animateSearch(result, "binary");
    }
  }

  function handleSortPlay() {
    const state = K.Sort.getState();
    if (!state.active || state.position >= state.steps.length) beginSort();
    K.Sort.play();
  }

  function attachEvents() {
    $("search-input").addEventListener("input", () => {
      window.clearInterval(UI.searchTimer);
      UI.searchTimer = null;
      UI.activeCells = [];
      UI.foundIndex = -1;
      UI.stepKind = "";
      K.Pointers.clear();
      window.clearTimeout(UI.debounceTimer);
      UI.debounceTimer = window.setTimeout(() => { renderTicketList(true); renderArray(); }, 240);
    });
    $("city-filter").addEventListener("change", () => renderTicketList(true));
    $("category-filter").addEventListener("change", () => renderTicketList(true));
    const sortConfigChanged = () => {
      const state = K.Sort.getState();
      if (state.active && state.position < state.steps.length) K.Sort.reset();
      updateComplexity();
    };
    $("sort-algorithm").addEventListener("change", sortConfigChanged);
    $("sort-field").addEventListener("change", sortConfigChanged);
    $("sort-direction").addEventListener("change", sortConfigChanged);
    $("sort-speed").addEventListener("input", () => {
      $("speed-value").textContent = `${$("sort-speed").value} ms`;
      if (K.Sort.isRunning()) { K.Sort.pause(); K.Sort.play(); }
    });
    $("play-sort").addEventListener("click", handleSortPlay);
    $("pause-sort").addEventListener("click", () => K.Sort.pause());
    $("step-sort").addEventListener("click", () => {
      const state = K.Sort.getState();
      if (!state.active || state.position >= state.steps.length) beginSort();
      K.Sort.step();
    });
    $("reset-sort").addEventListener("click", () => { UI.searchAfterSort = false; K.Sort.reset(); });
    $("search-mode").addEventListener("change", () => {
      const binary = $("search-mode").value === "binary";
      $("binary-field-wrap").classList.toggle("hidden", !binary);
      $("search-input").placeholder = binary ? "ID booking atau harga (angka)" : "Nama layanan atau penyedia";
      $("search-hint").textContent = binary ? "Binary search hanya berjalan jika array sudah terurut." : "Linear search memeriksa nama layanan dan penyedia dari kiri ke kanan.";
      renderTicketList(true);
    });
    $("run-search").addEventListener("click", runSearch);
    $("search-input").addEventListener("keydown", (event) => { if (event.key === "Enter") runSearch(); });
    $("remove-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const index = Number($("remove-index").value);
      if (!Number.isInteger(index) || index < 0 || index >= K.tiket.length) {
        $("data-feedback").textContent = `Indeks harus di antara 0 dan ${K.tiket.length - 1}.`;
        return;
      }
      prepareMutation();
      const removed = K.Array.hapus(index);
      if (removed && removed.id === K.selectedId) K.selectedId = null;
      $("remove-index").value = "";
      $("data-feedback").textContent = `Indeks ${index} dihapus; sel setelahnya bergeser satu posisi.`;
      UI.activeCells = [];
      K.Pointers.clear();
      renderAll();
    });
    $("add-event").addEventListener("click", () => openServiceDialog(null));
    $("event-form").addEventListener("submit", (event) => {
      event.preventDefault();
      prepareMutation();
      const id = $("event-id").value;
      const record = {
        namaLayanan: $("event-name").value.trim(), penyedia: $("event-artist").value.trim(),
        kota: $("event-city").value.trim(), tanggal: $("event-date").value,
        kategori: $("event-category").value, harga: Number($("event-price").value), kuota: Number($("event-quota").value)
      };
      if (id) {
        const index = findTicketIndex(id);
        if (index >= 0) K.Array.ubah(index, record);
        K.selectedId = Number(id);
        $("data-feedback").textContent = `Layanan #${id} diperbarui.`;
        announce(`Data ${record.namaLayanan} diperbarui.`);
      } else {
        record.id = K.nextId;
        K.nextId += 1;
        const index = K.Array.tambah(record);
        K.selectedId = record.id;
        $("data-feedback").textContent = `Layanan #${record.id} ditambahkan pada indeks ${index}.`;
        announce(`${record.namaLayanan} ditambahkan di indeks ${index}.`);
      }
      UI.activeCells = [];
      K.Pointers.clear();
      $("event-dialog").close();
      renderAll();
    });
    $("buyer-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const id = Number($("buyer-ticket-id").value);
      const index = findTicketIndex(id);
      if (index < 0 || K.tiket[index].kuota <= 0) {
        $("buyer-dialog").close();
        announce("Maaf, kursi atau kamar sudah penuh.");
        return;
      }
      prepareMutation();
      const ticket = K.tiket[index];
      const buyer = { pembeli: $("buyer-name").value.trim(), email: $("buyer-email").value.trim(), tiketId: ticket.id, namaLayanan: ticket.namaLayanan, penyedia: ticket.penyedia, tanggal: ticket.tanggal, kategori: ticket.kategori };
      K.Queue.enqueue(buyer);
      K.Array.ubah(index, { kuota: ticket.kuota - 1 });
      K.selectedId = ticket.id;
      $("buyer-dialog").close();
      UI.activeCells = [];
      K.Pointers.clear();
      renderAll();
      announce(`Booking #${ticket.id} masuk antrian.`);
    });
    $("dequeue-button").addEventListener("click", () => {
      const next = K.Queue.dequeue();
      if (!next) return;
      renderQueue();
      announce(`${next.pembeli} dilayani untuk booking #${next.tiketId}.`);
    });
    document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => $(button.dataset.close).close()));
    $("theme-toggle").addEventListener("click", () => {
      const dark = document.body.classList.toggle("dark");
      $("theme-toggle").setAttribute("aria-label", dark ? "Aktifkan mode terang" : "Aktifkan mode gelap");
      $("theme-label").textContent = dark ? "Mode kertas" : "Mode tinta";
      document.querySelector('meta[name="theme-color"]').content = dark ? "#1b1a17" : "#f3efe6";
    });
    $("tab-events").addEventListener("click", () => setMobileTab("events"));
    $("tab-lab").addEventListener("click", () => setMobileTab("lab"));
    document.addEventListener("keydown", (event) => {
      if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        event.preventDefault();
        $("search-input").focus();
      }
    });
  }

  function setMobileTab(which) {
    const events = which === "events";
    $("events-column").classList.toggle("mobile-active", events);
    $("lab-column").classList.toggle("mobile-active", !events);
    $("tab-events").setAttribute("aria-selected", String(events));
    $("tab-lab").setAttribute("aria-selected", String(!events));
  }

  UI.renderAll = renderAll;
  UI.renderArray = renderArray;
  UI.renderTicketList = renderTicketList;
  UI.onSortStep = onSortStep;
  UI.getSortSpeed = () => Number($("sort-speed").value);

  document.addEventListener("DOMContentLoaded", () => {
    attachEvents();
    updateComplexity();
    refreshCityFilter();
    renderAll();
  });
  K.UI = UI;
})();
