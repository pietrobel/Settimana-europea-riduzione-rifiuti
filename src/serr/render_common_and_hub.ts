import {
  PRINTABLE_WORKSHEETS,
  STUDY_UNITS,
  SUPERMARKET_CATALOG,
  type SupermarketProduct
} from "./data_scientific.ts";
import { FINAL_MISSIONS } from "./data_games_quizzes.ts";
import {
  downloadSvgAsPng,
  downloadSvgFile,
  renderMissionCertificateSvg,
  renderSchoolPosterSvg,
  renderStudyInfographicSvg
} from "./svg_illustrations.ts";
import { exportLabJson, parseImportedLabJson, type DiaryEntry, type SerrLabPersistedState } from "./persistence.ts";

export interface CommonHubContext {
  state: SerrLabPersistedState;
  storageBackend: string;
  saveAndRefresh: () => void;
  markActivityDone: (id: string, xp?: number) => void;
  navigateTo: (tab: string) => void;
  openMezzSub: (sub: "home" | "impronte" | "a1" | "a2" | "a3" | "a4" | "a5" | "giochi") => void;
  openVillaSub: (sub: "home" | "lezione" | "b1" | "b2" | "b3" | "b4" | "b5" | "giochi") => void;
  esc: (s: string) => string;
}

const uiState = {
  studyPathFilter: "Tutti" as "Tutti" | "mezzovalle" | "villacolle",
  studyUnitId: STUDY_UNITS[0].id,
  studyViewTab: "teoria" as "teoria" | "ripasso" | "infografica" | "mappa" | "glossario",
  wsFilter: "Tutti" as "Tutti" | "Mezzovalle" | "Villacolle" | "Comuni",
  wsSelectedId: PRINTABLE_WORKSHEETS[0].id,
  diaryFilter: "tutti" as "tutti" | "mezzovalle" | "villacolle" | "comune",
  diaryEditingId: "",
  diaryDraft: {
    pathway: "mezzovalle" as "mezzovalle" | "villacolle" | "comune",
    activityRef: "Mezzovalle · A1 Acqua Nascosta",
    learned: "",
    surprised: "",
    problem: "",
    behavior: "",
    proposal: ""
  },
  decalogoNewAuthor: "comune" as "mezzovalle" | "villacolle" | "comune",
  decalogoNewTitle: "",
  decalogoNewMotivation: "",
  selectedAuditIdx: 0,
  missionInputs: {} as Record<string, string>,
  certPreviewId: "",
  superBudget: 20,
  importStatus: ""
};

export function renderLabOverview(container: HTMLElement, ctx: CommonHubContext): void {
  const e = ctx.esc;
  const totalDone = ctx.state.completedActivities.length;
  container.innerHTML = `
    <div class="serr-hero-box">
      <div class="serr-kicker">MODULO LABORATORIALE INTERATTIVO · OFFLINE-READY</div>
      <h3 style="margin:4px 0 6px;">SETTIMANA EUROPEA PER LA RIDUZIONE DEI RIFIUTI</h3>
      <p style="margin:0;font-size:0.9rem;max-width:86ch;">Esplora i due percorsi complementari delle scuole di <strong>Mezzovalle</strong> e <strong>Villacolle</strong>, sperimenta i laboratori scientifici sull'acqua invisibile e sulla filiera corta, collabora al <em>Decalogo del Cibo Sostenibile</em> e conserva le tue scoperte nel Diario permanente.</p>
    </div>

    <div class="serr-grid-2" style="margin-top:12px;">
      <div class="serr-card serr-border-mezz">
        <div class="serr-badge-small">PERCORSO A · MEZZOVALLE</div>
        <h4 style="margin:6px 0 4px;">L'Impronta Nascosta: calcolare il valore del cibo e delle risorse</h4>
        <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:10px;">Analisi dell'impronta idrica (15 alimenti WFN), calcolatore di combinazioni alimentari, ciclo produttivo in 7 fasi, 10 casi del Detective dello Spreco e composizione del pasto equilibrato.</p>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" class="btn btn-primary btn-sm" data-open-mezz="home">Apri Percorso Mezzovalle →</button>
          <button type="button" class="btn btn-secondary btn-sm" data-open-mezz="impronte">Scheda Impronte (Eco &amp; Idrica)</button>
          <button type="button" class="btn btn-sm" data-open-mezz="a1">A1 Acqua Nascosta</button>
          <button type="button" class="btn btn-sm" data-open-mezz="a4">A4 Detective Spreco</button>
        </div>
      </div>

      <div class="serr-card serr-border-villa">
        <div class="serr-badge-small">PERCORSO B · VILLACOLLE</div>
        <h4 style="margin:6px 0 4px;">Dal Campo alla Scuola: filiera corta e scelte a impatto zero</h4>
        <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:10px;">Lezione completa con le 5R originali (<em>Refuse, Reduce, Reuse, Recycle, Rot</em>) e video a supporto, viaggio del cibo in 7 tappe, calendario di 22 ortofrutticoli, calcolo della Tara % con 15 imballaggi D&amp;D, 20 quiz e 8 codici.</p>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" class="btn btn-primary btn-sm" data-open-villa="home">Apri Percorso Villacolle →</button>
          <button type="button" class="btn btn-secondary btn-sm" data-open-villa="lezione">Lezione &amp; Video</button>
          <button type="button" class="btn btn-sm" data-open-villa="b2">B2 Stagionalità</button>
          <button type="button" class="btn btn-sm" data-open-villa="b4">B4 Imballaggi &amp; Tara</button>
          <button type="button" class="btn btn-sm" data-open-villa="giochi">20 Quiz &amp; Codici</button>
        </div>
      </div>
    </div>

    <div class="serr-card" style="margin-top:12px;">
      <h4 style="margin-top:0;">Laboratori Comuni, Studio e Strumenti Operativi</h4>
      <div class="serr-mini-cards">
        <button type="button" class="serr-action-tile" data-hub-nav="att6"><strong>Attività 6 · Supermercato delle Scelte</strong><span>4 indicatori trasparenti e confronto Carrello A vs B</span></button>
        <button type="button" class="serr-action-tile" data-hub-nav="att7"><strong>Attività 7 · Sfida delle Due Scuole</strong><span>Decalogo del Cibo Sostenibile votabile + Export JSON</span></button>
        <button type="button" class="serr-action-tile" data-hub-nav="att8"><strong>Attività 8 · Scuola a Impatto Ridotto</strong><span>6 schede osservazione + Manifesto PNG per Canva</span></button>
        <button type="button" class="serr-action-tile" data-hub-nav="studio"><strong>Impariamo Prima di Giocare</strong><span>14 unità di studio con infografiche e mappe</span></button>
        <button type="button" class="serr-action-tile" data-hub-nav="schede"><strong>Schede Operative A4 (${PRINTABLE_WORKSHEETS.length})</strong><span>Moduli pronti per la stampa scolastica</span></button>
        <button type="button" class="serr-action-tile" data-hub-nav="diario"><strong>Il Mio Diario (${ctx.state.diaryEntries.length})</strong><span>Salvataggio offline persistente (${e(ctx.storageBackend)})</span></button>
        <button type="button" class="serr-action-tile" data-hub-nav="missioni"><strong>Missioni Finali &amp; Attestati</strong><span>3 missioni con attestato personalizzato scaricabile</span></button>
        <button type="button" class="serr-action-tile" data-hub-nav="monitoraggio"><strong>Monitoraggio &amp; Fonti (${totalDone} att.)</strong><span>Risultati senza classifiche + trasparenza scientifica</span></button>
        <button type="button" class="serr-action-tile" data-open-mezz="impronte"><strong>Modulo Impronte (Ecologica &amp; Idrica)</strong><span>Scheda interattiva: gha, biocapacità, acqua verde, blu, grigia e verifica</span></button>
        <button type="button" class="serr-action-tile" data-open-video="1"><strong>Video Intro (3–5 min) per Tematica</strong><span>Embed brevi per Primaria e Media + voce offline</span></button>
        <button type="button" class="serr-action-tile" data-open-portale="1"><strong>Portale, App &amp; Film Consigliati</strong><span>Link esterni, calcolatori, video e film gratuiti</span></button>
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-open-mezz]").forEach((b) =>
    b.addEventListener("click", () => ctx.openMezzSub((b.dataset.openMezz || "home") as "home"))
  );
  container.querySelectorAll<HTMLButtonElement>("[data-open-villa]").forEach((b) =>
    b.addEventListener("click", () => ctx.openVillaSub((b.dataset.openVilla || "home") as "home"))
  );
  container.querySelectorAll<HTMLButtonElement>("[data-hub-nav]").forEach((b) =>
    b.addEventListener("click", () => ctx.navigateTo(b.dataset.hubNav || "overview"))
  );
  container.querySelector<HTMLButtonElement>("[data-open-video]")?.addEventListener("click", () => {
    window.openSerrModule?.("video");
  });
  container.querySelector<HTMLButtonElement>("[data-open-portale]")?.addEventListener("click", () => {
    window.openSerrModule?.("portale");
  });
}

/* ================= ATTIVITA 6: SUPERMERCATO DELLE SCELTE ================= */
function calcSuperCart(ids: string[]): {
  items: SupermarketProduct[];
  priceEur: number;
  waterL: number;
  energyScore: number;
  transportKm: number;
  packGrams: number;
} {
  const items = SUPERMARKET_CATALOG.filter((p) => ids.includes(p.id));
  return {
    items,
    priceEur: Number(items.reduce((a, b) => a + b.priceEur, 0).toFixed(2)),
    waterL: items.reduce((a, b) => a + b.waterL, 0),
    energyScore: items.reduce((a, b) => a + b.energyIndicator, 0),
    transportKm: items.reduce((a, b) => a + b.km, 0),
    packGrams: items.reduce((a, b) => a + b.packagingGrams, 0)
  };
}

export function renderActivity6(container: HTMLElement, ctx: CommonHubContext): void {
  const e = ctx.esc;
  const cartA = calcSuperCart(ctx.state.supermarketSavedCartA);
  const cartB = calcSuperCart(ctx.state.supermarketSavedCartB);
  const overBudget = cartB.priceEur > uiState.superBudget;
  const goalPackMet = cartB.packGrams <= 80 && cartB.items.length >= 4 && !overBudget;

  const pct = (val: number, max: number) => Math.min(100, Math.round((val / Math.max(1, max)) * 100));
  const maxWater = Math.max(cartA.waterL, cartB.waterL, 500);
  const maxEnergy = Math.max(cartA.energyScore, cartB.energyScore, 10);
  const maxKm = Math.max(cartA.transportKm, cartB.transportKm, 100);
  const maxPack = Math.max(cartA.packGrams, cartB.packGrams, 100);

  container.innerHTML = `
    <div class="serr-info-strip">
      <strong>Attività 6 · Il Supermercato delle Scelte:</strong> budget massimo <strong>€${uiState.superBudget.toFixed(2)}</strong> · Obiettivo: comporre un Carrello B migliorato con almeno 4 prodotti mantenendo gli <strong>imballaggi ≤ 80 g</strong> e riducendo i chilometri e l'energia rispetto al Carrello iniziale A.<br/>
      <small><strong>Regole trasparenti dei 4 indicatori:</strong> (1) <em>Acqua</em> = somma litri medi WFN delle unità scelte; (2) <em>Energia</em> = somma indice esplicito 1–5 (1 campo aperto, 3 freddo, 5 serra riscaldata/aereo); (3) <em>Trasporti</em> = somma km indicativi; (4) <em>Imballaggi</em> = somma grammi reali stimati di tara.</small>
    </div>

    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">Corsie del Supermercato (scegli per il Carrello Migliorato B)</h4>
        <div class="serr-catalog-list">
          ${SUPERMARKET_CATALOG.map((p) => {
            const inB = ctx.state.supermarketSavedCartB.includes(p.id);
            return `
              <div class="serr-prod-item ${inB ? "selected" : ""}">
                <div style="flex:1;min-width:0;">
                  <div style="font-weight:700;font-size:0.84rem;">${e(p.name)} — €${p.priceEur.toFixed(2)}</div>
                  <div style="font-size:0.75rem;color:var(--text-muted);">
                    ${e(p.originLabel)} (~${p.km} km) · ${e(p.productionType)} · ${p.seasonal ? "Di stagione" : "Fuori stagione"}<br/>
                    Imballo: ${e(p.packagingDesc)} (${p.packagingGrams} g) · Acqua ~${p.waterL} L · Energia indice ${p.energyIndicator}/5
                  </div>
                </div>
                <button type="button" class="btn btn-sm ${inB ? "btn-secondary" : "btn-primary"}" data-s6-toggle="${p.id}">
                  ${inB ? "Togli da B" : "+ Metti in B"}
                </button>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <div class="serr-card">
        <h4 style="margin-top:0;">Confronto Carrello Iniziale A vs Carrello Migliorato B</h4>
        <div class="serr-comp-box" style="margin-bottom:10px;">
          <div><strong>Carrello A (base di partenza):</strong> €${cartA.priceEur.toFixed(2)} · ${cartA.items.length} prodotti</div>
          <div><strong>Carrello B (le tue scelte):</strong> <span style="color:${overBudget ? "#b42b23" : "#1a683c"};font-weight:700;">€${cartB.priceEur.toFixed(2)} / €${uiState.superBudget.toFixed(2)}</span> · ${cartB.items.length} prodotti</div>
        </div>

        ${[
          { label: "1. Consumo di Acqua (L indicativi)", a: cartA.waterL, b: cartB.waterL, max: maxWater, unit: "L" },
          { label: "2. Consumo di Energia (indice trasparente 1–5 per prodotto)", a: cartA.energyScore, b: cartB.energyScore, max: maxEnergy, unit: "pt" },
          { label: "3. Impatto dei Trasporti (km cumulati indicativi)", a: cartA.transportKm, b: cartB.transportKm, max: maxKm, unit: "km" },
          { label: "4. Quantità di Imballaggi (grammi di tara)", a: cartA.packGrams, b: cartB.packGrams, max: maxPack, unit: "g" }
        ].map((m) => `
          <div style="margin-bottom:8px;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:700;">
              <span>${m.label}</span>
              <span>A: ${m.a} ${m.unit} → B: ${m.b} ${m.unit}</span>
            </div>
            <div class="serr-bar-track" style="margin:2px 0;"><div class="serr-bar-fill" style="width:${pct(m.a, m.max)}%"></div></div>
            <div class="serr-bar-track" style="margin:2px 0;"><div class="serr-bar-fill alt" style="width:${pct(m.b, m.max)}%"></div></div>
          </div>
        `).join("")}

        <div class="serr-feedback ${goalPackMet ? "ok" : "warn"}" style="margin-top:8px;">
          ${goalPackMet
            ? "<strong>Obiettivo raggiunto!</strong> Il Carrello B rispetta il budget da €20, mantiene gli imballaggi ≤ 80 g e abbatte i chilometri e l'energia."
            : "Per raggiungere l'obiettivo: seleziona almeno 4 prodotti in B, resta entro €20 e porta la tara imballaggi sotto o pari a 80 g."}
        </div>
        <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-s6-save">Salva Carrello Migliorato</button>
          <button type="button" class="btn btn-sm" id="btn-s6-reset">Ripristina carrello consigliato</button>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-s6-toggle]").forEach((b) =>
    b.addEventListener("click", () => {
      const id = b.dataset.s6Toggle || "";
      if (ctx.state.supermarketSavedCartB.includes(id)) {
        ctx.state.supermarketSavedCartB = ctx.state.supermarketSavedCartB.filter((x) => x !== id);
      } else {
        ctx.state.supermarketSavedCartB = [...ctx.state.supermarketSavedCartB, id];
      }
      ctx.saveAndRefresh();
    })
  );
  container.querySelector("#btn-s6-save")?.addEventListener("click", () => {
    if (goalPackMet) ctx.markActivityDone("C_A6", 20);
    ctx.saveAndRefresh();
  });
  container.querySelector("#btn-s6-reset")?.addEventListener("click", () => {
    ctx.state.supermarketSavedCartB = ["acqua_borraccia", "mele_locali", "legumi_sfusi", "pane_forno"];
    ctx.saveAndRefresh();
  });
}

/* ================= ATTIVITA 7: LA SFIDA DELLE DUE SCUOLE & DECALOGO ================= */
export function renderActivity7(container: HTMLElement, ctx: CommonHubContext): void {
  const e = ctx.esc;
  const rules = [...ctx.state.decalogoRules].sort((a, b) => b.votes - a.votes);
  const top10 = rules.slice(0, 10);

  container.innerHTML = `
    <div class="serr-info-strip">
      <strong>Attività 7 · La Sfida delle Due Scuole (Mezzovalle + Villacolle):</strong> confrontate le scoperte dei due percorsi e votate o proponete le 10 regole motivate del <strong>Decalogo del Cibo Sostenibile</strong>. Salvataggio offline locale + scambio classi tramite file <code>.json</code>.
    </div>

    <div class="serr-grid-2">
      <div class="serr-card serr-border-mezz">
        <h4 style="margin-top:0;">Scoperte di Mezzovalle (Acqua &amp; Risorse)</h4>
        <ul class="serr-list">
          ${ctx.state.decalogoDiscoveriesMezz.map((d) => `<li>${e(d)}</li>`).join("")}
        </ul>
      </div>
      <div class="serr-card serr-border-villa">
        <h4 style="margin-top:0;">Scoperte di Villacolle (Filiera &amp; Imballaggi)</h4>
        <ul class="serr-list">
          ${ctx.state.decalogoDiscoveriesVilla.map((d) => `<li>${e(d)}</li>`).join("")}
        </ul>
      </div>
    </div>

    <div class="serr-card" style="margin-top:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
        <h4 style="margin:0;">Bacheca Comune · IL DECALOGO DEL CIBO SOSTENIBILE</h4>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" class="btn btn-sm" id="btn-dec-print">Stampa Decalogo</button>
          <button type="button" class="btn btn-sm" id="btn-dec-export">Esporta JSON classe</button>
          <label class="btn btn-sm" style="cursor:pointer;">Importa JSON <input type="file" id="inp-dec-import" accept=".json,application/json" style="display:none;" /></label>
        </div>
      </div>
      ${uiState.importStatus ? `<div class="serr-feedback ok" style="margin-top:8px;">${e(uiState.importStatus)}</div>` : ""}

      <div class="serr-decalogo-list" style="margin-top:10px;">
        ${top10.map((r, idx) => `
          <div class="serr-decalogo-row">
            <span class="serr-order-num">${idx + 1}</span>
            <div style="flex:1;min-width:0;">
              <div style="font-weight:700;font-size:0.88rem;">${e(r.title)} <span class="serr-badge-small">${e(r.authorPath)}</span></div>
              <div style="font-size:0.81rem;color:var(--text-muted);">${e(r.motivation)}</div>
            </div>
            <button type="button" class="btn btn-sm btn-primary" data-dec-vote="${r.id}">👍 Vota (${r.votes})</button>
          </div>
        `).join("")}
      </div>

      <hr style="border:none;border-top:1px solid var(--border);margin:12px 0;" />
      <h5 style="margin:0 0 6px;">Proponi una nuova regola motivata per il Decalogo</h5>
      <div class="serr-grid-3">
        <select id="dec-new-author" class="serr-select">
          <option value="mezzovalle" ${uiState.decalogoNewAuthor === "mezzovalle" ? "selected" : ""}>Scuola di Mezzovalle</option>
          <option value="villacolle" ${uiState.decalogoNewAuthor === "villacolle" ? "selected" : ""}>Scuola di Villacolle</option>
          <option value="comune" ${uiState.decalogoNewAuthor === "comune" ? "selected" : ""}>Proposta Congiunta</option>
        </select>
        <input id="dec-new-title" type="text" class="serr-input" placeholder="Titolo breve regola (es. Acqua del rubinetto in mensa)" value="${e(uiState.decalogoNewTitle)}" />
        <input id="dec-new-mot" type="text" class="serr-input" placeholder="Motivazione scientifica/pratica" value="${e(uiState.decalogoNewMotivation)}" />
      </div>
      <button type="button" class="btn btn-primary btn-sm" style="margin-top:8px;" id="btn-dec-add">+ Aggiungi proposta in bacheca</button>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-dec-vote]").forEach((b) =>
    b.addEventListener("click", () => {
      const rule = ctx.state.decalogoRules.find((x) => x.id === b.dataset.decVote);
      if (rule) {
        rule.votes += 1;
        ctx.markActivityDone("C_A7", 15);
        ctx.saveAndRefresh();
      }
    })
  );
  container.querySelector("#btn-dec-add")?.addEventListener("click", () => {
    const title = (container.querySelector<HTMLInputElement>("#dec-new-title")?.value || "").trim();
    const mot = (container.querySelector<HTMLInputElement>("#dec-new-mot")?.value || "").trim();
    const author = (container.querySelector<HTMLSelectElement>("#dec-new-author")?.value || "comune") as "mezzovalle" | "villacolle" | "comune";
    if (!title || !mot) return;
    ctx.state.decalogoRules.push({
      id: "r_" + Date.now(),
      authorPath: author,
      title,
      motivation: mot,
      votes: 1
    });
    uiState.decalogoNewTitle = "";
    uiState.decalogoNewMotivation = "";
    ctx.markActivityDone("C_A7", 20);
    ctx.saveAndRefresh();
  });
  container.querySelector("#btn-dec-print")?.addEventListener("click", () => window.print());
  container.querySelector("#btn-dec-export")?.addEventListener("click", () => exportLabJson(ctx.state));
  container.querySelector<HTMLInputElement>("#inp-dec-import")?.addEventListener("change", (ev) => {
    const file = (ev.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = parseImportedLabJson(String(reader.result || ""));
        Object.assign(ctx.state, imported);
        uiState.importStatus = "File JSON importato e unito con successo.";
        ctx.saveAndRefresh();
      } catch {
        uiState.importStatus = "Errore: il file selezionato non è un JSON SERR valido.";
        ctx.saveAndRefresh();
      }
    };
    reader.readAsText(file);
  });
}

/* ================= ATTIVITA 8: SCUOLA A IMPATTO RIDOTTO + MANIFESTO CANVA ================= */
export function renderActivity8(container: HTMLElement, ctx: CommonHubContext): void {
  const e = ctx.esc;
  const issues = ctx.state.schoolAudit;
  const cur = issues[uiState.selectedAuditIdx] || issues[0];
  const posterIssue = issues.find((i) => i.id === ctx.state.posterDraft.issueId) || cur;
  const posterSvg = renderSchoolPosterSvg(ctx.state.posterDraft, posterIssue);

  container.innerHTML = `
    <div class="serr-info-strip">
      <strong>Attività 8 · La Nostra Scuola a Impatto Ridotto:</strong> osservate i 6 ambiti reali della scuola, aggiornate le schede di indagine e generate il vostro <strong>Manifesto Digitale</strong> esportabile in <strong>SVG</strong> o <strong>PNG ad alta risoluzione pronto per Canva</strong>.
    </div>

    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
      ${issues.map((iss, i) => `<button type="button" class="serr-chip ${i === uiState.selectedAuditIdx ? "active" : ""}" data-a8-tab="${i}">${e(iss.category)}</button>`).join("")}
    </div>

    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">Scheda di osservazione: ${e(cur.category)}</h4>
        <label class="serr-label">Problema individuato <input id="a8-prob" class="serr-input" value="${e(cur.problem)}" /></label>
        <label class="serr-label">Situazione osservata a scuola <textarea id="a8-sit" class="serr-input" rows="2">${e(cur.situation)}</textarea></label>
        <label class="serr-label">Risorse coinvolte <input id="a8-res" class="serr-input" value="${e(cur.resources)}" /></label>
        <label class="serr-label">Soluzione proposta dalla classe <textarea id="a8-sol" class="serr-input" rows="2">${e(cur.solution)}</textarea></label>
        <label class="serr-label">Risultato atteso <input id="a8-out" class="serr-input" value="${e(cur.expectedOutcome)}" /></label>
        <label class="serr-label">Modalità di verifica reale <input id="a8-ver" class="serr-input" value="${e(cur.verification)}" /></label>
        <button type="button" class="btn btn-primary btn-sm" style="margin-top:8px;" id="btn-a8-save-issue">Salva scheda osservazione</button>
      </div>

      <div class="serr-card">
        <h4 style="margin-top:0;">Studio Manifesto Digitale (Compatibile con Canva)</h4>
        <label class="serr-label">Titolo del Manifesto <input id="a8-p-title" class="serr-input" value="${e(ctx.state.posterDraft.title)}" /></label>
        <div class="serr-grid-2">
          <label class="serr-label">Tema scolastico
            <select id="a8-p-issue" class="serr-select" style="width:100%;">
              ${issues.map((iss) => `<option value="${iss.id}" ${iss.id === ctx.state.posterDraft.issueId ? "selected" : ""}>${e(iss.category)}</option>`).join("")}
            </select>
          </label>
          <label class="serr-label">Palette grafica
            <select id="a8-p-theme" class="serr-select" style="width:100%;">
              <option value="water_school" ${ctx.state.posterDraft.theme === "water_school" ? "selected" : ""}>Blu Acqua &amp; Borraccia</option>
              <option value="zero_pack" ${ctx.state.posterDraft.theme === "zero_pack" ? "selected" : ""}>Verde Zero Imballaggi</option>
              <option value="food_rescue" ${ctx.state.posterDraft.theme === "food_rescue" ? "selected" : ""}>Arancio Mensa Anti-Spreco</option>
            </select>
          </label>
        </div>
        <label class="serr-label">Proposta in evidenza <textarea id="a8-p-prop" class="serr-input" rows="2">${e(ctx.state.posterDraft.proposal)}</textarea></label>

        <div class="serr-poster-preview">${posterSvg}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-a8-png">Scarica PNG HD (per Canva)</button>
          <button type="button" class="btn btn-sm" id="btn-a8-svg">Scarica SVG vettoriale</button>
          <button type="button" class="btn btn-sm" id="btn-a8-print">Stampa Manifesto</button>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-a8-tab]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.selectedAuditIdx = Number(b.dataset.a8Tab) || 0;
      renderActivity8(container, ctx);
    })
  );
  container.querySelector("#btn-a8-save-issue")?.addEventListener("click", () => {
    cur.problem = container.querySelector<HTMLInputElement>("#a8-prob")?.value || cur.problem;
    cur.situation = container.querySelector<HTMLTextAreaElement>("#a8-sit")?.value || cur.situation;
    cur.resources = container.querySelector<HTMLInputElement>("#a8-res")?.value || cur.resources;
    cur.solution = container.querySelector<HTMLTextAreaElement>("#a8-sol")?.value || cur.solution;
    cur.expectedOutcome = container.querySelector<HTMLInputElement>("#a8-out")?.value || cur.expectedOutcome;
    cur.verification = container.querySelector<HTMLInputElement>("#a8-ver")?.value || cur.verification;
    ctx.markActivityDone("C_A8", 20);
    ctx.saveAndRefresh();
  });

  const syncPosterDraft = () => {
    ctx.state.posterDraft.title = container.querySelector<HTMLInputElement>("#a8-p-title")?.value || ctx.state.posterDraft.title;
    ctx.state.posterDraft.issueId = container.querySelector<HTMLSelectElement>("#a8-p-issue")?.value || ctx.state.posterDraft.issueId;
    ctx.state.posterDraft.theme = container.querySelector<HTMLSelectElement>("#a8-p-theme")?.value || ctx.state.posterDraft.theme;
    ctx.state.posterDraft.proposal = container.querySelector<HTMLTextAreaElement>("#a8-p-prop")?.value || ctx.state.posterDraft.proposal;
    ctx.saveAndRefresh();
  };
  ["#a8-p-issue", "#a8-p-theme"].forEach((sel) => container.querySelector(sel)?.addEventListener("change", syncPosterDraft));
  ["#a8-p-title", "#a8-p-prop"].forEach((sel) => container.querySelector(sel)?.addEventListener("change", syncPosterDraft));

  container.querySelector("#btn-a8-png")?.addEventListener("click", () => {
    const svgNow = renderSchoolPosterSvg(ctx.state.posterDraft, posterIssue);
    ctx.markActivityDone("C_A8", 20);
    void downloadSvgAsPng(svgNow, "manifesto-scuola-serr-2026.png", 1200, 1500);
  });
  container.querySelector("#btn-a8-svg")?.addEventListener("click", () => {
    const svgNow = renderSchoolPosterSvg(ctx.state.posterDraft, posterIssue);
    downloadSvgFile(svgNow, "manifesto-scuola-serr-2026.svg");
  });
  container.querySelector("#btn-a8-print")?.addEventListener("click", () => window.print());
}

/* ================= SEZIONE 5: IMPARIAMO PRIMA DI GIOCARE ================= */
export function renderStudyHub(container: HTMLElement, ctx: CommonHubContext): void {
  const e = ctx.esc;
  const pathToTopicLabel = (p: string) =>
    p === "mezzovalle"
      ? "Tematica A · Acqua, Cibo & Impronta Nascosta"
      : p === "villacolle"
      ? "Tematica B · Filiera Corta, Stagionalità & Imballaggi"
      : "Tematica condivisa SERR 2026";
  const filtered = uiState.studyPathFilter === "Tutti"
    ? STUDY_UNITS
    : STUDY_UNITS.filter((u) => u.pathway === uiState.studyPathFilter);
  const unit = filtered.find((u) => u.id === uiState.studyUnitId) || filtered[0];

  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:10px;align-items:center;">
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
        <strong>Tematica:</strong>
        <button type="button" class="serr-chip ${uiState.studyPathFilter === "Tutti" ? "active" : ""}" data-st-pf="Tutti">Tutte (${STUDY_UNITS.length} unità)</button>
        <button type="button" class="serr-chip ${uiState.studyPathFilter === "mezzovalle" ? "active" : ""}" data-st-pf="mezzovalle">Acqua &amp; Impronta Nascosta (7)</button>
        <button type="button" class="serr-chip ${uiState.studyPathFilter === "villacolle" ? "active" : ""}" data-st-pf="villacolle">Filiera Corta &amp; Imballaggi (7)</button>
      </div>
      <div style="display:flex;gap:6px;align-items:center;">
        <label for="st-comune-sel" style="font-size:0.78rem;font-weight:700;">Comune:</label>
        <select id="st-comune-sel" class="serr-select">
          <option value="Tutti" ${uiState.studyPathFilter === "Tutti" ? "selected" : ""}>Tutti i Comuni</option>
          <option value="mezzovalle" ${uiState.studyPathFilter === "mezzovalle" ? "selected" : ""}>Mezzovalle → Acqua &amp; Cibo</option>
          <option value="villacolle" ${uiState.studyPathFilter === "villacolle" ? "selected" : ""}>Villacolle → Km Zero &amp; Imballi</option>
        </select>
      </div>
    </div>

    <div class="serr-grid-study">
      <div class="serr-card" style="max-height:430px;overflow-y:auto;">
        <h4 style="margin-top:0;">Argomenti di studio</h4>
        <div style="display:flex;flex-direction:column;gap:6px;">
          ${filtered.map((u) => {
            const read = ctx.state.studiedUnits.includes(u.id);
            const tShort = u.pathway === "mezzovalle" ? "Acqua & Impronta" : "Km Zero & Imballi";
            return `
              <button type="button" class="serr-opt-btn ${u.id === unit.id ? "is-sel" : ""}" data-st-unit="${u.id}">
                <div style="font-size:0.74rem;color:var(--text-muted);">${e(tShort)} ${read ? "· Studiato ✓" : ""}</div>
                <strong>${e(u.title)}</strong>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <div class="serr-card">
        <div class="serr-badge-small">${e(pathToTopicLabel(unit.pathway))}</div>
        <h4 style="margin:4px 0 8px;">${e(unit.title)}</h4>
        <div class="serr-subnav" style="margin-bottom:10px;">
          <button type="button" class="serr-pill ${uiState.studyViewTab === "teoria" ? "active" : ""}" data-st-v="teoria">1. Testo approfondito</button>
          <button type="button" class="serr-pill ${uiState.studyViewTab === "ripasso" ? "active" : ""}" data-st-v="ripasso">2. Ripasso semplice</button>
          <button type="button" class="serr-pill ${uiState.studyViewTab === "infografica" ? "active" : ""}" data-st-v="infografica">3. Infografica SVG</button>
          <button type="button" class="serr-pill ${uiState.studyViewTab === "mappa" ? "active" : ""}" data-st-v="mappa">4. Mappa concettuale</button>
          <button type="button" class="serr-pill ${uiState.studyViewTab === "glossario" ? "active" : ""}" data-st-v="glossario">5. Glossario &amp; Esempio</button>
        </div>

        ${uiState.studyViewTab === "teoria" ? `
          ${unit.deepTheory.map((p) => `<p style="font-size:0.88rem;line-height:1.5;margin:0 0 8px;">${e(p)}</p>`).join("")}
        ` : uiState.studyViewTab === "ripasso" ? `
          <div class="serr-info-strip"><strong>Sintesi veloce prima dei quiz:</strong><ul class="serr-list">${unit.simplifiedReview.map((r) => `<li>${e(r)}</li>`).join("")}</ul></div>
        ` : uiState.studyViewTab === "infografica" ? `
          <div style="text-align:center;">${renderStudyInfographicSvg(unit.infographicType)}</div>
        ` : uiState.studyViewTab === "mappa" ? `
          <div class="serr-concept-map" style="flex-direction:column;align-items:stretch;">
            <div class="serr-map-node" style="text-align:center;">${e(unit.conceptMap.root)}</div>
            <div class="serr-grid-2">
              ${unit.conceptMap.branches.map((br) => `
                <div class="serr-card" style="padding:8px 10px;">
                  <strong style="font-size:0.82rem;color:#164f30;">${e(br.label)}</strong>
                  <ul class="serr-list">${br.children.map((ch) => `<li>${e(ch)}</li>`).join("")}</ul>
                </div>
              `).join("")}
            </div>
          </div>
        ` : `
          <ul class="serr-list">
            ${unit.glossary.map((g) => `<li><strong>${e(g.term)}:</strong> ${e(g.def)}</li>`).join("")}
          </ul>
          <div class="serr-feedback ok" style="margin-top:8px;"><strong>Esempio pratico quotidiano:</strong> ${e(unit.dailyExample)}</div>
        `}

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;flex-wrap:wrap;gap:8px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-st-mark">Segna unità come studiata ✓</button>
          <button type="button" class="btn btn-sm" id="btn-st-go-quiz">Vai ai Giochi e Verifiche →</button>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-st-pf]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.studyPathFilter = (b.dataset.stPf || "Tutti") as typeof uiState.studyPathFilter;
      renderStudyHub(container, ctx);
    })
  );
  container.querySelector<HTMLSelectElement>("#st-comune-sel")?.addEventListener("change", (ev) => {
    uiState.studyPathFilter = ((ev.target as HTMLSelectElement).value || "Tutti") as typeof uiState.studyPathFilter;
    renderStudyHub(container, ctx);
  });
  container.querySelectorAll<HTMLButtonElement>("[data-st-unit]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.studyUnitId = b.dataset.stUnit || STUDY_UNITS[0].id;
      renderStudyHub(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-st-v]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.studyViewTab = (b.dataset.stV || "teoria") as typeof uiState.studyViewTab;
      renderStudyHub(container, ctx);
    })
  );
  container.querySelector("#btn-st-mark")?.addEventListener("click", () => {
    if (!ctx.state.studiedUnits.includes(unit.id)) {
      ctx.state.studiedUnits.push(unit.id);
      ctx.markActivityDone("STUDIO_" + unit.id, 10);
      ctx.saveAndRefresh();
    }
  });
  container.querySelector("#btn-st-go-quiz")?.addEventListener("click", () => {
    if (unit.pathway === "mezzovalle") ctx.openMezzSub("giochi");
    else ctx.openVillaSub("giochi");
  });
}

/* ================= SEZIONE 6: SCHEDE OPERATIVE STAMPABILI A4 ================= */
export function renderWorksheetsHub(container: HTMLElement, ctx: CommonHubContext): void {
  const e = ctx.esc;
  const filterMap: Record<string, "mezzovalle" | "villacolle" | "comune" | undefined> = {
    Mezzovalle: "mezzovalle",
    Villacolle: "villacolle",
    Comuni: "comune"
  };
  const targetPath = filterMap[uiState.wsFilter];
  const list = targetPath
    ? PRINTABLE_WORKSHEETS.filter((w) => w.pathway === targetPath)
    : PRINTABLE_WORKSHEETS;
  const ws = list.find((w) => w.id === uiState.wsSelectedId) || list[0];

  const wsTopicLabel = (p: string) =>
    p === "mezzovalle"
      ? "Tematica: Acqua, Cibo & Impronta Nascosta"
      : p === "villacolle"
      ? "Tematica: Filiera Corta, Stagionalità & Imballaggi"
      : "Tematica condivisa SERR 2026";
  const wsFilterDisplay: Record<"Tutti" | "Mezzovalle" | "Villacolle" | "Comuni", string> = {
    Tutti: "Tutte le tematiche",
    Mezzovalle: "Acqua & Impronta Nascosta",
    Villacolle: "Filiera Corta & Imballaggi",
    Comuni: "Percorsi Condivisi"
  };

  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:10px;align-items:center;">
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
        <strong>Tematica:</strong>
        ${(["Tutti", "Mezzovalle", "Villacolle", "Comuni"] as const).map((f) => `<button type="button" class="serr-chip ${uiState.wsFilter === f ? "active" : ""}" data-ws-f="${f}">${wsFilterDisplay[f]}</button>`).join("")}
      </div>
      <div style="display:flex;gap:6px;align-items:center;">
        <label for="ws-comune-sel" style="font-size:0.78rem;font-weight:700;">Comune:</label>
        <select id="ws-comune-sel" class="serr-select">
          <option value="Tutti" ${uiState.wsFilter === "Tutti" ? "selected" : ""}>Tutti i Comuni</option>
          <option value="Mezzovalle" ${uiState.wsFilter === "Mezzovalle" ? "selected" : ""}>Mezzovalle → Acqua &amp; Cibo</option>
          <option value="Villacolle" ${uiState.wsFilter === "Villacolle" ? "selected" : ""}>Villacolle → Km Zero &amp; Imballi</option>
          <option value="Comuni" ${uiState.wsFilter === "Comuni" ? "selected" : ""}>Comuni in rete → Scelte condivise</option>
        </select>
      </div>
    </div>
    <div class="serr-grid-study">
      <div class="serr-card" style="max-height:430px;overflow-y:auto;">
        <h4 style="margin-top:0;">${PRINTABLE_WORKSHEETS.length} Schede A4</h4>
        <div style="display:flex;flex-direction:column;gap:6px;">
          ${list.map((w) => `
            <button type="button" class="serr-opt-btn ${w.id === ws.id ? "is-sel" : ""}" data-ws-id="${w.id}">
              <small style="color:var(--text-muted);">${e(w.code)} · ${e(wsTopicLabel(w.pathway))}</small><br/>
              <strong>${e(w.title)}</strong>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="serr-card">
        <div class="serr-sheet-preview">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
            <span class="serr-badge-small">${e(ws.code)} · ${e(wsTopicLabel(ws.pathway))} · FORMATO A4</span>
            <button type="button" class="btn btn-primary btn-sm" id="btn-ws-print">Stampa Scheda A4</button>
          </div>
          <h4 style="margin:6px 0;">${e(ws.title)}</h4>
          <p style="font-size:0.84rem;margin:4px 0;"><strong>Obiettivo:</strong> ${e(ws.objective)}</p>
          <p style="font-size:0.84rem;margin:4px 0;"><strong>Materiali occorrenti:</strong> ${e(ws.materials)}</p>
          <div style="font-size:0.84rem;margin:6px 0;">
            <strong>Fasi di lavoro:</strong>
            <ol style="margin:4px 0 0 18px;padding:0;">
              ${ws.steps.map((s) => `<li>${e(s)}</li>`).join("")}
            </ol>
          </div>
          <h5 style="margin:8px 0 4px;">Tabella operativa compilabile (prima della stampa)</h5>
          <table class="serr-table">
            <thead><tr>${ws.tableCols.map((h) => `<th>${e(h)}</th>`).join("")}</tr></thead>
            <tbody>
              ${ws.defaultRows.map((row) => `<tr>${row.map((cell) => `<td contenteditable="true" aria-label="Cella compilabile">${e(cell)}</td>`).join("")}</tr>`).join("")}
              <tr>${ws.tableCols.map(() => `<td contenteditable="true" aria-label="Riga vuota compilabile">&nbsp;</td>`).join("")}</tr>
            </tbody>
          </table>
          <div style="margin-top:8px;">
            <strong style="font-size:0.82rem;">Osservazioni:</strong>
            <textarea class="serr-input" rows="2" placeholder="${e(ws.observationPrompt)}"></textarea>
          </div>
          <div style="margin-top:6px;">
            <strong style="font-size:0.82rem;">Conclusioni:</strong>
            <textarea class="serr-input" rows="2" placeholder="${e(ws.conclusionPrompt)}"></textarea>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-ws-f]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.wsFilter = (b.dataset.wsF || "Tutti") as typeof uiState.wsFilter;
      renderWorksheetsHub(container, ctx);
    })
  );
  container.querySelector<HTMLSelectElement>("#ws-comune-sel")?.addEventListener("change", (ev) => {
    uiState.wsFilter = ((ev.target as HTMLSelectElement).value || "Tutti") as typeof uiState.wsFilter;
    renderWorksheetsHub(container, ctx);
  });
  container.querySelectorAll<HTMLButtonElement>("[data-ws-id]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.wsSelectedId = b.dataset.wsId || PRINTABLE_WORKSHEETS[0].id;
      renderWorksheetsHub(container, ctx);
    })
  );
  container.querySelector("#btn-ws-print")?.addEventListener("click", () => window.print());
}

/* ================= SEZIONE 7: IL MIO DIARIO DELLE SCOPERTE ================= */
export function renderDiaryHub(container: HTMLElement, ctx: CommonHubContext): void {
  const e = ctx.esc;
  const entries = uiState.diaryFilter === "tutti"
    ? ctx.state.diaryEntries
    : ctx.state.diaryEntries.filter((x) => x.pathway === uiState.diaryFilter);

  container.innerHTML = `
    <div class="serr-info-strip">
      <strong>Il Mio Diario delle Scoperte:</strong> ogni pagina si salva automaticamente in locale (<strong>${e(ctx.storageBackend)}</strong>) e rimane disponibile anche chiudendo il browser. Esportabile in JSON o stampabile in PDF.
    </div>

    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">${uiState.diaryEditingId ? "Modifica voce del Diario" : "Nuova riflessione nel Diario"}</h4>
        <div class="serr-grid-2">
          <label class="serr-label">Percorso
            <select id="d-path" class="serr-select" style="width:100%;">
              <option value="mezzovalle" ${uiState.diaryDraft.pathway === "mezzovalle" ? "selected" : ""}>Mezzovalle</option>
              <option value="villacolle" ${uiState.diaryDraft.pathway === "villacolle" ? "selected" : ""}>Villacolle</option>
              <option value="comune" ${uiState.diaryDraft.pathway === "comune" ? "selected" : ""}>Attività Comuni</option>
            </select>
          </label>
          <label class="serr-label">Attività collegata
            <input id="d-act" class="serr-input" value="${e(uiState.diaryDraft.activityRef)}" />
          </label>
        </div>
        <label class="serr-label">1. Che cosa ho imparato oggi? <textarea id="d-learn" class="serr-input" rows="2">${e(uiState.diaryDraft.learned)}</textarea></label>
        <label class="serr-label">2. Quale dato mi ha sorpreso di più? <textarea id="d-surp" class="serr-input" rows="2">${e(uiState.diaryDraft.surprised)}</textarea></label>
        <label class="serr-label">3. Quale problema ho scoperto? <textarea id="d-prob" class="serr-input" rows="2">${e(uiState.diaryDraft.problem)}</textarea></label>
        <label class="serr-label">4. Quale comportamento voglio cambiare? <textarea id="d-beh" class="serr-input" rows="2">${e(uiState.diaryDraft.behavior)}</textarea></label>
        <label class="serr-label">5. Quale proposta voglio portare a scuola o in famiglia? <textarea id="d-prop" class="serr-input" rows="2">${e(uiState.diaryDraft.proposal)}</textarea></label>
        <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-d-save">${uiState.diaryEditingId ? "Aggiorna voce" : "Salva nel Diario ✓"}</button>
          ${uiState.diaryEditingId ? `<button type="button" class="btn btn-sm" id="btn-d-cancel">Annulla modifica</button>` : ""}
        </div>
      </div>

      <div class="serr-card">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;">
          <h4 style="margin:0;">Cronologia delle scoperte (${entries.length})</h4>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button type="button" class="btn btn-sm" id="btn-d-print">Stampa / PDF</button>
            <button type="button" class="btn btn-sm" id="btn-d-json">Esporta JSON</button>
          </div>
        </div>
        <div style="display:flex;gap:6px;margin:8px 0;flex-wrap:wrap;">
          ${(["tutti", "mezzovalle", "villacolle", "comune"] as const).map((f) => `<button type="button" class="serr-chip ${uiState.diaryFilter === f ? "active" : ""}" data-d-filter="${f}">${f}</button>`).join("")}
        </div>
        <div class="serr-quiz-scroll">
          ${entries.map((item) => `
            <div class="serr-q-block">
              <div style="display:flex;justify-content:space-between;gap:6px;align-items:center;">
                <span class="serr-badge-small">${e(item.pathway)} · ${e(item.dateLabel)}</span>
                <div>
                  <button type="button" class="btn btn-sm" data-d-edit="${item.id}">Modifica</button>
                  <button type="button" class="btn btn-sm" data-d-del="${item.id}">Elimina</button>
                </div>
              </div>
              <div style="font-weight:700;font-size:0.83rem;margin:4px 0;">${e(item.activityRef)}</div>
              <div style="font-size:0.8rem;"><strong>Imparato:</strong> ${e(item.learned)}</div>
              ${item.surprised ? `<div style="font-size:0.8rem;"><strong>Dato sorprendente:</strong> ${e(item.surprised)}</div>` : ""}
              ${item.problem ? `<div style="font-size:0.8rem;"><strong>Problema:</strong> ${e(item.problem)}</div>` : ""}
              ${item.behavior ? `<div style="font-size:0.8rem;"><strong>Cambio:</strong> ${e(item.behavior)}</div>` : ""}
              ${item.proposal ? `<div style="font-size:0.8rem;"><strong>Proposta:</strong> ${e(item.proposal)}</div>` : ""}
            </div>
          `).join("") || `<p style="font-size:0.84rem;color:var(--text-muted);">Nessuna voce per questo filtro.</p>`}
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>("[data-d-filter]").forEach((b) =>
    b.addEventListener("click", () => {
      uiState.diaryFilter = (b.dataset.dFilter || "tutti") as typeof uiState.diaryFilter;
      renderDiaryHub(container, ctx);
    })
  );
  container.querySelector("#btn-d-save")?.addEventListener("click", () => {
    const now = new Date();
    const learned = (container.querySelector<HTMLTextAreaElement>("#d-learn")?.value || "").trim();
    if (!learned) return;
    const entry: DiaryEntry = {
      id: uiState.diaryEditingId || "d_" + Date.now(),
      dateIso: now.toISOString(),
      dateLabel: now.toLocaleDateString("it-IT") + " " + now.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
      pathway: (container.querySelector<HTMLSelectElement>("#d-path")?.value || "mezzovalle") as DiaryEntry["pathway"],
      activityRef: container.querySelector<HTMLInputElement>("#d-act")?.value || "Laboratorio SERR",
      learned,
      surprised: (container.querySelector<HTMLTextAreaElement>("#d-surp")?.value || "").trim(),
      problem: (container.querySelector<HTMLTextAreaElement>("#d-prob")?.value || "").trim(),
      behavior: (container.querySelector<HTMLTextAreaElement>("#d-beh")?.value || "").trim(),
      proposal: (container.querySelector<HTMLTextAreaElement>("#d-prop")?.value || "").trim()
    };
    if (uiState.diaryEditingId) {
      const idx = ctx.state.diaryEntries.findIndex((x) => x.id === uiState.diaryEditingId);
      if (idx >= 0) ctx.state.diaryEntries[idx] = entry;
      uiState.diaryEditingId = "";
    } else {
      ctx.state.diaryEntries.unshift(entry);
    }
    uiState.diaryDraft = { pathway: "mezzovalle", activityRef: "Mezzovalle · Laboratorio", learned: "", surprised: "", problem: "", behavior: "", proposal: "" };
    ctx.markActivityDone("C_DIARY", 15);
    ctx.saveAndRefresh();
  });
  container.querySelector("#btn-d-cancel")?.addEventListener("click", () => {
    uiState.diaryEditingId = "";
    uiState.diaryDraft = { pathway: "mezzovalle", activityRef: "Mezzovalle · Laboratorio", learned: "", surprised: "", problem: "", behavior: "", proposal: "" };
    renderDiaryHub(container, ctx);
  });
  container.querySelectorAll<HTMLButtonElement>("[data-d-edit]").forEach((b) =>
    b.addEventListener("click", () => {
      const found = ctx.state.diaryEntries.find((x) => x.id === b.dataset.dEdit);
      if (!found) return;
      uiState.diaryEditingId = found.id;
      uiState.diaryDraft = {
        pathway: found.pathway,
        activityRef: found.activityRef,
        learned: found.learned,
        surprised: found.surprised,
        problem: found.problem,
        behavior: found.behavior,
        proposal: found.proposal
      };
      renderDiaryHub(container, ctx);
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-d-del]").forEach((b) =>
    b.addEventListener("click", () => {
      ctx.state.diaryEntries = ctx.state.diaryEntries.filter((x) => x.id !== b.dataset.dDel);
      ctx.saveAndRefresh();
    })
  );
  container.querySelector("#btn-d-print")?.addEventListener("click", () => window.print());
  container.querySelector("#btn-d-json")?.addEventListener("click", () => exportLabJson(ctx.state));
}

/* ================= SEZIONE 9: MISSIONI FINALI & ATTESTATI ================= */
export function renderMissionsHub(container: HTMLElement, ctx: CommonHubContext): void {
  const e = ctx.esc;
  const certMission = FINAL_MISSIONS.find((m) => m.id === uiState.certPreviewId);
  const certSvg = certMission
    ? renderMissionCertificateSvg({
        studentName: ctx.state.studentAlias,
        studentClass: ctx.state.studentClass,
        badgeTitle: certMission.badgeTitle,
        missionTitle: certMission.title,
        commitment: uiState.missionInputs[certMission.id] || "Impegno quotidiano per ridurre gli sprechi alimentari e gli imballaggi.",
        dateStr: new Date().toLocaleDateString("it-IT")
      })
    : "";

  container.innerHTML = `
    <div class="serr-grid-2" style="margin-bottom:10px;">
      <label class="serr-label">Nome o alias studente per l'attestato <input id="ms-name" class="serr-input" value="${e(ctx.state.studentAlias)}" /></label>
      <label class="serr-label">Classe / Scuola <input id="ms-class" class="serr-input" value="${e(ctx.state.studentClass)}" /></label>
    </div>

    <div class="serr-grid-3">
      ${FINAL_MISSIONS.map((m) => {
        const done = ctx.state.completedMissions.includes(m.id);
        return `
          <div class="serr-card">
            <div class="serr-badge-small">${e(m.badgeTitle)}</div>
            <h4 style="margin:6px 0 4px;">${e(m.title)}</h4>
            <p style="font-size:0.82rem;color:var(--text-muted);">${e(m.subtitle)}</p>
            <ul class="serr-list" style="font-size:0.79rem;">
              ${m.checklistSteps.map((s) => `<li>${e(s)}</li>`).join("")}
            </ul>
            <label class="serr-label" style="margin-top:6px;">${e(m.reflectionQuestion)}
              <textarea class="serr-input" rows="2" data-ms-txt="${m.id}">${e(uiState.missionInputs[m.id] || "")}</textarea>
            </label>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
              <button type="button" class="btn btn-primary btn-sm" data-ms-complete="${m.id}">${done ? "Missione completata ✓" : "Completa & Genera Attestato"}</button>
            </div>
          </div>
        `;
      }).join("")}
    </div>

    ${certMission ? `
      <div class="serr-card" style="margin-top:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <h4 style="margin:0;">Anteprima Attestato Personalizzato · ${e(certMission.badgeTitle)}</h4>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button type="button" class="btn btn-primary btn-sm" id="btn-cert-png">Scarica Attestato PNG</button>
            <button type="button" class="btn btn-sm" id="btn-cert-svg">Scarica SVG</button>
            <button type="button" class="btn btn-sm" id="btn-cert-print">Stampa A4</button>
          </div>
        </div>
        <div class="serr-poster-preview">${certSvg}</div>
      </div>
    ` : ""}
  `;

  container.querySelector<HTMLInputElement>("#ms-name")?.addEventListener("change", (ev) => {
    ctx.state.studentAlias = (ev.target as HTMLInputElement).value;
    ctx.saveAndRefresh();
  });
  container.querySelector<HTMLInputElement>("#ms-class")?.addEventListener("change", (ev) => {
    ctx.state.studentClass = (ev.target as HTMLInputElement).value;
    ctx.saveAndRefresh();
  });
  container.querySelectorAll<HTMLTextAreaElement>("[data-ms-txt]").forEach((t) =>
    t.addEventListener("input", () => {
      uiState.missionInputs[t.dataset.msTxt || ""] = t.value;
    })
  );
  container.querySelectorAll<HTMLButtonElement>("[data-ms-complete]").forEach((b) =>
    b.addEventListener("click", () => {
      const id = b.dataset.msComplete || "";
      if (!ctx.state.completedMissions.includes(id)) ctx.state.completedMissions.push(id);
      uiState.certPreviewId = id;
      ctx.markActivityDone("MISSION_" + id, 30);
      ctx.saveAndRefresh();
    })
  );
  container.querySelector("#btn-cert-png")?.addEventListener("click", () => {
    void downloadSvgAsPng(certSvg, `attestato-${uiState.certPreviewId}.png`, 1120, 790);
  });
  container.querySelector("#btn-cert-svg")?.addEventListener("click", () => {
    downloadSvgFile(certSvg, `attestato-${uiState.certPreviewId}.svg`);
  });
  container.querySelector("#btn-cert-print")?.addEventListener("click", () => window.print());
}

/* ================= SEZIONE 10 & 11: MONITORAGGIO & PRECISIONE SCIENTIFICA ================= */
export function renderMonitoringAndSources(container: HTMLElement, ctx: CommonHubContext): void {
  const e = ctx.esc;
  const gameKeys = Object.keys(ctx.state.gameScores);
  container.innerHTML = `
    <div class="serr-info-strip">
      <strong>Nota educativa sull'uso dei dati:</strong> questo cruscotto mostra i progressi didattici individuali e di classe. Non genera e non incoraggia in alcun modo classifiche competitive tra studenti basate sulle scelte alimentari personali.
    </div>

    <div class="serr-grid-2">
      <div class="serr-card">
        <h4 style="margin-top:0;">Monitoraggio attività e competenze</h4>
        <ul class="serr-list">
          <li>Attività laboratoriali completate: <strong>${ctx.state.completedActivities.length}</strong></li>
          <li>Unità di studio lette: <strong>${ctx.state.studiedUnits.length} / ${STUDY_UNITS.length}</strong></li>
          <li>Pagine nel Diario delle Scoperte: <strong>${ctx.state.diaryEntries.length}</strong></li>
          <li>Regole proposte/votate nel Decalogo: <strong>${ctx.state.decalogoRules.length}</strong></li>
          <li>Missioni Finali completate: <strong>${ctx.state.completedMissions.length} / 3</strong></li>
        </ul>
        <h5 style="margin:10px 0 4px;">Esiti giochi e verifiche registrati</h5>
        ${gameKeys.length > 0 ? `
          <table class="serr-table">
            <thead><tr><th>Prova</th><th>Migliore esito</th><th>Tentativi</th></tr></thead>
            <tbody>
              ${gameKeys.map((k) => {
                const g = ctx.state.gameScores[k];
                return `<tr><td>${e(k)}</td><td>${g.score}/${g.total}</td><td>${g.attempts}</td></tr>`;
              }).join("")}
            </tbody>
          </table>
        ` : `<p style="font-size:0.82rem;color:var(--text-muted);">Nessun quiz completato ancora: affronta le verifiche di Mezzovalle o Villacolle!</p>`}
        <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-mon-export">Esporta tutto in JSON</button>
          <button type="button" class="btn btn-sm" id="btn-mon-print">Stampa riepilogo</button>
        </div>
      </div>

      <div class="serr-card">
        <h4 style="margin-top:0;">Precisione Scientifica &amp; Trasparenza degli Indicatori</h4>
        <table class="serr-table">
          <thead><tr><th>Grandezza / Sezione</th><th>Natura e Fonte</th><th>Limiti / Regole</th></tr></thead>
          <tbody>
            <tr><td><strong>Impronta idrica (L/kg)</strong></td><td>Dato scientifico documentato — Water Footprint Network (Mekonnen &amp; Hoekstra, 2011)</td><td>Medie globali ponderate indicative; variano con clima e irrigazione locale.</td></tr>
            <tr><td><strong>Impronta carbonio (kg CO₂e/kg)</strong></td><td>Dato scientifico documentato — Poore &amp; Nemecek (2018), Science / FAO</td><td>Acqua e CO₂e non sono proporzionali (es. mandorle vs formaggi).</td></tr>
            <tr><td><strong>Stagionalità &amp; Codici imballo</strong></td><td>Riferimenti istituzionali — CREA/MiPAAF, Decisione 97/129/CE, CONAI, EN 13432</td><td>Il conferimento finale dipende sempre dal regolamento del proprio Comune.</td></tr>
            <tr><td><strong>Calcolatore Pasti &amp; Supermercato</strong></td><td>Indicatori didattici trasparenti</td><td>Moltiplicazione lineare grammi × medie WFN; indice energia 1–5 dichiarato per distinguere campo aperto vs freddo vs serra riscaldata.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  container.querySelector("#btn-mon-export")?.addEventListener("click", () => exportLabJson(ctx.state));
  container.querySelector("#btn-mon-print")?.addEventListener("click", () => window.print());
}
