/* ============ DATA (array of objects) ============ */
const events = [
  {id:1, name:"Coldplay", image:"assets/coldplay.jpg", imageAlt:"Coldplay tampil di panggung di hadapan penonton", tour:"Music of the Spheres", city:"Jakarta", venue:"Stadion Utama GBK", date:"2026-11-14", genre:"Pop Rock", sold:92, g:["#1c3557","#e0a93f"],
   tiers:[["CAT 3 — Tribun atas",1200000,"Pandangan luas ke panggung"],["CAT 2 — Tribun bawah",2500000,"Sudut pandang sejajar panggung"],["CAT 1 — Tribun VIP",4500000,"Kursi bernomor, dekat panggung"],["Festival A",6200000,"Berdiri, zona terdepan"]]},
  {id:2, name:"Taylor Swift", image:"assets/taylor-swift-haunted-speak-now-world-tour.jpg", imageAlt:"Taylor Swift tampil dalam tur Speak Now", tour:"The Eras Tour", city:"Singapura", venue:"National Stadium", date:"2026-12-05", genre:"Pop", sold:100, g:["#5b2a3c","#d8a05b"],
   tiers:[["Kategori 4",1800000,"Tribun atas"],["Kategori 2",4800000,"Tribun tengah"],["VIP Package",12000000,"Kursi premium dan merchandise"]]},
  {id:3, name:"BLACKPINK", image:"assets/20190518-blackpink-amsterdam-concert-22-cropped.jpg", imageAlt:"BLACKPINK tampil bersama di atas panggung", tour:"Born Pink Encore", city:"Jakarta", venue:"Indonesia Arena", date:"2026-12-12", genre:"K-Pop", sold:88, g:["#2a1f2e","#d86b8a"],
   tiers:[["Silver",1800000,"Tribun samping"],["Gold",3200000,"Tribun depan"],["Platinum",5800000,"Dekat catwalk"],["VIP Standing",8500000,"Berdiri, akses cepat masuk"]]},
  {id:4, name:"Ed Sheeran", image:"assets/ed-sheeran-8507731877.jpg", imageAlt:"Potret Ed Sheeran", tour:"Loop Tour", city:"Bali", venue:"GWK Cultural Park", date:"2027-01-23", genre:"Pop", sold:61, g:["#2f4a3a","#e6c27a"],
   tiers:[["General Admission",1500000,"Area terbuka, berdiri"],["Premium Seated",3000000,"Kursi bernomor"],["Front of Stage",5200000,"Zona depan panggung"]]},
  {id:5, name:"Bruno Mars", image:"assets/bruno-mars-concert-houston-2.jpg", imageAlt:"Bruno Mars tampil sambil bermain gitar", tour:"Silk Sonic Nights", city:"Jakarta", venue:"JIS", date:"2027-02-06", genre:"Pop", sold:74, g:["#3a2410","#d9953a"],
   tiers:[["Tribun",1400000,"Kursi tribun atas"],["Gold Seat",3400000,"Tribun bawah"],["Pit",7000000,"Berdiri dekat panggung"]]},
  {id:6, name:"Dewa 19", image:"assets/dewa-19-montage.jpg", imageAlt:"Kolase para anggota Dewa 19", tour:"Pestapora Dewa", city:"Surabaya", venue:"Gelora Bung Tomo", date:"2026-11-28", genre:"Rock", sold:67, g:["#3a1a14","#c9a45c"],
   tiers:[["Festival",450000,"Berdiri, area umum"],["Tribun",750000,"Kursi tribun"],["VIP",1750000,"Area depan, kursi bernomor"]]},
  {id:7, name:"Tulus", image:"assets/tulus-on-manusia-tour-2023.jpg", imageAlt:"Tulus tampil di tur Manusia", tour:"Manusia Kuat Live", city:"Bandung", venue:"Sabuga ITB", date:"2026-11-07", genre:"Pop", sold:55, g:["#1f3a40","#a9c7b4"],
   tiers:[["Tribun",350000,"Kursi tribun"],["Regular",650000,"Kursi tengah"],["Premium",1200000,"Baris depan"]]},
  {id:8, name:"Raisa", image:"assets/raisa-at-dental-project-2015-2.jpg", imageAlt:"Raisa tampil di panggung", tour:"Heart to Heart", city:"Yogyakarta", venue:"Prambanan Open Stage", date:"2026-12-19", genre:"Pop", sold:48, g:["#3c2a40","#e3b6a1"],
   tiers:[["Festival",400000,"Area umum"],["Regular",800000,"Kursi bernomor"],["VIP",1600000,"Baris depan dan welcome drink"]]},
  {id:9, name:"Sheila on 7", image:"assets/sheila-on-7.jpg", imageAlt:"Sheila on 7 tampil bersama di panggung", tour:"Tunggu Aku Di", city:"Surabaya", venue:"Grand City Convex", date:"2027-01-09", genre:"Rock", sold:81, g:["#4a3a14","#f0d28a"],
   tiers:[["Festival",380000,"Berdiri"],["CAT 2",700000,"Tribun"],["CAT 1",1300000,"Kursi VIP"]]},
  {id:10, name:"The Weeknd", image:"assets/the-weeknd-performing-live-in-hong-kong.jpg", imageAlt:"The Weeknd bernyanyi di konser Hong Kong", tour:"After Hours Til Dawn", city:"Singapura", venue:"Sands Expo Hall", date:"2027-03-13", genre:"R&B", sold:79, g:["#2b0f14","#c4472d"],
   tiers:[["Level 2",1900000,"Balkon"],["Level 1",3600000,"Kursi lantai"],["Standing Pit",6800000,"Berdiri dekat panggung"]]},
  {id:11, name:"Jason Mraz", image:"assets/jason-mraz-3.jpg", imageAlt:"Jason Mraz tampil sambil bermain gitar", tour:"Good Vibes Acoustic", city:"Bali", venue:"Taman Bhagawan", date:"2026-11-21", genre:"Akustik", sold:38, g:["#27432f","#d9cf8e"],
   tiers:[["Lawn",900000,"Duduk di rumput"],["Garden Seat",1800000,"Kursi taman"],["Sunset Table",3800000,"Meja untuk 4 orang"]]},
  {id:12, name:"Westlife", image:"assets/westlife-2011.jpg", imageAlt:"Westlife tampil di panggung", tour:"The Wild Dreams", city:"Jakarta", venue:"Istora Senayan", date:"2027-02-27", genre:"Pop", sold:58, g:["#1a2c4a","#9fb7d6"],
   tiers:[["Tribun",1100000,"Kursi tribun"],["Gold",2300000,"Kursi bernomor"],["Platinum",4200000,"Baris depan"]]},
  {id:13, name:"Hindia", image:"assets/daniel-baskara-putra-hindia.jpg", imageAlt:"Hindia tampil di panggung", tour:"Lagipula Hidup Akan Berakhir", city:"Jakarta", venue:"Beach City Stadium", date:"2026-12-27", genre:"Indie", sold:70, g:["#222b34","#e2a25a"],
   tiers:[["Festival",550000,"Berdiri"],["Reguler",900000,"Tribun"],["Front Row",1750000,"Zona depan"]]},
  {id:14, name:"Martin Garrix", image:"assets/martin-garrix-americas-tour-new-york-show.jpg", imageAlt:"Martin Garrix memainkan DJ set di festival", tour:"Synergy Asia", city:"Bali", venue:"Potato Head Beach Club", date:"2027-01-30", genre:"Elektronik", sold:84, g:["#10243a","#4fb3b3"],
   tiers:[["Early Entry",1300000,"Akses area umum"],["Dance Floor",2600000,"Zona depan DJ booth"],["Cabana",9000000,"Cabana pribadi 6 orang"]]}
].map(e => ({...e, tiers: e.tiers.map(([name,price,note]) => ({name,price,note})), price: Math.min(...e.tiers.map(t=>t[1]))}));

/* ============ FORMAT ============ */
const rp = n => "Rp " + new Intl.NumberFormat("id-ID").format(n);
const short = n => n >= 1e6 ? (n/1e6).toFixed(n%1e6?1:0).replace(".",",")+"jt" : Math.round(n/1e3)+"rb";
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const dt = iso => { const d = new Date(iso+"T00:00:00");
  return {day:d.getDate(), mon:d.toLocaleDateString("id-ID",{month:"short"}), yr:d.getFullYear(), short:d.toLocaleDateString("id-ID",{weekday:"short",day:"numeric",month:"short",year:"numeric"}), full:d.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}; };

/* ============ SORTING (diimplementasi manual) ============ */
let cmpCount = 0;
const keyOf = (e,k) => k==="name" ? e.name.toLowerCase() : e[k];
const makeCmp = (key,dir) => (a,b) => { cmpCount++; const x=keyOf(a,key), y=keyOf(b,key); return (x<y?-1:x>y?1:0)*dir; };

function insertionSort(src, cmp){
  const a = src.slice();
  for (let i = 1; i < a.length; i++){
    const cur = a[i]; let j = i - 1;           // j = pointer ke elemen terurut terakhir
    while (j >= 0 && cmp(a[j], cur) > 0){ a[j+1] = a[j]; j--; }
    a[j+1] = cur;
  }
  return a;
}
function mergeSort(src, cmp){
  if (src.length < 2) return src.slice();
  const mid = src.length >> 1;
  const L = mergeSort(src.slice(0,mid), cmp), R = mergeSort(src.slice(mid), cmp);
  const out = []; let i = 0, j = 0;            // dua pointer, i di kiri dan j di kanan
  while (i < L.length && j < R.length) out.push(cmp(L[i], R[j]) <= 0 ? L[i++] : R[j++]);
  while (i < L.length) out.push(L[i++]);
  while (j < R.length) out.push(R[j++]);
  return out;
}
function quickSort(src, cmp){
  const a = src.slice();
  (function qs(lo, hi){
    if (lo >= hi) return;
    const pivot = a[(lo+hi) >> 1]; let i = lo, j = hi;
    while (i <= j){
      while (cmp(a[i], pivot) < 0) i++;
      while (cmp(a[j], pivot) > 0) j--;
      if (i <= j){ [a[i], a[j]] = [a[j], a[i]]; i++; j--; }
    }
    qs(lo, j); qs(i, hi);
  })(0, a.length - 1);
  return a;
}
const sorters = {insertion:insertionSort, merge:mergeSort, quick:quickSort};

/* ============ SEARCHING ============ */
function linearSearch(arr, q){
  let steps = 0; const out = [];
  for (let i = 0; i < arr.length; i++){
    steps++; const e = arr[i];
    if ((e.name+" "+e.tour+" "+e.city+" "+e.genre+" "+e.venue).toLowerCase().includes(q)) out.push(e);
  }
  return {out, steps};
}
function binarySearchPrefix(arr, q){
  const byName = mergeSort(arr, makeCmp("name",1));      // syarat: array harus terurut
  let lo = 0, hi = byName.length, steps = 0;
  while (lo < hi){
    steps++; const mid = (lo + hi) >> 1;
    if (byName[mid].name.toLowerCase() < q) lo = mid + 1; else hi = mid;
  }
  const start = lo, out = [];
  while (lo < byName.length && byName[lo].name.toLowerCase().startsWith(q)){ out.push(byName[lo]); lo++; }
  return {out, steps, start};
}
function twoPointerRange(sortedByPrice, min, max){
  const n = sortedByPrice.length; let L = 0, R = n - 1, moves = 0;
  while (L < n && sortedByPrice[L].price < min){ L++; moves++; }
  while (R >= 0 && sortedByPrice[R].price > max){ R--; moves++; }
  return {out: L <= R ? sortedByPrice.slice(L, R+1) : [], L, R, moves};
}

/* ============ STATE ============ */
const state = {q:"", mode:"linear", key:"date", dir:1, algo:"merge", genre:"Semua", min:0, max:12000000};
const cart = [];
const $ = s => document.querySelector(s);

/* ============ PIPELINE ============ */
function run(){
  const log = []; const q = state.q.trim().toLowerCase();
  let list = events;

  // 1. pencarian
  if (q){
    if (state.mode === "linear"){
      const r = linearSearch(events, q); list = r.out;
      log.push(["Pencarian", `<strong>Linear search</strong> memeriksa ${r.steps} elemen satu per satu, ${r.out.length} cocok di nama, tur, kota, genre, atau venue.`]);
    } else {
      const r = binarySearchPrefix(events, q); list = r.out;
      log.push(["Pencarian", `<strong>Binary search</strong> pada nama artis terurut: ${r.steps} langkah, awalan "${esc(q)}" mulai di indeks ${r.start}, ${r.out.length} cocok.`]);
    }
  } else log.push(["Pencarian", `Kata kunci kosong, semua ${events.length} konser ditampilkan.`]);

  // 2. filter genre
  if (state.genre !== "Semua"){
    const before = list.length; list = list.filter(e => e.genre === state.genre);
    log.push(["Genre", `Disaring ke <strong>${esc(state.genre)}</strong>, ${before} menjadi ${list.length}.`]);
  }

  // 3. rentang harga dengan dua pointer
  cmpCount = 0;
  const byPrice = mergeSort(list, makeCmp("price",1));
  const rng = twoPointerRange(byPrice, state.min, state.max);
  const stripData = {byPrice, L:rng.L, R:rng.R};
  list = rng.out;
  log.push(["Dua pointer", `Pointer kiri berhenti di <strong>${rng.L}</strong>, kanan di <strong>${rng.R}</strong> setelah ${rng.moves} langkah. Sisa ${list.length} konser.`]);

  // 4. urutkan
  cmpCount = 0;
  list = sorters[state.algo](list, makeCmp(state.key, state.dir));
  const nm = {insertion:"Insertion sort", merge:"Merge sort", quick:"Quick sort"}[state.algo];
  log.push(["Pengurutan", `<strong>${nm}</strong> menurut ${{date:"tanggal",price:"harga",name:"nama",sold:"peminat"}[state.key]} (${state.dir>0?"naik":"turun"}): ${cmpCount} perbandingan.`]);

  return {list, log, stripData};
}

/* ============ RENDER ============ */
function ticketHTML(e){
  const d = dt(e.date), out = e.sold >= 100, low = e.sold >= 85 && !out;
  return `<button class="ticket ${out?"sold":""}" data-id="${e.id}" ${out?"disabled":""} aria-label="${esc(e.name)}, ${esc(e.city)}, ${d.full}">
    <div class="stub">
      <img class="artist-photo artist-${e.id}" src="${esc(e.image)}" alt="${esc(e.imageAlt)}" loading="lazy" decoding="async">
    </div>
    <span class="notch t"></span><span class="notch b"></span>
    <div class="info">
      <span class="genre">${esc(e.genre)}</span>
      <h3>${esc(e.name)}</h3>
      <span class="tour">${esc(e.tour)}</span>
      <div class="where">${esc(e.venue)} <span>· ${esc(e.city)}</span></div>
      <div class="when">${esc(d.short)}</div>
      <div class="bottom">
        <div><div class="from">Mulai dari</div><div class="amt">${rp(e.price)}</div></div>
        ${out?'<span class="badge out">Habis</span>':low?'<span class="badge low">Hampir habis</span>':`<span class="badge">${e.sold}% terjual</span>`}
      </div>
      <div class="meter"><i style="width:${e.sold}%"></i></div>
    </div>
  </button>`;
}

function render(){
  const {list} = run();
  $("#grid").innerHTML = list.length ? list.map(ticketHTML).join("") :
    `<div class="empty"><h3>Tidak ada konser yang cocok</h3><p>Coba ganti kata kunci atau longgarkan rentang harga.</p></div>`;
  $("#count").innerHTML = `<b>${list.length}</b> dari ${events.length} konser`;
  $("#vmin").textContent = rp(state.min); $("#vmax").textContent = rp(state.max);

}

/* ============ EVENTS ============ */
const genres = ["Semua", ...[...new Set(events.map(e=>e.genre))].sort()];
$("#chips").innerHTML = genres.map(g=>`<button class="chip" data-genre="${g}" aria-pressed="${g==="Semua"}">${g}</button>`).join("");

let t; $("#q").addEventListener("input", e => { clearTimeout(t); t = setTimeout(()=>{state.q=e.target.value; render();},120); });
$("#chips").onclick = e => { const b=e.target.closest("[data-genre]"); if(!b)return; state.genre=b.dataset.genre; document.querySelectorAll(".chip").forEach(x=>x.setAttribute("aria-pressed",x===b)); render(); };
$("#sortKey").onchange = e => { state.key=e.target.value; render(); };
$("#dir").onclick = () => { state.dir*=-1; $("#dir").textContent = state.dir>0?"↑":"↓"; render(); };
$("#pmin").oninput = e => { state.min=Math.min(+e.target.value,state.max); e.target.value=state.min; render(); };
$("#pmax").oninput = e => { state.max=Math.max(+e.target.value,state.min); e.target.value=state.max; render(); };
$("#grid").onclick = e => { const b=e.target.closest(".ticket"); if(b && !b.disabled) openDetail(+b.dataset.id); };
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!reduceMotion.matches) {
  const grid = $("#grid");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const root = document.documentElement;
  let releaseTimer;

  function showGlow(e) {
    root.style.setProperty("--cursor-x", `${e.clientX}px`);
    root.style.setProperty("--cursor-y", `${e.clientY}px`);
    root.style.setProperty("--cursor-glow-opacity", "1");
  }
  function hideGlow() {
    root.style.setProperty("--cursor-glow-opacity", "0");
  }

  function resetCardMotion(card) {
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--photo-x", "0px");
    card.style.setProperty("--photo-y", "0px");
  }

  document.addEventListener("pointermove", e => {
    if (e.pointerType === "touch") return;
    showGlow(e);
  });

  document.addEventListener("touchstart", e => {
    if (!e.touches.length) return;
    clearTimeout(releaseTimer);
    showGlow(e.touches[0]);
  }, {passive:true});

  document.addEventListener("touchmove", e => {
    if (e.touches.length) showGlow(e.touches[0]);
  }, {passive:true});

  document.addEventListener("touchend", e => {
    if (e.touches.length) showGlow(e.touches[0]);
    else releaseTimer = setTimeout(hideGlow, 360);
  }, {passive:true});

  document.addEventListener("touchcancel", e => {
    if (e.touches.length) showGlow(e.touches[0]);
    else hideGlow();
  }, {passive:true});

  document.addEventListener("pointerout", e => {
    if (e.pointerType !== "touch" && !e.relatedTarget) hideGlow();
  });
  window.addEventListener("blur", hideGlow);

  grid.addEventListener("pointermove", e => {
    const card = e.target.closest(".ticket:not([disabled])");
    if (!card || !finePointer.matches || (e.pointerType !== "mouse" && e.pointerType !== "pen")) return;
    const r = card.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.setProperty("--tilt-x", `${(-y * 2.4).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(x * 2.4).toFixed(2)}deg`);
    card.style.setProperty("--photo-x", `${(x * 6).toFixed(1)}px`);
    card.style.setProperty("--photo-y", `${(y * 6).toFixed(1)}px`);
  });

  grid.addEventListener("pointerout", e => {
    if (e.pointerType === "touch") return;
    const card = e.target.closest(".ticket");
    if (!card || (e.relatedTarget && card.contains(e.relatedTarget))) return;
    resetCardMotion(card);
  });
}

/* ============ DETAIL ============ */
function openDetail(id){
  const e = events.find(x=>x.id===id), d = dt(e.date), dlg = $("#detail"), qty = e.tiers.map(()=>0);
  dlg.innerHTML = `<div class="dlg-head"><button class="x" aria-label="Tutup" data-close>×</button>
      <span class="genre">${esc(e.genre)}</span><h2>${esc(e.name)}</h2>
      <p>${esc(e.tour)} · ${esc(e.venue)}, ${esc(e.city)}<br>${d.full}</p></div>
    <div class="dlg-body">${e.tiers.map((t,i)=>`<div class="tier"><div><h4>${esc(t.name)}</h4><small>${esc(t.note)}</small></div>
      <span class="p">${rp(t.price)}</span>
      <div class="qty"><button data-dec="${i}" aria-label="Kurangi">−</button><output id="q${i}">0</output><button data-inc="${i}" aria-label="Tambah">+</button></div></div>`).join("")}</div>
    <div class="dlg-foot"><div class="total"><small>Subtotal</small><b id="sub">${rp(0)}</b></div><button class="btn" id="add" disabled>Tambah ke pesanan</button></div>`;
  const upd = () => { const s=e.tiers.reduce((a,t,i)=>a+t.price*qty[i],0); $("#sub").textContent=rp(s); $("#add").disabled=!s; e.tiers.forEach((_,i)=>$("#q"+i).textContent=qty[i]); };
  dlg.onclick = ev => {
    if (ev.target.matches("[data-close]") || ev.target===dlg) return dlg.close();
    const inc=ev.target.dataset.inc, dec=ev.target.dataset.dec;
    if (inc!==undefined) { qty[inc]=Math.min(6,qty[inc]+1); upd(); }
    if (dec!==undefined) { qty[dec]=Math.max(0,qty[dec]-1); upd(); }
    if (ev.target.id==="add"){
      e.tiers.forEach((t,i)=>{ if(!qty[i])return;
        const ex = cart.find(c=>c.eid===e.id&&c.tier===t.name);
        ex ? ex.qty+=qty[i] : cart.push({eid:e.id,name:e.name,date:e.date,city:e.city,tier:t.name,price:t.price,qty:qty[i]}); });
      updCart(); dlg.close(); openCart();
    }
  };
  dlg.showModal();
}

/* ============ KERANJANG ============ */
const updCart = () => $("#cartCount").textContent = cart.reduce((a,c)=>a+c.qty,0);
function openCart(){
  const dlg = $("#cartDlg"), total = cart.reduce((a,c)=>a+c.price*c.qty,0);
  dlg.innerHTML = `<div class="dlg-head"><button class="x" aria-label="Tutup" data-close>×</button><h2>Pesanan Anda</h2>
    <p>${cart.length ? "Periksa kembali sebelum membayar." : "Belum ada tiket yang dipilih."}</p></div>
    <div class="dlg-body">${cart.map((c,i)=>`<div class="line-item"><h4>${esc(c.name)} — ${esc(c.tier)}</h4><span class="p">${rp(c.price*c.qty)}</span>
      <small>${c.qty} × ${rp(c.price)} · ${dt(c.date).full}, ${esc(c.city)}</small><button class="rm" data-rm="${i}">Hapus</button></div>`).join("")}</div>
    <div class="dlg-foot"><div class="total"><small>Total</small><b>${rp(total)}</b></div>
    <div style="display:flex;gap:10px"><button class="btn ghost" data-close>Lanjut belanja</button><button class="btn" id="pay" ${cart.length?"":"disabled"}>Bayar</button></div></div>`;
  dlg.onclick = ev => {
    if (ev.target.matches("[data-close]") || ev.target===dlg) return dlg.close();
    if (ev.target.dataset.rm!==undefined){ cart.splice(+ev.target.dataset.rm,1); updCart(); openCart(); }
    if (ev.target.id==="pay"){
      const code = "PNT-" + Math.random().toString(36).slice(2,8).toUpperCase(), n = cart.reduce((a,c)=>a+c.qty,0);
      cart.length = 0; updCart();
      dlg.innerHTML = `<div class="done"><span class="eyebrow">Pembayaran diterima</span><h2>Sampai jumpa di depan panggung</h2>
        <div class="code">${code}</div><p>${n} tiket sudah dipesan. Tunjukkan kode ini di pintu masuk. Ini hanya simulasi, tidak ada pembayaran yang diproses.</p>
        <button class="btn" data-close>Selesai</button></div>`;
    }
  };
  if (!dlg.open) dlg.showModal();
}
$("#openCart").onclick = openCart;

render();
