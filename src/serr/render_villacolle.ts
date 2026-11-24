import {
  PACKAGING_HUNT_ITEMS,
  SEASONAL_PRODUCE,
  SUPERMARKET_CATALOG,
  type PackagingItem
} from "./data_scientific.ts";
import {
  VILLACOLLE_SUPPLY_CHAINS,
  VILLA_MATCH_PAIRS,
  VILLA_QUIZ_20
} from "./data_games_quizzes.ts";
import { INTRO_VIDEOS } from "./data_intro_videos.ts";
import { renderSupportVideoWidget } from "./render_videos.ts";
import type { SerrLabPersistedState } from "./persistence.ts";

export interface VillacolleContext {
  state: SerrLabPersistedState;
  saveAndRefresh: () => void;
  markActivityDone: (id: string, xp?: number) => void;
  recordGameScore: (gameId: string, score: number, total: number) => void;
  navigateTo: (tab: string) => void;
  esc: (s: string) => string;
}

const MONTHS_IT = [
  { m: 1, name: "Gennaio" }, { m: 2, name: "Febbraio" }, { m: 3, name: "Marzo" },
  { m: 4, name: "Aprile" }, { m: 5, name: "Maggio" }, { m: 6, name: "Giugno" },
  { m: 7, name: "Luglio" }, { m: 8, name: "Agosto" }, { m: 9, name: "Settembre" },
  { m: 10, name: "Ottobre" }, { m: 11, name: "Novembre" }, { m: 12, name: "Dicembre" }
];

const VILLA_VIDEOS = INTRO_VIDEOS.filter((v) => v.topicId === "villacolle");

const uiState = {
  subTab: "home" as "home" | "lezione" | "b1" | "b2" | "b3" | "b4" | "b5" | "giochi",
  lessonVideoIdx: 0,
  lessonVideoMode: "embed" as "embed" | "offline",
  lessonVideoSceneIdx: 0,
  b1ChainId: "short_seasonal",
  b2Month: 11,
  b2GameAnswers: {} as Record<string, string>,
  b2GameChecked: false,
  b3CartIds: ["mele_locali", "pane_forno"] as string[],
  b3Budget: 18,
  b4SelectedId: PACKAGING_HUNT_ITEMS[0].id,
  b4DragSet: "set1" as "set1" | "set2" | "all",
  b4DragPlacements: {} as Record<string, PackagingItem["disposalBucket"]>,
  b4SelectedBucketItem: "" as string,
  b4TareNetG: 200,
  b4TareGrossG: 250,
  b5SnackFood: "Mela locale sfusa o arancia di stagione",
  b5SnackCarb: "Pane o focaccia del forno locale (no incarti)",
  b5SnackDrink: "Acqua del rubinetto in borraccia lavabile",
  b5Container: "Portamerenda rigido riutilizzabile + tovagliolo in stoffa",
  b5Note: "Avanzi eventuali riportati a casa nel portamerenda",
  quizAgeFilter: "tutte" as "tutte" | "primaria" | "media",
  quizAnswers: {} as Record<string, number>,
  quizSubmitted: false,
  matchLeftSelected: "" as string,
  matchPairsSolved: [] as string[],
  matchError: ""
};

export function setVillacolleSubTab(tab: typeof uiState.subTab): void {
  uiState.subTab = tab;
}

export function renderVillacolleView(container: HTMLElement, ctx: VillacolleContext): void {
  const subNav = `
    <div class="serr-subnav" role="tablist" aria-label="Attività Percorso Villacolle">
      <button type="button" class="serr-pill ${uiState.subTab === "home" ? "active" : ""}" data-v-tab="home">Panoramica</button>
      <button type="button" class="serr-pill ${uiState.subTab === "lezione" ? "active" : ""}" data-v-tab="lezione">Lezione Completa &amp; Video</button>
      <button type="button" class="serr-pill ${uiState.subTab === "b1" ? "active" : ""}" data-v-tab="b1">B1 · Viaggio del Cibo (7 tappe)</button>
      <button type="button" class="serr-pill ${uiState.subTab === "b2" ? "active" : ""}" data-v-tab="b2">B2 · Calendario Stagionalità (22)</button>
      <button type="button" class="serr-pill ${uiState.subTab === "b3" ? "active" : ""}" data-v-tab="b3">B3 · Spesa a Km Zero</button>
      <button type="button" class="serr-pill ${uiState.subTab === "b4" ? "active" : ""}" data-v-tab="b4">B4 · Imballaggi &amp; Tara (15)</button>
      <button type="button" class="serr-pill ${uiState.subTab === "b5" ? "active" : ""}" data-v-tab="b5">B5 · Merenda Zero Rifiuti</button>
      <button type="button" class="serr-pill ${uiState.subTab === "giochi" ? "active" : ""}" data-v-tab="giochi">Quiz &amp; Verifiche (20 + 8)</button>
    </div>
  `;

  let bodyHtml = "";
  if (uiState.subTab === "home") bodyHtml = renderHome(ctx);
  else if (uiState.subTab === "lezione") bodyHtml = renderLessonAndVideo(ctx);
  else if (uiState.subTab === "b1") bodyHtml = renderB1(ctx);
  else if (uiState.subTab === "b2") bodyHtml = renderB2(ctx);
  else if (uiState.subTab === "b3") bodyHtml = renderB3(ctx);
  else if (uiState.subTab === "b4") bodyHtml = renderB4(ctx);
  else if (uiState.subTab === "b5") bodyHtml = renderB5(ctx);
  else bodyHtml = renderGames(ctx);

  container.innerHTML = `
    <div class="serr-path-banner serr-path-villa">
      <div>
        <div class="serr-kicker">TEMATICA B: FILIERA CORTA, STAGIONALITÀ &amp; IMBALLAGGI · COMUNE ABBINATO: VILLACOLLE</div>
        <h3 style="margin:2px 0 4px;">Dal Campo alla Scuola: filiera corta, 5R originali e scelte a impatto zero</h3>
        <p style="margin:0;font-size:0.86rem;opacity:0.94;">Percorso completo tra lezione teorica, video a supporto, analisi della filiera in 7 tappe, calendario stagionale reale, matematica della tara e quiz per Primaria e Scuola Media.</p>
      </div>
      <div class="serr-path-actions">
        <button type="button" class="btn btn-sm" data-v-jump="presentazioni">Slide LIM</button>
        <button type="button" class="btn btn-sm" data-v-jump="studio">Materiali di studio</button>
        <button type="button" class="btn btn-sm" data-v-jump="schede">Schede A4</button>
        <button type="button" class="btn btn-sm" data-v-jump="missioni">Missione finale</button>
      </div>
    </div>
    ${subNav}
    <div class="serr-work-area">${bodyHtml}</div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-v-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.vTab as typeof uiState.subTab;
      if (t) {
        uiState.subTab = t;
        renderVillacolleView(container, ctx);
      }
    });
  });
  container.querySelectorAll<HTMLButtonElement>("[data-v-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.vJump) ctx.navigateTo(btn.dataset.vJump);
    });
  });

  bindEvents(container, ctx);
}

function renderHome(ctx: VillacolleContext): string {
  const doneCount = ctx.state.completedActivities.filter((x) => x.startsWith("V_")).length;
  return `
    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">Obiettivi didattici completi di Villacolle</h4>
        <ul class="serr-list">
          <li><strong>Le 5R originali (inglese) e la spesa:</strong> capire perché in italiano non sono 5 parole con la R — <em>Refuse, Reduce, Reuse, Recycle, Rot</em> — e applicarle prima della cassa (Precycling).</li>
          <li><strong>Filiera corta vs Km 0 e paradosso delle serre:</strong> confrontare le 7 tappe dal campo alla scuola distinguendo intermediari, chilometri, trasporto aereo e serre riscaldate fuori stagione.</li>
          <li><strong>Stagionalità reale &amp; Etichette UE:</strong> calendario mensile di 22 ortofrutticoli italiani, etichetta obbligatoria di origine, prezzo al kg e differenze tra Ecolabel UE e greenwashing.</li>
          <li><strong>Anatomia imballaggi, Tara (%) e Codici CONAI/SUP:</strong> calcolare la percentuale di tara, riconoscere PAP/PET/ALU/GL/C-PAP 84, EN 13432 e tappi legati (<em>Tethered Caps</em>).</li>
        </ul>
        <div class="serr-progress-note">Attività Villacolle completate: <strong>${doneCount} / 7</strong></div>
      </div>
      <div class="serr-card">
        <h4 style="margin-top:0;">Accedi alla lezione e ai laboratori</h4>
        <div class="serr-mini-cards">
          <button type="button" class="serr-action-tile" data-v-tab="lezione"><strong>Lezione Completa &amp; Video</strong><span>Sintesi guidata + 4 video brevi Primaria/Media</span></button>
          <button type="button" class="serr-action-tile" data-v-tab="b1"><strong>B1 · Il Viaggio del Cibo</strong><span>Filiera corta vs lunga vs serra invernale in 7 tappe</span></button>
          <button type="button" class="serr-action-tile" data-v-tab="b2"><strong>B2 · Calendario Stagionalità</strong><span>22 ortofrutticoli mese per mese + verifica</span></button>
          <button type="button" class="serr-action-tile" data-v-tab="b3"><strong>B3 · Spesa a Km Zero</strong><span>4 provenienze, budget €18 e indicatori</span></button>
          <button type="button" class="serr-action-tile" data-v-tab="b4"><strong>B4 · Imballaggi &amp; Tara (%)</strong><span>Calcolatore tara, 15 prodotti e Drag &amp; Drop</span></button>
          <button type="button" class="serr-action-tile" data-v-tab="b5"><strong>B5 · Merenda Zero Rifiuti</strong><span>Impatto 180 giorni/classe e scheda stampabile</span></button>
          <button type="button" class="serr-action-tile" data-v-tab="giochi"><strong>Quiz 20 Domande &amp; 8 Codici</strong><span>Verifica filtrabile per età + associazione codici</span></button>
        </div>
      </div>
    </div>
  `;
}

function renderLessonAndVideo(ctx: VillacolleContext): string {
  const e = ctx.esc;
  const isLezDone = ctx.state.completedActivities.includes("V_LEZ");
  const curIdx = Math.max(0, Math.min(uiState.lessonVideoIdx, VILLA_VIDEOS.length - 1));

  return `
    <div class="serr-info-strip">
      <strong>Nota linguistica sulle 5R originali:</strong> la formula nasce in inglese con 5 parole che iniziano tutte per <strong>R</strong> (<em>Refuse, Reduce, Reuse, Recycle, Rot</em>). Traducendole in italiano non restano 5 R (la 5ª, <em>Rot</em>, diventa <em>Composta</em>), e alcune liste cambiano la 5ª R in <em>Repurpose</em> o <em>Recover</em>: per chiarezza usiamo sempre i <strong>5 termini originali</strong>.
    </div>

    <div class="serr-grid-2">
      <div class="serr-card">
        <div class="serr-badge-small">Unità 1 · Le 5R originali applicate a Villacolle</div>
        <h4 style="margin:6px 0 8px;">Dalle 5R inglesi alla spesa quotidiana</h4>
        <table class="serr-table">
          <thead>
            <tr><th>Inglese originale</th><th>Significato in italiano</th><th>Esempio concreto a Villacolle</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>1. Refuse</strong></td><td>Rifiuta il superfluo</td><td>Lascia sullo scaffale banane in vaschetta e sacchetti doppi.</td></tr>
            <tr><td><strong>2. Reduce</strong></td><td>Riduci alla fonte</td><td>Scegli formati familiari invece di 6 brick piccoli + cannuccia.</td></tr>
            <tr><td><strong>3. Reuse</strong></td><td>Riusa (e ripara)</td><td>Borraccia, portamerenda lavabile, cassette agricole a rendere, vasetti di vetro.</td></tr>
            <tr><td><strong>4. Recycle</strong></td><td>Ricicla pulito</td><td>Svuota vasetti yogurt, separa coperchio pulito della pizza e leggi PAP/PET/ALU/GL.</td></tr>
            <tr><td><strong>5. Rot</strong></td><td>Composta l'organico</td><td>Bucce e sacchetti <strong>EN 13432</strong> nell'umido per fare compost per l'orto scolastico.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="serr-card">
        <div class="serr-badge-small">Unità 2 &amp; 3 · Filiera, Stagionalità, Tara &amp; Etichette</div>
        <h4 style="margin:6px 0 8px;">Concetti chiave della lezione completa</h4>
        <ul class="serr-list">
          <li><strong>Filiera corta ≠ Km 0:</strong> la <em>filiera corta</em> riduce il numero di intermediari commerciali (dal produttore alla scuola); il <em>Km 0</em> misura la vicinanza geografica. Servono entrambi insieme alla <strong>stagionalità naturale</strong>.</li>
          <li><strong>Paradosso della serra riscaldata:</strong> un pomodoro locale a gennaio coltivato in serra a gasolio può avere impronta energetica molto superiore a un ortaggio autunnale di pieno campo.</li>
          <li><strong>Origine &amp; Prezzo al kg (UE):</strong> al banco ortofrutta controlla sempre il <em>Paese d'origine obbligatorio</em> e il <em>prezzo €/kg</em> (non solo il prezzo della singola vaschetta).</li>
          <li><strong>Tara (%) &amp; Greenwashing:</strong> pesa alimento netto vs lordo (<em>tara % = (lordo − netto) ÷ lordo × 100</em>). Diffida di frasi vaghe (“100% green”); cerca sigle verificabili (<strong>Ecolabel UE</strong>, <strong>EN 13432</strong>, codici materiali CONAI e tappo legato <strong>Tethered Cap SUP</strong>).</li>
        </ul>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-lez-done">${isLezDone ? "Lezione completata ✓ (+20 XP)" : "Segna lezione completa studiata (+20 XP)"}</button>
          <button type="button" class="btn btn-sm" data-v-jump="presentazioni">Apri Slide LIM complete →</button>
        </div>
      </div>
    </div>

    <div class="serr-card" style="margin-top:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
        <div>
          <div class="serr-badge-small">Video a supporto verificati (Primaria 6–10 e Media 11–14)</div>
          <h4 style="margin:4px 0 0;">Videoteca integrata dell'esperienza Villacolle</h4>
        </div>
        <a href="https://www.youtube.com/watch?v=x9PJTzBj9n0" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="text-decoration:none;">Extra: Elior Frutta e Verdura ↗</a>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
        ${VILLA_VIDEOS.map((vid, idx) => `
          <button type="button" class="serr-chip ${idx === curIdx ? "active" : ""}" data-v-vid-pick="${idx}">
            ${idx + 1}. ${vid.ageBand === "primaria" ? "Primaria" : "Media"} · ${e(vid.channel)}
          </button>
        `).join("")}
      </div>
      <div id="villa-support-video-slot"></div>
    </div>
  `;
}

function renderB1(ctx: VillacolleContext): string {
  const e = ctx.esc;
  const chain = VILLACOLLE_SUPPLY_CHAINS.find((x) => x.id === uiState.b1ChainId) || VILLACOLLE_SUPPLY_CHAINS[0];
  return `
    <div class="serr-info-strip">
      <strong>Senso critico scientifico:</strong> i chilometri percorsi sono solo una parte della storia! Confronta le tre filiere osservando trasporto, energia di serra/conservazione e imballaggi.
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
      ${VILLACOLLE_SUPPLY_CHAINS.map((c) => `<button type="button" class="serr-chip ${c.id === chain.id ? "active" : ""}" data-b1-chain="${c.id}">${e(c.label)}</button>`).join("")}
    </div>
    <div class="serr-card">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
        <h4 style="margin:0;">${e(chain.label)}</h4>
        <span class="serr-badge-small">${e(chain.badge)}</span>
      </div>
      <p style="font-size:0.84rem;color:var(--text-muted);margin:4px 0 10px;">Esempio: ${e(chain.originExample)}</p>
      <div class="serr-stages-grid">
        ${chain.stages.map((st) => `
          <div class="serr-stage-item">
            <div style="font-weight:700;font-size:0.85rem;">${e(st.stage)}</div>
            <div style="font-size:0.8rem;margin:4px 0;">${e(st.detail)}</div>
            <div style="font-size:0.74rem;color:var(--text-muted);">
              Trasporto: ${"●".repeat(st.transportLoad)}${"○".repeat(5 - st.transportLoad)} ·
              Imballi: ${"●".repeat(st.packagingLoad)}${"○".repeat(5 - st.packagingLoad)} ·
              Energia serra/freddo: ${"●".repeat(st.storageEnergy)}${"○".repeat(5 - st.storageEnergy)}
            </div>
          </div>
        `).join("")}
      </div>
      <div class="serr-feedback ok" style="margin-top:10px;">
        <strong>Lezione critica:</strong> ${e(chain.criticalLesson)}
      </div>
      <button type="button" class="btn btn-primary btn-sm" style="margin-top:8px;" id="btn-b1-done">Segna analisi filiere completata</button>
    </div>
  `;
}

function renderB2(ctx: VillacolleContext): string {
  const e = ctx.esc;
  const m = uiState.b2Month;
  const monthName = MONTHS_IT.find((x) => x.m === m)?.name || "Novembre";
  const fruitSeason = SEASONAL_PRODUCE.filter((p) => p.kind === "Frutta" && p.months.includes(m));
  const vegSeason = SEASONAL_PRODUCE.filter((p) => p.kind === "Verdura" && p.months.includes(m));
  const outSeason = SEASONAL_PRODUCE.filter((p) => !p.months.includes(m));

  const quizSample = [
    { id: "fragole", q: "Fragole di pieno campo", expected: "Primavera (Apr-Giu)" },
    { id: "arance_tarocco", q: "Arance Tarocco siciliane", expected: "Inverno (Nov-Mar)" },
    { id: "zucchine", q: "Zucchine di pieno campo", expected: "Estate (Mag-Ott)" },
    { id: "carciofi", q: "Carciofi violetti locali", expected: "Autunno-Inverno (Nov-Apr)" }
  ];
  const seasonsOpts = ["Inverno (Nov-Mar)", "Primavera (Apr-Giu)", "Estate (Mag-Ott)", "Autunno-Inverno (Nov-Apr)"];
  const score = quizSample.reduce((acc, s) => acc + (uiState.b2GameAnswers[s.id] === s.expected ? 1 : 0), 0);

  return `
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
      ${MONTHS_IT.map((mo) => `<button type="button" class="serr-chip ${mo.m === m ? "active" : ""}" data-b2-month="${mo.m}">${mo.name}</button>`).join("")}
    </div>
    <div class="serr-grid-3">
      <div class="serr-card">
        <h4 style="margin-top:0;color:#1b6e42;">Frutta di stagione · ${monthName} (${fruitSeason.length})</h4>
        <ul class="serr-list">
          ${fruitSeason.map((p) => `<li><strong>${e(p.name)}</strong><br/><small style="color:var(--text-muted);">${e(p.localTip)}</small></li>`).join("") || "<li>Nessuna in elenco</li>"}
        </ul>
      </div>
      <div class="serr-card">
        <h4 style="margin-top:0;color:#1c5f7a;">Verdura di stagione · ${monthName} (${vegSeason.length})</h4>
        <ul class="serr-list">
          ${vegSeason.map((p) => `<li><strong>${e(p.name)}</strong><br/><small style="color:var(--text-muted);">${e(p.localTip)}</small></li>`).join("") || "<li>Nessuna in elenco</li>"}
        </ul>
      </div>
      <div class="serr-card">
        <h4 style="margin-top:0;color:#993b2a;">Normalmente fuori stagione (${outSeason.length})</h4>
        <ul class="serr-list">
          ${outSeason.slice(0, 8).map((p) => `<li><strong>${e(p.name)}</strong> <small>(stagione: ${p.months.map((mm) => MONTHS_IT.find((x) => x.m === mm)?.name.slice(0, 3)).join(", ")})</small></li>`).join("")}
        </ul>
        <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:0;">Totale archivio: <strong>${SEASONAL_PRODUCE.length} prodotti ortofrutticoli italiani</strong> (fonte CREA / calendari MiPAAF).</p>
      </div>
    </div>

    <div class="serr-card" style="margin-top:12px;">
      <h4 style="margin-top:0;">Verifica rapida della stagionalità</h4>
      <div class="serr-grid-2">
        ${quizSample.map((s) => `
          <div class="serr-calc-row" style="justify-content:space-between;">
            <strong style="font-size:0.84rem;">${e(s.q)}</strong>
            <select class="serr-select" data-b2-ans="${s.id}">
              <option value="">-- Scegli stagione --</option>
              ${seasonsOpts.map((o) => `<option value="${e(o)}" ${uiState.b2GameAnswers[s.id] === o ? "selected" : ""}>${e(o)}</option>`).join("")}
            </select>
          </div>
        `).join("")}
      </div>
      <div style="display:flex;gap:8px;align-items:center;margin-top:10px;">
        <button type="button" class="btn btn-primary btn-sm" id="btn-b2-check">Verifica associazioni</button>
        ${uiState.b2GameChecked ? `<strong>Risultato: ${score}/${quizSample.length}</strong>` : ""}
      </div>
    </div>
  `;
}

function renderB3(ctx: VillacolleContext): string {
  const e = ctx.esc;
  const chosen = SUPERMARKET_CATALOG.filter((p) => uiState.b3CartIds.includes(p.id));
  const totalCost = Number(chosen.reduce((a, b) => a + b.priceEur, 0).toFixed(2));
  const totalKm = chosen.reduce((a, b) => a + b.km, 0);
  const totalPackG = chosen.reduce((a, b) => a + b.packagingGrams, 0);
  const seasonalCount = chosen.filter((x) => x.seasonal).length;
  const localCount = chosen.filter((x) => x.originTier === "locale").length;
  const overBudget = totalCost > uiState.b3Budget;

  return `
    <div class="serr-info-strip">
      <strong>Supermercato a Km Zero · Budget €${uiState.b3Budget.toFixed(2)}:</strong> confronta prodotti provenienti da territorio locale, altre regioni italiane, Unione Europea e Paesi extra-UE. Indicatori didattici trasparenti (somma diretta di km stimati, grammi di imballaggio e quota stagionale).
    </div>
    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">Scaffali per provenienza</h4>
        <div class="serr-catalog-list">
          ${SUPERMARKET_CATALOG.map((p) => {
            const inCart = uiState.b3CartIds.includes(p.id);
            return `
              <div class="serr-prod-item ${inCart ? "selected" : ""}">
                <div style="flex:1;min-width:0;">
                  <div style="font-weight:700;font-size:0.85rem;">${e(p.name)} · <span style="color:var(--accent);">€${p.priceEur.toFixed(2)}</span></div>
                  <div style="font-size:0.76rem;color:var(--text-muted);">
                    ${e(p.originLabel)} (~${p.km} km) · ${p.seasonal ? "Di stagione" : "Fuori stagione"} · Imballo: ${e(p.packagingDesc)} (~${p.packagingGrams} g)
                  </div>
                </div>
                <button type="button" class="btn btn-sm ${inCart ? "btn-secondary" : "btn-primary"}" data-b3-toggle="${p.id}">
                  ${inCart ? "Togli" : "+ Carrello"}
                </button>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <div class="serr-card">
        <h4 style="margin-top:0;">Il tuo carrello e indicatori didattici</h4>
        <div class="serr-comp-box">
          <div>Spesa totale: <strong style="color:${overBudget ? "#b42b23" : "#1a683c"};">€${totalCost.toFixed(2)}</strong> / €${uiState.b3Budget.toFixed(2)} ${overBudget ? "(Fuori budget!)" : "(Entro budget)"}</div>
          <div>Distanza cumulata indicativa: <strong>${totalKm.toLocaleString("it-IT")} km</strong></div>
          <div>Peso totale imballaggi: <strong>${totalPackG} g</strong></div>
          <div>Quota prodotti locali: <strong>${localCount}/${chosen.length || 1}</strong> · Di stagione: <strong>${seasonalCount}/${chosen.length || 1}</strong></div>
        </div>
        <h5 style="margin:10px 0 6px;">Prodotti nel carrello (${chosen.length})</h5>
        <ul class="serr-list">
          ${chosen.map((c) => `<li><strong>${e(c.name)}</strong> (${e(c.originLabel)}, ${c.packagingGrams} g imballo) — <em>${e(c.ruleReason)}</em></li>`).join("") || "<li>Carrello vuoto: seleziona almeno 3 articoli.</li>"}
        </ul>
        <button type="button" class="btn btn-primary btn-sm" style="margin-top:8px;" id="btn-b3-confirm" ${chosen.length < 3 || overBudget ? "disabled" : ""}>Conferma Spesa Km Zero</button>
      </div>
    </div>
  `;
}

function getB4DragItems(): PackagingItem[] {
  if (uiState.b4DragSet === "set2") return PACKAGING_HUNT_ITEMS.slice(8);
  if (uiState.b4DragSet === "all") return PACKAGING_HUNT_ITEMS;
  return PACKAGING_HUNT_ITEMS.slice(0, 8);
}

function renderB4(ctx: VillacolleContext): string {
  const e = ctx.esc;
  const sel = PACKAGING_HUNT_ITEMS.find((x) => x.id === uiState.b4SelectedId) || PACKAGING_HUNT_ITEMS[0];
  const buckets: Array<{ id: PackagingItem["disposalBucket"]; label: string; color: string }> = [
    { id: "plastica_metalli", label: "Plastica & Metalli", color: "#d49b1a" },
    { id: "carta", label: "Carta & Cartone", color: "#2c6aa0" },
    { id: "vetro", label: "Vetro", color: "#1e7c4c" },
    { id: "organico", label: "Organico (EN 13432)", color: "#6e4e2a" },
    { id: "indifferenziato", label: "Indifferenziato / Regole Comune", color: "#5e6870" }
  ];

  const gameItems = getB4DragItems();
  const placedCount = gameItems.filter((it) => Boolean(uiState.b4DragPlacements[it.id])).length;
  const correctPlaced = gameItems.filter((it) => uiState.b4DragPlacements[it.id] === it.disposalBucket).length;
  const bucketLabelMap: Record<PackagingItem["disposalBucket"], string> = {
    plastica_metalli: "Plastica & Metalli",
    carta: "Carta",
    vetro: "Vetro",
    organico: "Organico",
    indifferenziato: "Indifferenziato"
  };

  const netG = Math.max(1, uiState.b4TareNetG);
  const grossG = Math.max(netG, uiState.b4TareGrossG);
  const tareG = grossG - netG;
  const tarePct = ((tareG / grossG) * 100).toFixed(1);

  return `
    <div class="serr-card" style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
        <h4 style="margin:0;">Laboratorio STEM · Calcolatore della Tara (%) sugli Imballaggi</h4>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" class="serr-chip" data-b4-preset="200:250">Biscotti triplo incarto (200/250 g)</button>
          <button type="button" class="serr-chip" data-b4-preset="600:645">Banane in vaschetta (600/645 g)</button>
          <button type="button" class="serr-chip" data-b4-preset="200:218">Brick succo monouso (200/218 g)</button>
          <button type="button" class="serr-chip" data-b4-preset="500:500">Frutta sfusa in tela (500/500 g)</button>
        </div>
      </div>
      <div class="serr-grid-3" style="align-items:end;">
        <label class="serr-label">Peso netto alimento (g)
          <input id="b4-tare-net" type="number" min="10" max="5000" class="serr-input" value="${netG}" />
        </label>
        <label class="serr-label">Peso lordo totale con imballo (g)
          <input id="b4-tare-gross" type="number" min="10" max="6000" class="serr-input" value="${grossG}" />
        </label>
        <div class="serr-comp-box" style="margin:0;">
          <div>Tara (imballaggio): <strong>${tareG} g</strong> su ${grossG} g</div>
          <div>Incidenza tara: <strong style="color:${Number(tarePct) >= 12 ? "#b42b23" : "#1a683c"};">${tarePct}%</strong> · Su 100 acquisti = <strong>${((tareG * 100) / 1000).toFixed(1)} kg</strong> di rifiuti!</div>
        </div>
      </div>
    </div>

    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">Catalogo 15 prodotti con imballaggio</h4>
        <div class="serr-catalog-list">
          ${PACKAGING_HUNT_ITEMS.map((item) => `
            <button type="button" class="serr-prod-item ${item.id === sel.id ? "active" : ""}" data-b4-sel="${item.id}" style="text-align:left;width:100%;">
              <div style="flex:1;">
                <div style="font-weight:700;font-size:0.84rem;">${e(item.product)}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);">${e(item.code)} · ${e(item.necessity)}</div>
              </div>
              <span class="serr-badge-small">${e(bucketLabelMap[item.disposalBucket])}</span>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="serr-card">
        <div class="serr-badge-small">${e(sel.code)}</div>
        <h4 style="margin:4px 0;">${e(sel.product)}</h4>
        <p style="font-size:0.84rem;margin:4px 0;"><strong>Materiale:</strong> ${e(sel.material)}</p>
        <p style="font-size:0.84rem;margin:4px 0;"><strong>È necessario?</strong> ${e(sel.necessity)}</p>
        <p style="font-size:0.84rem;margin:4px 0;"><strong>Alternativa riutilizzabile/leggera (Refuse/Reduce/Reuse):</strong> ${e(sel.alternative)}</p>
        <div class="serr-feedback ok" style="margin-top:6px;"><strong>Conferimento corretto:</strong> ${e(sel.disposalLabel)}</div>

        <hr style="border:none;border-top:1px solid var(--border);margin:12px 0;" />
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px;">
          <h4 style="margin:0;">Gioco Trascina e Rilascia (${gameItems.length} prodotti)</h4>
          <div style="display:flex;gap:4px;flex-wrap:wrap;">
            <button type="button" class="serr-chip ${uiState.b4DragSet === "set1" ? "active" : ""}" data-b4-set="set1">Set 1 (8)</button>
            <button type="button" class="serr-chip ${uiState.b4DragSet === "set2" ? "active" : ""}" data-b4-set="set2">Set 2 (7)</button>
            <button type="button" class="serr-chip ${uiState.b4DragSet === "all" ? "active" : ""}" data-b4-set="all">Tutti (15)</button>
          </div>
        </div>
        <p style="font-size:0.78rem;color:var(--text-muted);margin:0 0 8px;">Trascina ogni prodotto nel bidone giusto (oppure tocca un cartellino e poi il bidone su LIM/touch/tastiera).</p>
        ${(() => {
          const selDrag = uiState.b4SelectedBucketItem
            ? gameItems.find((it) => it.id === uiState.b4SelectedBucketItem)
            : null;
          return selDrag
            ? `<div class="serr-feedback ok" style="margin-bottom:8px;"><strong>Selezionato:</strong> ${e(selDrag.product)} → Tocca ora il bidone giusto qui sotto!</div>`
            : "";
        })()}
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">
          ${gameItems.map((it) => {
            const placed = uiState.b4DragPlacements[it.id];
            const isOk = placed === it.disposalBucket;
            const isSel = uiState.b4SelectedBucketItem === it.id;
            return `<button type="button" draggable="true" class="serr-drag-chip ${placed ? (isOk ? "is-ok" : "is-err") : isSel ? "is-sel" : ""}" data-b4-drag="${it.id}">${e(it.product)}${placed ? ` → ${bucketLabelMap[placed]}` : ""}</button>`;
          }).join("")}
        </div>
        <div class="serr-bins-grid">
          ${buckets.map((bk) => `
            <div class="serr-bin-drop ${uiState.b4SelectedBucketItem ? "ready-drop" : ""}" data-b4-drop="${e(bk.id)}" style="border-top:4px solid ${bk.color};">
              <strong>${e(bk.label)}</strong>
              <small>${uiState.b4SelectedBucketItem ? "Tocca per inserire qui" : "Rilascia qui"}</small>
            </div>
          `).join("")}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
          <span style="font-size:0.82rem;">Classificati correttamente: <strong>${correctPlaced}/${placedCount}</strong> (nel set: ${gameItems.length})</span>
          <button type="button" class="btn btn-sm" id="btn-b4-reset">Svuota bidoni</button>
        </div>
      </div>
    </div>
  `;
}

function renderB5(ctx: VillacolleContext): string {
  const e = ctx.esc;
  const snackHtml = `
    <div class="serr-sheet-preview" id="b5-printable-card">
      <div class="serr-kicker">SCHEDA MERENDA SOSTENIBILE · VILLACOLLE</div>
      <h4 style="margin:4px 0 8px;">Progetto Merenda Zero Rifiuti</h4>
      <table class="serr-table">
        <tr><th>Frutta / Vegetale di stagione</th><td>${e(uiState.b5SnackFood)}</td></tr>
        <tr><th>Base energetica sfusa</th><td>${e(uiState.b5SnackCarb)}</td></tr>
        <tr><th>Idratazione</th><td>${e(uiState.b5SnackDrink)}</td></tr>
        <tr><th>Contenitori riutilizzabili</th><td>${e(uiState.b5Container)}</td></tr>
        <tr><th>Regola anti-spreco</th><td>${e(uiState.b5Note)}</td></tr>
      </table>
      <div class="serr-comp-box" style="margin:8px 0 0;">
        <div><strong>Confronto su 180 giorni di scuola (rispetto a merendina triplo incarto + brick):</strong></div>
        <div>• <strong>1 alunno:</strong> evita <strong>~360 involucri/anno</strong> (180 incarti merenda + 180 brick/cannucce)</div>
        <div>• <strong>1 classe (22 alunni):</strong> evita <strong>~7.920 imballaggi monouso all'anno</strong> (circa 35–40 kg di plastica, poliaccoppiati e carta!)</div>
      </div>
    </div>
  `;
  return `
    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">Progetta la tua Merenda Scolastica</h4>
        <label class="serr-label">Frutta o ortaggio di stagione
          <select id="b5-food" class="serr-select" style="width:100%;">
            <option ${uiState.b5SnackFood.includes("Mela") ? "selected" : ""}>Mela locale sfusa o arancia di stagione</option>
            <option ${uiState.b5SnackFood.includes("Mandarini") ? "selected" : ""}>Mandarini siciliani sfusi senza rete</option>
            <option ${uiState.b5SnackFood.includes("Carote") ? "selected" : ""}>Bastoncini di carota o finocchio fresco</option>
          </select>
        </label>
        <label class="serr-label">Base da forno / cereali sfusi
          <select id="b5-carb" class="serr-select" style="width:100%;">
            <option ${uiState.b5SnackCarb.includes("forno") ? "selected" : ""}>Pane o focaccia del forno locale (no incarti)</option>
            <option ${uiState.b5SnackCarb.includes("Torta") ? "selected" : ""}>Torta semplice fatta in casa in fetta</option>
            <option ${uiState.b5SnackCarb.includes("Frutta secca") ? "selected" : ""}>Piccola porzione di noci/mandorle sfuse in barattolino</option>
          </select>
        </label>
        <label class="serr-label">Bevanda
          <select id="b5-drink" class="serr-select" style="width:100%;">
            <option ${uiState.b5SnackDrink.includes("borraccia") ? "selected" : ""}>Acqua del rubinetto in borraccia lavabile</option>
            <option ${uiState.b5SnackDrink.includes("Spremuta") ? "selected" : ""}>Spremuta fresca fatta in casa in thermos/borraccia</option>
          </select>
        </label>
        <label class="serr-label">Contenitore e tovagliolo
          <select id="b5-cont" class="serr-select" style="width:100%;">
            <option ${uiState.b5Container.includes("rigido") ? "selected" : ""}>Portamerenda rigido riutilizzabile + tovagliolo in stoffa</option>
            <option ${uiState.b5Container.includes("Sacchetto") ? "selected" : ""}>Sacchetto lavabile in cotone cerato/tela</option>
          </select>
        </label>
        <label class="serr-label">Gestione eventuali avanzi
          <input id="b5-note" type="text" class="serr-input" value="${e(uiState.b5Note)}" />
        </label>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-b5-save">Conferma progetto merenda</button>
          <button type="button" class="btn btn-sm" id="btn-b5-print">Stampa scheda merenda</button>
        </div>
      </div>
      <div class="serr-card">
        <h4 style="margin-top:0;">Anteprima Scheda Riepilogativa</h4>
        ${snackHtml}
      </div>
    </div>
  `;
}

function getFilteredVillaQuiz() {
  if (uiState.quizAgeFilter === "primaria") {
    return VILLA_QUIZ_20.filter((q) => q.ageBand === "primaria" || q.ageBand === "entrambi");
  }
  if (uiState.quizAgeFilter === "media") {
    return VILLA_QUIZ_20.filter((q) => q.ageBand === "media" || q.ageBand === "entrambi");
  }
  return VILLA_QUIZ_20;
}

function renderGames(ctx: VillacolleContext): string {
  const e = ctx.esc;
  const questions = getFilteredVillaQuiz();
  const quizScore = questions.reduce((acc, q) => acc + (uiState.quizAnswers[q.id] === q.correctIdx ? 1 : 0), 0);
  const answeredCount = questions.filter((q) => typeof uiState.quizAnswers[q.id] === "number").length;
  const allAnswered = questions.length > 0 && answeredCount === questions.length;

  return `
    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">Gioco di associazione · 8 Codici, 5R e Filiera</h4>
        <p style="font-size:0.83rem;margin-top:0;">Associa sigle CONAI, Direttiva SUP e concetti 5R di Villacolle al significato corretto.</p>
        <div class="serr-grid-2">
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${VILLA_MATCH_PAIRS.map((p) => {
              const solved = uiState.matchPairsSolved.includes(p.id);
              const sel = uiState.matchLeftSelected === p.id;
              return `<button type="button" class="serr-opt-btn ${solved ? "is-ok" : sel ? "is-sel" : ""}" data-vm-left="${p.id}" ${solved ? "disabled" : ""}>${e(p.left)} ${solved ? "✓" : ""}</button>`;
            }).join("")}
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${[...VILLA_MATCH_PAIRS].reverse().map((p) => {
              const solved = uiState.matchPairsSolved.includes(p.id);
              return `<button type="button" class="serr-opt-btn ${solved ? "is-ok" : ""}" data-vm-right="${p.id}" ${solved ? "disabled" : ""}>${e(p.right)}</button>`;
            }).join("")}
          </div>
        </div>
        ${uiState.matchError ? `<div class="serr-feedback warn" style="margin-top:8px;">${e(uiState.matchError)}</div>` : ""}
        ${uiState.matchPairsSolved.length === VILLA_MATCH_PAIRS.length ? `<div class="serr-feedback ok" style="margin-top:8px;"><strong>Tutte le ${VILLA_MATCH_PAIRS.length} associazioni completate!</strong></div>` : ""}
        <button type="button" class="btn btn-sm" style="margin-top:8px;" id="btn-vm-reset">Ricomincia associazione</button>
      </div>

      <div class="serr-card">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
          <h4 style="margin:0;">Verifica Villacolle · ${questions.length} Domande</h4>
          <div style="display:flex;gap:4px;flex-wrap:wrap;">
            <button type="button" class="serr-chip ${uiState.quizAgeFilter === "tutte" ? "active" : ""}" data-vq-age="tutte">Tutte (20)</button>
            <button type="button" class="serr-chip ${uiState.quizAgeFilter === "primaria" ? "active" : ""}" data-vq-age="primaria">Primaria (6–10)</button>
            <button type="button" class="serr-chip ${uiState.quizAgeFilter === "media" ? "active" : ""}" data-vq-age="media">Media (11–14)</button>
          </div>
        </div>
        <div class="serr-quiz-scroll">
          ${questions.map((q, qi) => {
            const ans = uiState.quizAnswers[q.id];
            const ageLabel = q.ageBand === "primaria" ? "Primaria" : q.ageBand === "media" ? "Media" : "Comune";
            return `
              <div class="serr-q-block">
                <div style="font-weight:700;font-size:0.85rem;margin-bottom:4px;">${qi + 1}. ${e(q.question)} <span class="serr-badge-small" style="font-size:0.68rem;">${ageLabel}</span></div>
                <div style="display:flex;flex-direction:column;gap:4px;">
                  ${q.options.map((opt, oi) => {
                    let cls = "";
                    if (uiState.quizSubmitted) {
                      if (oi === q.correctIdx) cls = "is-ok";
                      else if (ans === oi) cls = "is-err";
                    } else if (ans === oi) cls = "is-sel";
                    return `<button type="button" class="serr-opt-btn ${cls}" data-vq-pick="${q.id}:${oi}">${e(opt)}</button>`;
                  }).join("")}
                </div>
                ${uiState.quizSubmitted ? `<div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px;">${e(q.explanation)}</div>` : ""}
              </div>
            `;
          }).join("")}
        </div>
        <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;align-items:center;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-vq-submit" ${!allAnswered ? "disabled" : ""}>Verifica punteggio (${answeredCount}/${questions.length})</button>
          <button type="button" class="btn btn-sm" id="btn-vq-retry">Ripeti quiz</button>
          ${uiState.quizSubmitted ? `<strong>Risultato: ${quizScore}/${questions.length}</strong>` : ""}
        </div>
      </div>
    </div>
  `;
}

function bindEvents(container: HTMLElement, ctx: VillacolleContext): void {
  // Lesson & Support Video
  const vidSlot = container.querySelector<HTMLElement>("#villa-support-video-slot");
  if (vidSlot && VILLA_VIDEOS.length > 0) {
    const curVid = VILLA_VIDEOS[Math.max(0, Math.min(uiState.lessonVideoIdx, VILLA_VIDEOS.length - 1))];
    renderSupportVideoWidget(
      vidSlot,
      curVid,
      uiState.lessonVideoMode,
      uiState.lessonVideoSceneIdx,
      ctx.esc,
      (nextMode) => {
        uiState.lessonVideoMode = nextMode;
        renderVillacolleView(container, ctx);
      },
      (nextScene) => {
        uiState.lessonVideoSceneIdx = nextScene;
        renderVillacolleView(container, ctx);
      }
    );
  }
  container.querySelectorAll<HTMLButtonElement>("[data-v-vid-pick]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.lessonVideoIdx = Number(b.dataset.vVidPick) || 0;
      uiState.lessonVideoSceneIdx = 0;
      renderVillacolleView(container, ctx);
    })
  );
  container.querySelector("#btn-lez-done")?.addEventListener("click", () => {
    ctx.markActivityDone("V_LEZ", 20);
    renderVillacolleView(container, ctx);
  });

  container.querySelectorAll<HTMLButtonElement>("[data-b1-chain]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.b1ChainId = b.dataset.b1Chain || "short_seasonal";
      renderVillacolleView(container, ctx);
    })
  );
  container.querySelector("#btn-b1-done")?.addEventListener("click", () => {
    ctx.markActivityDone("V_B1", 15);
    renderVillacolleView(container, ctx);
  });

  container.querySelectorAll<HTMLButtonElement>("[data-b2-month]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.b2Month = Number(b.dataset.b2Month) || 11;
      ctx.markActivityDone("V_B2", 10);
      renderVillacolleView(container, ctx);
    })
  );
  container.querySelectorAll<HTMLSelectElement>("[data-b2-ans]").forEach((sel) =>
    sel.addEventListener("change", () => {
      uiState.b2GameAnswers[sel.dataset.b2Ans || ""] = sel.value;
    })
  );
  container.querySelector("#btn-b2-check")?.addEventListener("click", () => {
    uiState.b2GameChecked = true;
    ctx.markActivityDone("V_B2", 15);
    renderVillacolleView(container, ctx);
  });

  container.querySelectorAll<HTMLButtonElement>("[data-b3-toggle]").forEach((b) =>
    b.addEventListener("click", () => {
      const id = b.dataset.b3Toggle || "";
      if (uiState.b3CartIds.includes(id)) {
        uiState.b3CartIds = uiState.b3CartIds.filter((x) => x !== id);
      } else {
        uiState.b3CartIds.push(id);
      }
      renderVillacolleView(container, ctx);
    })
  );
  container.querySelector("#btn-b3-confirm")?.addEventListener("click", () => {
    ctx.markActivityDone("V_B3", 20);
    renderVillacolleView(container, ctx);
  });

  // B4 Tare calculator & dataset switcher
  container.querySelectorAll<HTMLButtonElement>("[data-b4-preset]").forEach((b) =>
    b.addEventListener("click", () => {
      const [n, g] = (b.dataset.b4Preset || "200:250").split(":").map(Number);
      uiState.b4TareNetG = n || 200;
      uiState.b4TareGrossG = Math.max(uiState.b4TareNetG, g || 250);
      renderVillacolleView(container, ctx);
    })
  );
  container.querySelector<HTMLInputElement>("#b4-tare-net")?.addEventListener("change", (ev) => {
    uiState.b4TareNetG = Math.max(1, Number((ev.target as HTMLInputElement).value) || 1);
    if (uiState.b4TareGrossG < uiState.b4TareNetG) uiState.b4TareGrossG = uiState.b4TareNetG;
    renderVillacolleView(container, ctx);
  });
  container.querySelector<HTMLInputElement>("#b4-tare-gross")?.addEventListener("change", (ev) => {
    uiState.b4TareGrossG = Math.max(uiState.b4TareNetG, Number((ev.target as HTMLInputElement).value) || uiState.b4TareNetG);
    renderVillacolleView(container, ctx);
  });

  container.querySelectorAll<HTMLButtonElement>("[data-b4-sel]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.b4SelectedId = b.dataset.b4Sel || PACKAGING_HUNT_ITEMS[0].id;
      renderVillacolleView(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-b4-set]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.b4DragSet = (b.dataset.b4Set || "set1") as "set1" | "set2" | "all";
      uiState.b4SelectedBucketItem = "";
      renderVillacolleView(container, ctx);
    })
  );

  // Drag-and-Drop + Accessible Click placement
  container.querySelectorAll<HTMLButtonElement>("[data-b4-drag]").forEach((chip) => {
    chip.addEventListener("dragstart", (ev) => {
      ev.dataTransfer?.setData("text/plain", chip.dataset.b4Drag || "");
    });
    chip.addEventListener("click", () => {
      uiState.b4SelectedBucketItem = chip.dataset.b4Drag || "";
      renderVillacolleView(container, ctx);
    });
  });

  const placeItemInBucket = (itemId: string, bucket: PackagingItem["disposalBucket"]) => {
    if (!itemId) return;
    uiState.b4DragPlacements[itemId] = bucket;
    uiState.b4SelectedBucketItem = "";
    const gameItems = getB4DragItems();
    const correctPlaced = gameItems.filter((it) => uiState.b4DragPlacements[it.id] === it.disposalBucket).length;
    if (correctPlaced >= Math.min(6, gameItems.length)) {
      ctx.markActivityDone("V_B4", 20);
      ctx.recordGameScore("villa_packaging_dd", correctPlaced, gameItems.length);
    }
    renderVillacolleView(container, ctx);
  };

  container.querySelectorAll<HTMLElement>("[data-b4-drop]").forEach((bin) => {
    bin.addEventListener("dragover", (ev) => {
      ev.preventDefault();
      bin.classList.add("drag-over");
    });
    bin.addEventListener("dragleave", () => bin.classList.remove("drag-over"));
    bin.addEventListener("drop", (ev) => {
      ev.preventDefault();
      bin.classList.remove("drag-over");
      const itemId = ev.dataTransfer?.getData("text/plain") || uiState.b4SelectedBucketItem;
      placeItemInBucket(itemId, bin.dataset.b4Drop as PackagingItem["disposalBucket"]);
    });
    bin.addEventListener("click", () => {
      if (uiState.b4SelectedBucketItem) {
        placeItemInBucket(uiState.b4SelectedBucketItem, bin.dataset.b4Drop as PackagingItem["disposalBucket"]);
      }
    });
  });

  container.querySelector("#btn-b4-reset")?.addEventListener("click", () => {
    uiState.b4DragPlacements = {};
    uiState.b4SelectedBucketItem = "";
    renderVillacolleView(container, ctx);
  });

  // B5 snack planner
  container.querySelector<HTMLSelectElement>("#b5-food")?.addEventListener("change", (ev) => {
    uiState.b5SnackFood = (ev.target as HTMLSelectElement).value;
    renderVillacolleView(container, ctx);
  });
  container.querySelector<HTMLSelectElement>("#b5-carb")?.addEventListener("change", (ev) => {
    uiState.b5SnackCarb = (ev.target as HTMLSelectElement).value;
    renderVillacolleView(container, ctx);
  });
  container.querySelector<HTMLSelectElement>("#b5-drink")?.addEventListener("change", (ev) => {
    uiState.b5SnackDrink = (ev.target as HTMLSelectElement).value;
    renderVillacolleView(container, ctx);
  });
  container.querySelector<HTMLSelectElement>("#b5-cont")?.addEventListener("change", (ev) => {
    uiState.b5Container = (ev.target as HTMLSelectElement).value;
    renderVillacolleView(container, ctx);
  });
  container.querySelector<HTMLInputElement>("#b5-note")?.addEventListener("input", (ev) => {
    uiState.b5Note = (ev.target as HTMLInputElement).value;
  });
  container.querySelector("#btn-b5-save")?.addEventListener("click", () => {
    ctx.markActivityDone("V_B5", 15);
    renderVillacolleView(container, ctx);
  });
  container.querySelector("#btn-b5-print")?.addEventListener("click", () => {
    window.print();
  });

  // Games & Quiz
  container.querySelectorAll<HTMLButtonElement>("[data-vm-left]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.matchLeftSelected = b.dataset.vmLeft || "";
      uiState.matchError = "";
      renderVillacolleView(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-vm-right]").forEach((b) =>
    b.addEventListener("click", () => {
      const rightId = b.dataset.vmRight || "";
      if (!uiState.matchLeftSelected) {
        uiState.matchError = "Prima seleziona una voce nella colonna di sinistra.";
      } else if (uiState.matchLeftSelected === rightId) {
        if (!uiState.matchPairsSolved.includes(rightId)) uiState.matchPairsSolved.push(rightId);
        uiState.matchLeftSelected = "";
        uiState.matchError = "";
        if (uiState.matchPairsSolved.length === VILLA_MATCH_PAIRS.length) {
          ctx.recordGameScore("villa_match", VILLA_MATCH_PAIRS.length, VILLA_MATCH_PAIRS.length);
        }
      } else {
        uiState.matchError = "Abbinamento errato: verifica la sigla o il concetto.";
      }
      renderVillacolleView(container, ctx);
    })
  );
  container.querySelector("#btn-vm-reset")?.addEventListener("click", () => {
    uiState.matchPairsSolved = [];
    uiState.matchLeftSelected = "";
    uiState.matchError = "";
    renderVillacolleView(container, ctx);
  });
  container.querySelectorAll<HTMLButtonElement>("[data-vq-age]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.quizAgeFilter = (b.dataset.vqAge || "tutte") as "tutte" | "primaria" | "media";
      uiState.quizSubmitted = false;
      renderVillacolleView(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-vq-pick]").forEach((b) =>
    b.addEventListener("click", () => {
      if (uiState.quizSubmitted) return;
      const [qid, idxStr] = (b.dataset.vqPick || "").split(":");
      uiState.quizAnswers[qid] = Number(idxStr);
      renderVillacolleView(container, ctx);
    })
  );
  container.querySelector("#btn-vq-submit")?.addEventListener("click", () => {
    uiState.quizSubmitted = true;
    const questions = getFilteredVillaQuiz();
    const score = questions.reduce((acc, q) => acc + (uiState.quizAnswers[q.id] === q.correctIdx ? 1 : 0), 0);
    ctx.recordGameScore("villa_quiz_20", score, questions.length);
    ctx.markActivityDone("V_QUIZ", 25);
    renderVillacolleView(container, ctx);
  });
  container.querySelector("#btn-vq-retry")?.addEventListener("click", () => {
    uiState.quizAnswers = {};
    uiState.quizSubmitted = false;
    renderVillacolleView(container, ctx);
  });
}
